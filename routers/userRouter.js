const express = require("express")
const userRouter= express.Router()
const {getAllUsers, getSingleUsers, addUser} = require("../controllers/usercontroller")


userRouter.get("/", getAllUsers)
userRouter.get("/", getSingleUsers)
userRouter.get("/", addUser)


// userRouter.post("/", addUser)


module.exports= userRouter