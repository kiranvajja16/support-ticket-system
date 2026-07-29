const Ticket = require("../models/Ticket");

const createTicket = async(req,res)=>{
    try{
        const {title,description,category}=req.body;
        if(!title||!description){
            return res.status(400).json({
                success:false,
                message:"Title and description are required",
            });
        }

        const ticket = await Ticket.create({
            title,
            description,
            category,
            createdBy:req.user.id,
        });
        res.status(201).json({
            success:true,
            message:"Ticket created successfully",
            ticket,
        });
    }
    catch(err){
        console.error(error);
        res.status(500).json({
            success:false,
            message:"Server Error",
        });
    }
};

module.exports={
    createTicket,
}