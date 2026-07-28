const mongoose = require("mongoose");

mongoose
  .connect("mongodb+srv://vajjakiran2005_db_user:Mongo1234@support-ticket-system.tcqsza6.mongodb.net/stickets?retryWrites=true&w=majority&appName=support-ticket-system")
  .then(() => {
    console.log("Connected Successfully");
    process.exit(0);
  })
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });