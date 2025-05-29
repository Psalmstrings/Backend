const mongoose = require("mongoose")
const categorySchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, "please provide a name"]
    },

    description:{
        type: String,
        required: [true, "Description is required"]
    },

    featuredImage: {
        type: String
    },

    tag: {
        type: String,
        enum: ["tech", "science", "business", "religion"]
    }
})

const categoryModel = mongoose.model("categories", categorySchema)
module.exports = categoryModel