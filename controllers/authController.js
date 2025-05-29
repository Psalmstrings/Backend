const bcrypt = require("bcrypt"); // Fixed typo: 'bycrpt' to 'bcrypt'
const express = require("express");
const jwt = require("jsonwebtoken");
const userModel = require("../models/user");
const sendVerificationEmail = require("../service/nodemailer/sendMail");
const generateRandomString = require("../utils/randomString");

const signup = async (req, res) => {
    const { password, email, name } = req.body;

    if (!password || !email || !name) {
        return res.status(400).json({
            status: "error",
            message: "Please provide all required fields"
        });
    }

    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt); // Fixed variable name typo

        // generate token
        const token = generateRandomString(8);
        const verificationExp = Date.now() + 300000; // 5 minutes

        const user = await userModel.create({ 
            ...req.body, 
            password: hashedPassword, 
            verificationToken: token, 
            verificationExp 
        });

        if (!user) {
            return res.status(400).json({
                status: "error",
                message: "Could not sign up"
            });
        }
        
        const userFirstName = name.split(" ")[0];

        // send verification email  
        await sendVerificationEmail(email, userFirstName, token); // Added await

        res.status(201).json({
            status: "success",
            message: "Sign up successful. Check your email to verify your account",
            // user
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({ // Added error response
            status: "error",
            message: "Internal server error",
            error: error.message
        });
    }
};

const verifyEmail = async (req, res)=>{
    const {token} = req.params
    try {
        // find the user with the verification token
        const user = await userModel.findOne({verificationToken: token})
        if (!user) {
            return res.status(400).json({
                status: "error",
                message: "This token is invalid or has been verified already"
            })
        }

        // compare the current time with the expiration time
        if(user.verificationExp < Date.now()){
            return res.status(403).json({
                status: "error",
                message: "Verification time has expired"
            })
        }
        await userModel.findByIdAndUpdate(user._id, {verificationExp: null, verificationToken: null, isVerified: true})
        res.status(200).json({
            status: "success",
            message: "Your email has been verified"
        })

    } catch (error) {
        console.log(error)
    }
}

const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            status: "error",
            message: "Please provide email and password"
        });
    }

    try {
        // fetch the user with the email
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(400).json({
                status: "error",
                message: "Email or password incorrect"
            });
        }

        // Check if user is verified
        if (!user.isVerified) {
            return res.status(403).json({
                status: "error",
                message: "Please verify your email first"
            });
        }

        // verify if the password is correct
        const passwordCorrect = await bcrypt.compare(password, user.password);
        if (!passwordCorrect) {
            return res.status(400).json({
                status: "error",
                message: "Email or password incorrect"
            });
        }

        // generate an accessToken for the user
        const accessToken = jwt.sign(
            { id: user._id, email: user.email }, 
            process.env.JWT_SECRET, // Convention: use uppercase for env variables
            { expiresIn: process.env.JWT_EXPIRES_IN }
        );

        // Optionally, you might want to omit the password from the user object
        const userWithoutPassword = user.toObject();
        delete userWithoutPassword.password;

        res.status(200).json({
            status: "success",
            message: "Login successful",
            accessToken,
            user: userWithoutPassword // Optional
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: "error",
            message: "Internal server error"
        });
    }
};

module.exports = {
    signup,
    verifyEmail,
    login
};