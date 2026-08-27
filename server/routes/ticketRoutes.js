const express = require("express");

const router = express.Router();

const {
    createTicket,
    getMyTickets,
    getTicketById,
    updateTicket,
    assignTicket,
    getTickets,
    updateTicketStatus
} = require("../controllers/ticketController");

const { protect } = require("../middleware/authMiddleware");

// Create ticket
router.post("/", protect, createTicket);

// Get tickets based on logged-in user's role
router.get("/", protect, getTickets);

// Get customer's own tickets
router.get("/my", protect, getMyTickets);

// Get a specific ticket
router.get("/:id", protect, getTicketById);

// Update ticket
router.put("/:id", protect, updateTicket);

// Assign ticket to agent
router.put("/:id/assign", protect, assignTicket);

// Update ticket status
router.put("/:id/status", protect, updateTicketStatus);

module.exports = router;