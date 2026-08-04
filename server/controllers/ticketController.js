const Ticket = require("../models/Ticket");
const User = require("../models/User");

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
        console.error(err);
        res.status(500).json({
            success:false,
            message:"Server Error",
        });
    }
};

const getMyTickets = async(req,res)=>{
    try{
        const tickets = await Ticket.find({
            createdBy: req.user.id,
        }).populate("assignedTo","name email")
        .sort({createdAt: -1});

        res.status(200).json({
            success:true,
            count:tickets.length,
            tickets,
        });
    }
    catch(err){
        console.error(err);
        res.status(500).json({
            success:false,
            message:"Server Error",
        });
    }
};

const getTicketById=async(req,res)=>{
    try{
        const ticket = await Ticket.findById(req.params.id)
        .populate("createdBy","name email")
        .populate("assignedTo","name email");

        if(!ticket){
            return res.status(404).json({
                success:false,
                message:"Ticket not found",
            });
        }

        if (
            ticket.createdBy._id.toString() !== req.user.id &&
            ticket.assignedTo?._id.toString() !== req.user.id &&
            req.user.role !== "admin"
        ) {
            return res.status(403).json({
                success: false,
                message: "Access denied",
            });
        }
        res.status(200).json({
            success:true,
            ticket,
        });
    }
    catch(err){
        console.error(err);
        res.status(500).json({
            success:false,
            message:"Server Error",
        });
    }
};

const updateTicket =  async(req,res)=>{
    try{
        const ticket = await Ticket.findById(req.params.id);
        if(!ticket){
            return res.status(404).json({
                success:false,
                message:"Ticket not found",
            });
        }

        if(req.user.role ==="customer"){
            if(ticket.createdBy.toString()!== req.user.id){
                return res.status(403).json({
                    success:false,
                    message:"Access denied",
                });
            }

            if(ticket.status !== "Open"){
                return res.status(400).json({
                    success:false,
                    message:"Only open tickets can be updated",
                });
            }

            ticket.title=req.body.title || ticket.title;
            ticket.description=req.body.description || ticket.description;
            ticket.category=req.body.category || ticket.category;
        }

        else if (req.user.role === "agent") {

            return res.status(403).json({
                success: false,
                message: "Use /api/tickets/:id/status to update ticket status."
            });

        }

        else if (req.user.role === "admin"){
            ticket.title= req.body.title || ticket.title;
            ticket.description = req.body.description || ticket.description;
            ticket.category = req.body.category || ticket.category;
            ticket.status = req.body.status || ticket.status;
            ticket.assignedTo = req.body.assignedTo || ticket.assignedTo;
        }
        await ticket.save();
        res.status(200).json({
            success:true,
            message:"Ticket updated successfully",
            ticket,
        });
    }
    catch(err){
        console.error(err);
        res.status(500).json({
            success:false,
            message:"Server Error",
        });
    }

};

const assignTicket = async(req,res)=>{
    try{
        if(req.user.role !== "admin"){
            return res.status(403).json({
                success:false,
                message:"Only admin can assign tickets",
            });
        }

        const ticket = await Ticket.findById(req.params.id);
        if(!ticket){
            return res.status(404).json({
                success:false,
                message:"Ticket not found",
            });
        }
        if (ticket.status === "Closed") {
        return res.status(400).json({
            success: false,
            message: "Closed tickets cannot be assigned",
        });
        }

        const {agentId} = req.body;

        if(!agentId){
            return res.status(400).json({
                success:false,
                message:"Agent ID is required",
            });
        }

        const agent = await User.findById(agentId);

        if (!agent) {
            return res.status(404).json({
                success: false,
                message: "Agent not found",
            });
        }

        if (agent.role !== "agent") {
            return res.status(400).json({
                success: false,
                message: "Selected user is not an agent",
            });
        }
        ticket.assignedTo=agent._id;
        ticket.status="In Progress";
        await ticket.save();
        

        res.status(200).json({
            success:true,
            message:"Ticket assigned successfully",
            ticket,
        });
    }
    catch(err){
        console.error(err);
        res.status(500).json({
            success:false,
            message:"Server Error",
        });
    }
};

const getTickets = async(req,res)=>{
    try{
        let tickets=[];
        if(req.user.role === "admin"){
            tickets= await Ticket.find()
            .populate("createdBy","name email")
            .populate("assignedTo","name email")
            .sort({createdAt:-1});
        }
        else if(req.user.role==="agent"){
            tickets= await Ticket.find({
                assignedTo:req.user.id
           }).populate("createdBy","name email")
           .populate("assignedTo","name email")
           .sort({createdAt:-1});
        }
        else {
            tickets= await Ticket.find({
                createdBy:req.user.id
            })
            .populate("assignedTo","name email")
            .sort({createdAt: -1});
        }
        res.status(200).json({
            success:true,
            totalTickets:tickets.length,
            tickets
        });
    }
    catch(err){
        console.error(err);
        res.status(500).json({
            success:false,
            message:"Server Error"
        });
    }
};

const updateTicketStatus = async(req,res)=>{
    try{
        const {status}= req.body;
        const allowedStatus = [
            "Open",
            "In Progress",
            "Resolved",
            "Closed",
        ];
        if(!allowedStatus.includes(status)){
            return res.status(400).json({
                success:false,
                message:"Invalid status",
            });
        }
        const ticket = await Ticket.findById(req.params.id);
        if(!ticket){
            return res.status(404).json({
                success:false,
                message:"Ticket not found",
            });
        }

        if(req.user.role==="customer"){
            return res.status(403).json({
                success:false,
                message:"Customers cannot update ticket status",
            })
        }

        if(req.user.role === "agent"){
            if(!ticket.assignedTo || ticket.assignedTo.toString()!== req.user.id){
                return res.status(403).json({
                    success:false,
                    message:"This ticket is not assigned to you",
                });
            }
        }
        const validTransitions = {
            "Open": ["In Progress"],
            "In Progress": ["Resolved"],
            "Resolved": ["Closed"],
            "Closed": [],
        };

        if (!validTransitions[ticket.status].includes(status)) {
            return res.status(400).json({
                success: false,
                message: `Cannot change status from ${ticket.status} to ${status}`,
            });
        }
        ticket.status=status;
        await ticket.save();
        res.status(200).json({
            success:true,
            message:'Ticket status updated successfully',
            ticket,
        });
    }
    catch(err){
        console.error(err);
        res.status(500).json({
            success:false,
            message:"Server Error",
        });
    }
};

module.exports={
    createTicket,
    getMyTickets,
    getTicketById,
    updateTicket,
    assignTicket,
    getTickets,
    updateTicketStatus,
}