const productModel = require("../models/product")

const addNewProduct = async (req, res, next)=>{
    if(!req.file){
        return res.status(400).json({message: "No file was found"})
    }
    const image = req.file.path
    try {
        const product = await productModel.create({...req.body, seller: req.user._id, image})

        if(!product){
            return res.status(400).json({
             status: "error",
             message: "product was not created"
            }) 
         }
 
         res.status(201).json({
             status: "success",
             message: "product created successfully",
             product
         })
    } catch (error) {
        console.log(error)
        next(error)
    }
}

const getAllProduct =async (req, res)=>{
    try {
        const products = await productModel.find().populate("seller category") // return all products
        if(!products){
            return res.status(404).json({
                status: "error",
                message: "products not found"
            })
        }

        res.status(200).json({
            status: 'success',
            message: "products fetched!",
            products
        })
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    addNewProduct,
    getAllProduct
}