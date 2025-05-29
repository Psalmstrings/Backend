const CategoryModel = require("../models/category")

const addNewCategory = async (req, res)=>{
    try {
        const category = await CategoryModel.create(req.body)
        if(!category){
            return res.status(400).json({
                status:"error",
                message:"Category not added"
            })
        }

        res.status(201).json({
            status: "success",
            message: "Category has been added"
        })
        
    } catch (error) {
        console.log(error);
        
    }
}

module.exports = {addNewCategory}