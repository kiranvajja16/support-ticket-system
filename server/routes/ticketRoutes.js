const express= require("express");
const router=express.Router();

const {createTicket,getMyTickets,getTicketById,updateTicket}= require("../controllers/ticketController");

const {protect}=require("../middleware/authMiddleware");

router.post("/",protect,createTicket);
router.get("/my",protect,getMyTickets);
router.get("/:id",protect,getTicketById);
router.put("/:id",protect,updateTicket);

module.exports=router;