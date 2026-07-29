const express = require("express")
const cors=require("cors");
const authRoutes=require("./routes/authRoutes");
const ticketRoutes=require("./routes/ticketRoutes")
const {protect} = require("./middleware/authMiddleware");
require("dotenv").config();
console.log(process.env.MONGO_URI);

const connectDB=require("./config/db");
const app=express();

connectDB()

app.use(cors());
app.use(express.json());
app.use("/api/auth",authRoutes);
app.use("/api/tickets",ticketRoutes);

app.get("/",(req,res)=>{
    res.send("Support Ticket System API is running...");
});
app.get("/api/profile", protect, (req, res) => {
  res.json({
    success: true,
    message: "Protected Route Accessed",
    user: req.user,
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`);
});

