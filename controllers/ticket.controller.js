const notificationService = require("../services/notification.service");
const { STATUS } = require("../utils/constants");
const {createSuccessResponse,createFailureResponse} = require("../utils/reponse")


const createTicket = async (req,res) => {
    try{
      const response = await notificationService.createNotification(req.body);
      const successReponse =  createSuccessResponse({},response,"Ticket created successfully",true);
      return res.status(STATUS.OK).json(successReponse);  
    }
    catch(error){
        if(error.err){
           const errorResponse = createFailureResponse(error.err,{},"Validation Error while creating ticket",false);
           return res.status(error.code).json(errorResponse); 
        }
        const errorResponse = createFailureResponse(error.message,{},"Error creating ticket",false);
        return res.status(STATUS.INTERNAL_SERVER_ERROR).json(errorResponse);
    }
};

const getAllTickets = async (req,res) => {
    try{
      const response = await notificationService.getAllNotifications();
      const successReponse =  createSuccessResponse({},response,"Fetched all notifications successfully",true);
      return res.status(STATUS.OK).json(successReponse);  
    }
    catch(error){
        const errorResponse = createFailureResponse(error.message,{},"Error fetching notifications",false);
        return res.status(STATUS.INTERNAL_SERVER_ERROR).json(errorResponse);
    }
};

const getTicketById = async (req,res) => {
    try{
      const response = await notificationService.getNotificationById(req.params.ticketId);
      const successReponse =  createSuccessResponse({},response,"Fetched notification successfully",true);
      return res.status(STATUS.OK).json(successReponse);  
    }
    catch(error){
        if(error.err){
           const errorResponse = createFailureResponse(error.err,{},"Validation Error while creating ticket",false);
           return res.status(error.code).json(errorResponse); 
        }
        const errorResponse = createFailureResponse(error.message,{},"Error fetching notification",false);
        return res.status(STATUS.INTERNAL_SERVER_ERROR).json(errorResponse);
    }
};

module.exports = {
    createTicket,
    getAllTickets,
    getTicketById
}