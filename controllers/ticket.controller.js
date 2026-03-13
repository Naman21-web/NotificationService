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
           return res.json(error.code).json(errorResponse); 
        }
        const errorResponse = createFailureResponse(error.message,{},"Error creating ticket",false);
        return res.json(STATUS.INTERNAL_SERVER_ERROR).json(errorResponse);
    }
};


module.exports = {
    createTicket
}