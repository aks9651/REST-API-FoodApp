const categoryModel = require("../model/categoryModel");

const createCategoryController =async(req,res)=>{
    try {
        const {title,imageUrl} = req.body;
        //validation
        if(!title){
            return res.status(400).send({
                success:false,
                message:'please enter the value'
            })
        }
        //Create and Save
        const newCategory = new categoryModel({
            title,
            imageUrl
        })

        await newCategory.save();
        res.status(200).send({
            success:true,
            message:'Category added !',
            newCategory
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:'Internal Server Error',
            error
        })
    }
}

const getAllCategoryController = async(req,res)=>{
    try {
        const allCategory = await categoryModel.find({});
        if(!allCategory){
            return res.status(404).send({
                success:false,
                message:'Not Found'
            })
        }
        res.status(200).send({
            success:true,
            message:'Data Displayed!',
            length:allCategory.length,
            allCategory
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:'Internal Server Error',
            error
        })   
    }
}

const getCategoryController = async(req,res)=>{
    try {
        const categoryId = req.params.id;
        const checkCategory = await categoryModel.findById(categoryId);
        if(!checkCategory){
            return res.status(404).send({
                success:false,
                message:'Category Not Found'
            })
        }
        res.status(200).send({
            success:true,
            message:'Data Found',
            checkCategory
        })
    } catch (error) {
        console.log(error);
        res.status(500).save({
            success:false,
            message:'internal Server Error',
            error
        })   
    }
}

const deleteCategoryController = async(req,res)=>{
    try{
    await categoryModel.findByIdAndDelete(req.params.id);
    res.status(200).send({
        success:true,
        message:'Data Deleted'
    })
    } catch(err){
        res.status(500).send({
            success:false,
            message:'Internal Server Error',
            err
        })
    }
}

const updateCategoryController = async(req,res)=>{
    try {
        //dconstruct
        const {id} = req.params;
        const {title,imageUrl} = req.body;

        const updateCategory = await categoryModel.findByIdAndUpdate(id,{title,imageUrl}, {new:true});
        //validation
        if(!updateCategory){
            return res.status(400).send({
                success:false,
                message:'Not Updated Category'
            })
        }

        res.status(200).send({
            success:true,
            message:'Category Updated Successfully',
            updateCategory
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:'Internal Server Error',
            error
        })
        
    }

}

module.exports={createCategoryController, 
    getAllCategoryController, 
    getCategoryController, 
    deleteCategoryController,
    updateCategoryController};