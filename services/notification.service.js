const Ticket = require("../models/ticketNotification.model");
const {STATUS} = require("../utils/constants");

const createNotification = async (data) => {
    try{
       const ticket = await Ticket.create(data); 
       return ticket; 
    }
    catch(error){
        if(error.name = "ValidationError"){
            let err = {};
            Object.keys(error.errors).forEach(key => {
                err[key] = error.errors[key].message;
            });
            throw {
                err,
                code: STATUS.UNPROCESSABLE
            }
        }
        throw error;
    }
};

const getAllNotifications = async (data) => {
    try{
       const tickets = await Ticket.find({}); 
       return tickets; 
    }
    catch(error){
        throw error;
    }
};

const getNotificationById = async (id) => {
    try{
        const ticket = await Ticket.findById(id);
        if(!ticket){
            throw {
                err: "No ticket for partcular id found",
                code: STATUS.NOT_FOUND
            }
        }
       return ticket; 
    }
    catch(error){
        throw error;
    }
};

module.exports = {
    createNotification,
    getAllNotifications,
    getNotificationById
}