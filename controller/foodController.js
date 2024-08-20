const foodModel = require("../model/foodModel");
const ordersModel = require("../model/ordersModel");

const createFoodController = async(req,res)=>{
    try{
        const {title,foodTags,ratingCount,description,price,category,code,isAvailable,rating,imageUrl,resturant}= req.body;
        //validation
        if(!title || !description || !price || !resturant){
            return res.status(404).send({
                success:false,
                message:'Please Enter the Value'
            })
        }
        const createFood = new foodModel({
            title,
            foodTags,
            ratingCount,
            description,
            price,
            category,
            code,
            isAvailable,
            rating,
            imageUrl,
            resturant
        })

        await createFood.save();
        res.status(200).send({
            success:true,
            message:'Food Created Suuccessfuly',
            createFood
        })
    } catch(err){
        console.log(err);
        res.status(500).send({
            success:false,
            message:'Internal Server Error',
            err
        })
    }
}

const getAllFoodController = async(req,res)=>{
    try {
        const getFood = await foodModel.find({});
        if(!getFood){
            return res.status(404).send({
                success:false,
                message:'Not found'
            })
        }
        res.status(200).send({
            sucess:true,
            message:'Data Fetched',
            getFood
        })
    } catch(err){
        console.log(err);
        res.status(500).send({
            success:false,
            message:'Api failed',
            err
        })
    }
}

const getFoodController = async(req,res)=>{
    try {
        const foodId = req.params.id;
        const getFood = await foodModel.findById(foodId);
        if(!getFood){
            return res.status(404).send({
                success:false,
                message:'No Food Item Present',
            })
        }
        res.status(200).send({
            success:true,
            message:'Data Fetched Correctly',
            getFood
        })
    } catch (error) {
        console.log(error);
        res.status(400).send({
            success:false,
            message:'Internal API Failure',
            error
        })
    }
}

const deleteFoodContoller = async(req,res)=>{
    try{
        const foodID = req.params.id;
        await foodModel.findByIdAndDelete(foodID);
        res.status(200).send({
            success:true,
            message:'Deleted Succussfully'
        })
    }catch(err){
        console.log(err);
        res.status(500).send({
            success:false,
            message:'Internal API Failure',
            err
        })
    }
}

const updateFoodController = async(req,res)=>{
    try {
        const updateId = req.params.id;
        const isFood = await foodModel.findById(updateId);
        if(!isFood){
            return res.status(404).send({
                success:false,
                message:'Food Not Found'
            })
        }
        const {
            title,
            foodTags,
            ratingCount,
            description,
            price,
            category,
            code,
            isAvailable,
            rating,
            imageUrl,
            resturant} = req.body;
        const UpdateFood = await foodModel.findByIdAndUpdate(updateId,{
            title,
            foodTags,
            ratingCount,
            description,
            price,
            category,
            code,
            isAvailable,
            rating,
            imageUrl,
            resturant
        },{new:true});
        res.status(200).send({
            success:true,
            message:'Data Updated',
            UpdateFood
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Update API Failure",
            error
        })
    }
}

//Place Order Controller
const placeOrderController= async(req,res)=>{
    try {
        const {cart} = req.body;
        if(!cart){
            return res.status(404).send({
                success:false,
                message:'Cart Empty',
            })
        }
        //amount calculation
        let total = 0;
        cart.map((i)=>{
            total += i.price;
        })
        const newOrder = new ordersModel({
            foods:cart,
            payment:total,
            buyer:req.body.id
        })
        await newOrder.save();
        res.status(201).send({
            success:true,
            message:'Order Placed Successfully',
            newOrder
        })
    } catch (error) {
        console.log(error);
        res.status(505).send({
            success:false,
            message:'Place Order API Failed',
            error
        })
        
    }

}

module.exports = {
    createFoodController,
    getAllFoodController,
    getFoodController,
    deleteFoodContoller,
    updateFoodController,
    placeOrderController
}