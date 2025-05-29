const express = require("express")
const userRouter= express.Router()
const {getAllUsers, deleteUser,  getUserById, getUserByQuery, updateUser} = require("../controllers/usercontroller")


userRouter.get("/", getAllUsers)
userRouter.get("/query", getUserByQuery)
userRouter.get("/:id", getUserById)
userRouter.delete("/:id", deleteUser)
userRouter.patch("/:id", updateUser)

// userRouter.post("/", addUser)


module.exports= userRouter