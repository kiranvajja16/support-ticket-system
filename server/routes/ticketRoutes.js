const express= require("express");
const router=express.Router();

const {createTicket,getMyTickets,getTicketById,updateTicket
    ,assignTicket
}= require("../controllers/ticketController");

const {protect}=require("../middleware/authMiddleware");

router.post("/",protect,createTicket);
router.get("/my",protect,getMyTickets);
router.get("/:id",protect,getTicketById);
router.put("/:id",protect,updateTicket);
router.put("/:id/assign",protect,assignTicket);

module.exports=router;