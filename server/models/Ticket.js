const mongoose= require("mongoose");

const ticketSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        trim:true,
    },
    description:{
        type:String,
        required:true,
    },
    category:{
        type:String,
        enum:["Technical","Billing","General"],
        default:"General",
    },
    status:{
        type:String,
        enum:["Open","In Progress","Resolved","Closed"],
        default:"Open",
    },
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    assignedTo:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        default:null,
    },
},{timestamps:true,});

module.exports = mongoose.model("Ticket",ticketSchema);