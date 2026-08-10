const User=require("../models/User");
const bcrypt=require("bcryptjs");
const jwt=require("jsonwebtoken");

const registerUser=async(req,res)=>{
    console.log("Register API hit");
    try{
        const {name,email,password,role}=req.body;
        const allowedRoles = ["customer", "agent", "admin"];
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
            role: allowedRoles.includes(role) ? role : "customer",
        });
        res.status(201).json({
            success:true,
            message:"User registered successfully",
            user:{
                id:user._id,
                name:user.name,
                email:user.email,
                role:user.role,
            },
        });
    }
    catch(error){
        res.status(500).json({
            message:error.message,
        });
    }
};

const loginUser = async (req, res) => {
    try {
        console.log("========== LOGIN DEBUG ==========");
        console.log("Request body:", req.body);

        const { email, password } = req.body;

        console.log("Email:", email);
        console.log("Password received:", password ? "YES" : "NO");

        const user = await User.findOne({ email });

        console.log(
            "User found:",
            user
                ? {
                      id: user._id,
                      email: user.email,
                      role: user.role,
                  }
                : "NO USER FOUND"
        );

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Invalid email or password",
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        console.log("Password match:", isMatch);

        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: "Invalid email or password",
            });
        }

        // Your existing JWT code below...

        const token =jwt.sign(
            {
                id:user._id,
                role:user.role,
            },
            process.env.JWT_SECRET,
            {
                expiresIn:"7d",
            }
        );
        res.status(200).json({
            success:true,
            message:"Login successful",
            token,
            user:{
                id:user._id,
                name:user.name,
                email:user.email,
                role:user.role,
            },
        });
    }
    catch(err){
        res.status(500).json({
            message:err.message,
        });
    }
};

module.exports={
    registerUser,
    loginUser,
};