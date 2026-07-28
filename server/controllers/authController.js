const User=require("../models/User");
const bcrypt=require("bcryptjs");

const registerUser=async(req,res)=>{
    try{
        const {name,email,password,role}=req.body;
        if(!name || !email || !password){
            return res.status(400).json({
                message:"Please fill all required fields",
            });
        }
        const existingUser=await User.findOne({email});
        if(existingUser){
            return res.status(400).json({
                message:"User already exists",
            });
        }
        const hashedPassword = await bcrypt.hash(password,10);

        const user=await User.create({
            name,
            email,
            password:hashedPassword,
            role,
        });
        res.status(201).json({
            success:true,
            message:"User registered successfully",
            user,
        });
    }
    catch(error){
        res.status(500).json({
            message:error.message,
        });
    }
};

module.exports={
    registerUser,
};