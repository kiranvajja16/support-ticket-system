const express = require("express")
const cors=require("cors");
require("dotenv").config();
console.log(process.env.MONGO_URI);

const connectDB=require("./config/db");
const app=express();

connectDB()

app.use(cors());
app.use(express.json());

app.get("/",(req,res)=>{
    res.send("Support Ticket System API is running...");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`);
});

