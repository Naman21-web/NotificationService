const createSuccessResponse = (err={},data={},message="Successfully processed the request",success=true) => {
    const successResponse = {
        err,
        data,
        message,
        success
    };
    return successResponse;
};

const createFailureResponse = (err={},data={},message="Something went wrong, Can not process the request",success=false) => {
    const failureResponse = {
        err,
        data,
        message,
        success
    };
    return failureResponse;
};

module.exports = {
    createSuccessResponse,
    createFailureResponse
}