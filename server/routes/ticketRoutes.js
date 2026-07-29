const express= require("express");
const router=express.Router();

const {createTicket,getMyTickets,getTicketById}= require("../controllers/ticketController");

const {protect}=require("../middleware/authMiddleware");

router.post("/",protect,createTicket);
router.get("/my",protect,getMyTickets);
router.get("/:id",protect,getTicketById);

module.exports=router;