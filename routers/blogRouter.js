const express = require('express');
const blogRouter = express.Router();
const { addNewBlog, getAllBlog, getBlogByQuery, updateBlog, deleteBlog } = require('../controllers/blogController');


blogRouter.post('/', addNewBlog);
blogRouter.get('/', getAllBlog)
blogRouter.get('/', getBlogByQuery)
blogRouter.patch('/:id', updateBlog)
blogRouter.delete('/:id', deleteBlog)

module.exports = blogRouter