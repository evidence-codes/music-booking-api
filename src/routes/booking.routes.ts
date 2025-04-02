import { Router } from "express";
import bookingController from "../controllers/booking.controller";
import Validator from "../validation/booking.validation";
import { isAuthenticated } from "../middlewares/auth.middleware";

const { createBookingSchemaValidation } = Validator;

const bookingRouter = Router();

bookingRouter.use(isAuthenticated);
bookingRouter.post(
  "/create",
  createBookingSchemaValidation,
  bookingController.createBooking
);
bookingRouter.get("/", bookingController.getBookings);

bookingRouter.get("/:id", bookingController.getBookingById);
// bookingRouter.put(
//   "/:id",
//   updateBookingSchemaValidation,
//   bookingController.updateBooking
// );
bookingRouter.delete("/:id", bookingController.deleteBooking);

export default bookingRouter;
