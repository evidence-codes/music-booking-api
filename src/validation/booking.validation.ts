import Joi, { date } from "joi";
import validate from "./validate";

const createBookingSchema = Joi.object({
  eventId: Joi.number().required(),
});

export default {
  createBookingSchemaValidation: validate(createBookingSchema),
};
