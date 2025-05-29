const express = require("express")
const {addNewCategory} = require("../controllers/categoryController")
const categoryRouter = express.Router()

categoryRouter.post("/", addNewCategory)


module.exports = categoryRouter