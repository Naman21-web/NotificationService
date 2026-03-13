const { STATUS } = require("../utils/constants");
const {createFailureResponse} = require("../utils/reponse")

const verifyNotificationCreateRequest = async (req,res,next) => {
        if(!req.body || req.body.length === 0){
        const errorResponse = createFailureResponse("No body present in the sent request");
        return res.status(STATUS.BAD_REQUEST).json(errorResponse);
    }   
    if(!req.body.subject){
        const errorResponse = createFailureResponse("No subject present in the sent request");
        return res.status(STATUS.BAD_REQUEST).json(errorResponse);
    }
    if(!req.body.content){
        const errorResponse = createFailureResponse("No content present in the sent request");
        return res.status(STATUS.BAD_REQUEST).json(errorResponse);
    }
    if(!req.body.recepientEmails || !(req.body.recepientEmails instanceof Array) || (req.body.recepientEmails.length <= 0)){
        const errorResponse = createFailureResponse("No recepient email present in the sent request");
        return res.status(STATUS.BAD_REQUEST).json(errorResponse);
    }
    next();
};

module.exports = {
    verifyNotificationCreateRequest
}