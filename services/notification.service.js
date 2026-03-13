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

module.exports = {
    createNotification
}