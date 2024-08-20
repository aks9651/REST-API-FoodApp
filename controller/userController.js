const userModel = require("../model/userModel");
const bcryptjs = require('bcryptjs');

const getUserController =async (req,res)=>{
    try {
        console.log(req.body);
        const user = await userModel.findById({_id:req.body.id});
        //validation
        if(!user){
            return res.status(404).send({
                success:false,
                message:'Invalid User'
            })
        }
        user.password = undefined;
        return res.status(200).send({
            success:true,
            message:'Data Fetched',
            user
        })

    } catch(err){
        console.log(err);
        res.status(500).send({
            success:false,
            message:'Internal Server Error',
            err,
        })
    }
    
}

const updateUserController = async (req,res)=>{
    try {
        const user = await userModel.findById({_id:req.body.id});
        //validation
        if(!user){
            return res.status(400).send({
                success:false,
                message:'User Not Found',
            })
        }
        //update and save user
        const {userName,email,phone} = req.body;
        if(userName) user.userName = userName;
        if(email) user.email = email
        if(phone) user.phone = phone 
        
        await user.save();
        
         res.status(200).send({
            success:true,
            message:'Update User Successfully',
            user
        })
    } catch(err){
        return res.status(500).send({
            success:false,
            message:'Failed User Updation',
            err
        })
    }
}

const updatePasswordController = async (req,res)=>{
    try {
        //1.first get the user 
        const user = await userModel.findById({_id:req.body.id})
        if(!user){
            return res.status(404).send({
                success:false,
                message:'User Not Found'
            })
        }
        //2.dconstruct
        const {oldPassword,newPassword} = req.body;
        if(!oldPassword || !newPassword){
            res.status(400).send({
                sucess:false,
                message:'Password Field Empty'
            })
        }
        //Match password
        const isMatch = await bcryptjs.compare(oldPassword,user.password);
        if(!isMatch){
            res.status(500).send({
                success:false,
                message:'Invalid Credentials'
            })
        }
        //Update and Save Password
        const hashPassword = await bcryptjs.hash(newPassword,10);
        user.password = hashPassword;
        await user.save();

        res.status(200).send({
            success:true,
            messgae:'password Updated!',
            user
        })
        

        
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            
            success:false,
            message:'Server Not Found',
            error
        })
    }
}

const deleteUserController = async (req,res)=>{
    try {
        await userModel.findByIdAndDelete(req.params.id)
        res.status(200).send({
            success:true,
            message:'Account Deleted!'
            
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

module.exports={getUserController, updateUserController, updatePasswordController, deleteUserController};