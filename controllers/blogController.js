const blogModel = require("../models/blog");
const addNewBlog = async (req, res) => {
  try {
    const blog = await blogModel.create(req.body);
    if (!blog) {
      return res.status(400).json({
        status: "error",
        message: "Blog not added",
      });
    }

    res.status(201).json({
      status: "success",
      message: "Blog has been added",
    });
  } catch (error) {
    console.log(error);
  }
}

const getAllBlog = async (req, res)=>{
  try {
    const blog = await blogModel.find() // return all blogs
    if(!blog){
      return res.status(400).json({
        status: "error",
        message: "Blog not found",
      });
    }

    res.status(200).json({
      status: 'success',
      message: "Blogs fetched!",
      blog
    })
  } catch (error) {
    console.log(error)
  }
}

const getBlogByQuery = async (req, res)=>{
  const {title} = req.query
  try {
    const blog = await blogModel.findOne({title})
    if(!blog){
      return res.status(400).json({
        status: "error",
        message: "Blog not found",
      });
    }

    res.status(200).json({
      status: 'success',
      message: "Blogs fetched!",
      blog
    })
  } catch (error) {
    console.log(error)
  }
}

const updateBlog = async (req, res)=>{
    const {id} = req.params
  try {
    const blog = await blogModel.findByIdAndUpdate(id, req.body)
    if(!blog){
      return res.status(400).json({
        status: "error",
        message: "Blog not found",
      });
    }

    res.status(200).json({
      status: 'success',
      message: "Blog Updated!",
      blog
    })
  } catch (error) {
    console.log(error);
    
  }
}

const deleteBlog = async (req, res)=>{
  const {id} = req.params
  try {
    const blog = await blogModel.findByIdAndDelete(id)
    if(!blog){
      return res.status(400).json({
        status: "error",
        message: "Blog not found",
      });
    }

    res.status(200).json({
      status: 'success',
      message: "Blog Deleted!",
      blog
    })
  } catch (error) {
    console.log(error);
    
  }
}
  
  
module.exports = { addNewBlog, getAllBlog, getBlogByQuery, updateBlog, deleteBlog };