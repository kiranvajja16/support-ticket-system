const express= require("express");
const router=express.Router();

const {createTicket}= require("../controllers/ticketController");

const {protect}=require("../middleware/authMiddleware");

router.post("/",protect,createTicket);

module.exports=router;