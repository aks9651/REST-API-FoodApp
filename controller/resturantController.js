const resturantModel = require('../model/resturantModel')
const createresturantController = async(req,res)=>{
    try {
        const {title,codee,time,ratingCount,imageUrl,pickup,delivery,isOpen,rating,coords} = req.body;
        if(!codee || !title || !time || !ratingCount){
            return res.status(404).send({
                success:false,
                message:'ENter the Empty Value'
            })
        }
        
        const newResturant = new resturantModel({
            title,
            codee,
            time,
            ratingCount,
            imageUrl,
            pickup,
            delivery,
            isOpen,
            rating,
            coords
        })

        await newResturant.save();

        res.status(200).send({
            success:true,
            message:'All Okay'
        })
    } catch (error) {
        res.status(500).send({
            success:false,
            message:"Internal Server error",
            error
        })
    }
}

const getAllResturantController = async(req,res)=>{
    try {
        const resturant = await resturantModel.find({});
        if(!resturant){
            return res.stats(404).send({
                success:false,
                message:'No Data Found'
            })
        }
        res.status(200).send({
            success:true,
            message:'Data Displayed',
            resturant
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Internal Server Error",
        })
    }
}

const getResturantController = async(req,res)=>{
    try {
        const resturantId = req.params.id;
        const checkResturant = await resturantModel.findById(resturantId);
        if(!checkResturant){
            return res.status(400).send({
                success:false,
                message:' Data Not Found '
            })
        }

        res.status(200).send({
            success:true,
            message:'Data is Shown',
            checkResturant
        })
        
    } catch (error) {
        console.log(error);
        res.stats(500).send({
            success:false,
            message:'Internal Server error',
            error
        })
    }
}

const deleteResturant = async(req,res)=>{
    try {
    await resturantModel.findByIdAndDelete(req.params.id);
    res.status(200).send({
        success:true,
        message:'Data Deleted'
    })
}catch(err){
    res.status(400).send({
        success:false,
        message:'Internal Server Error',
        err
    })
}

}
module.exports = {createresturantController, getAllResturantController, getResturantController, deleteResturant}