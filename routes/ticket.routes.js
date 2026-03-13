const ticketController = require("../controllers/ticket.controller");
const ticketMiddleware = require("../middlewares/ticket.middleware");

const routes = (app) => {
    app.post("/notiservice/api/v1/notifications",
        ticketMiddleware.verifyNotificationCreateRequest,
        ticketController.createTicket
    );
    app.get("/notiservice/api/v1/notifications",
        ticketController.getAllTickets
    );
    app.get("/notiservice/api/v1/notifications/:ticketId",
        ticketController.getTicketById
    );
};

module.exports = routes;