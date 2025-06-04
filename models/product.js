const mongoose = require("mongoose")
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please provide a name"]
    },

    description: {
        type: String,
        required: [true, "Description is required."]
    },

    price: {
        type: Number,
        required: [true, "Price is required"]
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "categories"
    },
    seller: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    },
    image: {
        type: String
    }

})

const productModel = mongoose.model("products", productSchema)
module.exports = productModel

