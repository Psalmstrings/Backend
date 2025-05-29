const mongoose = require('mongoose');
const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Title is required"],
        minLenght: 5,
        maxLenght: 150
    },
    content: {
        type: String,
        required: [true, "Content is required"]
    },
    author: {
        type: String,
        required: [true, "Autor is required"]
    },
    tag: {
        type: String,
        enum: [],
    },
    isPublished: {
        type: Boolean,
        default: false
    },
    publishedAt: {
        type: Date,
        default: Date.now()
    }
})

const blogModel = mongoose.model("blogs", blogSchema)
module.exports = blogModel