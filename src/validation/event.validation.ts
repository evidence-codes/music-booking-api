import Joi, { date } from "joi";
import validate from "./validate";

const createEventSchema = Joi.object({
  title: Joi.string().required(),
  date: Joi.date().required(),
  location: Joi.string().required(),
});

const updateEventSchema = Joi.object({
  title: Joi.string().optional(),
  date: Joi.date().optional(),
  location: Joi.string().optional(),
});

export default {
  createEventSchemaValidation: validate(createEventSchema),
  updateEventSchemaValidation: validate(updateEventSchema),
};
