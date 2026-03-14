const cron = require("node-cron");
const Ticket = require("../models/ticketNotification.model");
const {sendMail} = require("../services/email.service");

const mailerCron = () => {
    cron.schedule('*/2 * * * *', async () => {//Schedule cron after every 2 mins
        console.log("Executing cron again...");
        const notificationToBeSent = await Ticket.find({
            status: 'PENDING'
        });
        notificationToBeSent.forEach(async notification => {
            let to = notification.recepientEmails;
            let subject = notification.subject;
            let content = notification.content;
            const res = sendMail(to,subject,content,false);
            if(res){
                const savedNotification = await Ticket.findOne({_id:notification._id});
                savedNotification.status = "SUCCESS";
                await savedNotification.save(); 
            }
        });
    })
};

module.exports = {
    mailerCron
}