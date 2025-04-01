import Joi from "joi";
import validate from "./validate";
// import { timezoneValidator } from './session.validate';

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const registerSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required().min(8),
});

const updateUserSchema = Joi.object({
  name: Joi.string().optional(),
  email: Joi.string().email().optional(),
});

const changePasswordSchema = Joi.object({
  oldPassword: Joi.string().required(),
  newPassword: Joi.string().required().min(8),
});

export default {
  loginSchemaValidation: validate(loginSchema),
  registerSchemaValidation: validate(registerSchema),
  updateUserSchemaValidation: validate(updateUserSchema),
  changePasswordSchemaValidation: validate(changePasswordSchema),
};
