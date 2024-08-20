const userModel = require("../model/userModel.js");
const bcryptjs = require('bcryptjs');
const JWT = require('jsonwebtoken');


const registerController =async (req,res)=>{
    try {
        //dconstruct
        const {userName,email,password,phone,address} = req.body;
        //validation
        if(!userName || !email || !password || !phone || !address){
            return res.status(500).send({
                sucuess:false,
                messgae:'Enter the Details',
            })
        }
        //user Exists
        const existing = await userModel.findOne({email})
        if(existing){
        return res.status(400).send({
            sucuess:false,
            messgae:'User Already Exists',
        });
    }
        //create User
        const hashPassword = await bcryptjs.hash(password,10);

        const user = await userModel.create({
            userName,
            email,
            password:hashPassword,
            address,
            phone
        })
        res.status(200).send({
            sucuess:true,
            messgae:'Registered Sucussfully',
        });

    } catch(err){
        console.log(err);
        res.status(500).send({
            sucuess:false,
            messgae:'Internal Server Error',
            err
        })
    }

}
const loginController =async (req,res)=>{
    try{
        //dconstruct
        const {email,password} = req.body;
        if(!email || !password){
            return res.status(400).send({
                success:false,
                message:'Please Provide the details'
            })
        }
        console.log('1');
        const user = await userModel.findOne({email:email})
        if(!user){ 
            return res.status(300).send({
                success:false,
                message:'Invalid Credentials'
            })
        }
        console.log('2')
        const isMatch = await bcryptjs.compare(password, user.password)
        if(!isMatch){
           return res.status(400).send({
            success:false,
            message:'Incorrect Password',
            })
        }
        //token
        const token = JWT.sign({id:user._id}, process.env.SECRET, {expiresIn:'2d'});
        console.log('3')
        res.status(200).send({
            success:true,
            message:'loggedIn Sucuessfully',
            token,
            user
        })

    } catch(err){
        res.status(500).send({
            success:false,
            message:'Internal Server Error',
            err
        })
    }
}



module.exports = {registerController, loginController};