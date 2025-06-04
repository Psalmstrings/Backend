const multer = require("multer")
const { CloudinaryStorage } = require("multer-storage-cloudinary")
const cloudinaryConfig = require("./cloudinary")

const storage = new CloudinaryStorage({
    cloudinary: cloudinaryConfig,
    params: {
        folders: "/jumia-products",
        allowedFormats: ['png','jpg','gif'], // optional 
        transformation : [{width: 500, height:500 }] //  resize image optional
    }
})

const uploadProductImage = multer({storage})
module.exports = uploadProductImage