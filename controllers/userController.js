// Importing the User model
const UserModel = require("../models/user.js");


const addUser = async (req, res) => {
  try {
    const user = await UserModel.create(req.body);
    if(!user){
      return res.status(400).json({
        status: "error",
        message: "User not created"
      });
    }

    res.status(201).json({
      status: "success",
      message: "User created successfully",
      data: user,
    });

  } catch (error) {
    console.log(error);
  }
}

const getAllUsers = async (req, res) => {
  try {
    const user = await UserModel.find();
    if(!user){
      return res.status(400).json({
        status: "error",
        message: "User not gotten"
      });
    }

    res.status(201).json({
      status: "success",
      message: "User gotten successfully",
      user
    });

  } catch (error) {
    console.log(error);
  }
}

const getSingleUsers = (req, res) => {
    res.json({
      message: "Get single user",
    });
  }



module.exports = {getAllUsers, getSingleUsers, addUser}