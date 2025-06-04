const express = require("express")
const { addNewProduct, getAllProduct } = require("../controllers/productController")
const isLoggedIn = require("../middlewares/isLoggedIn")
const isVerified = require("../middlewares/isVerified")
const isSeller = require("../middlewares/isSeller")
const uploadProductImage = require("../config/multer")
const productRouter = express.Router()

productRouter.get("/", getAllProduct)
productRouter.post("/", isLoggedIn, uploadProductImage.single("productImage"), addNewProduct)

// multipart/form-data
// application/multipath

module.exports = productRouter
