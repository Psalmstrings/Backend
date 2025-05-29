const express = require("express")
const authRouter = express.Router()
const {signup, login, verifyEmail} = require("../controllers/authController")

authRouter.post("/signup", signup)
authRouter.post("/login", login)
authRouter.post("/verify/:token", verifyEmail)

module.exports = authRouter