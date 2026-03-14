const express = require("express");
const bodyParser = require("body-parser");
const env = require("dotenv");
const mongoose = require("mongoose");
const {sendMail} = require("./services/email.service");
const notificationRoutes = require("./routes/ticket.routes"); 
const {mailerCron} = require("./crons/cron");

env.config();

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

notificationRoutes(app);

app.listen(process.env.PORT, async () => {
    console.log("Notification server started");
    const dbURL = process.env.DB_URL + '/' + process.env.DB_NAME;
    try{
        await mongoose.connect(dbURL);
        console.log("Successfully connected to mongo");
        // sendMail("jainn0984@gmail.com","MBA Test Mail","This is test mail of our Movie Booking Application",false);
    }
    catch(error){
        console.log(error);
    }

    mailerCron();
});