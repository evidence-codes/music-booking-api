import e, { Router } from "express";
import eventController from "../controllers/event.controller";
import Validator from "../validation/event.validation";
import { isArtistAuthenticated } from "../middlewares/auth.middleware";

const { createEventSchemaValidation, updateEventSchemaValidation } = Validator;

const eventRouter = Router();

eventRouter.get("/", eventController.getEvents);

eventRouter.use(isArtistAuthenticated);
eventRouter.post(
  "/create",
  createEventSchemaValidation,
  eventController.createEvent
);
eventRouter.get("/:id", eventController.getEventById);
eventRouter.put(
  "/:id",
  updateEventSchemaValidation,
  eventController.updateEvent
);
eventRouter.delete("/:id", eventController.deleteEvent);

export default eventRouter;
