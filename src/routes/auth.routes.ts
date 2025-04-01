import { Router } from "express";
import AuthController from "../controllers/auth.controller";
import Validator from "../validation/user.validation";

const { registerSchemaValidation, loginSchemaValidation } = Validator;
const authRouter = Router();

authRouter.post(
  "/register",
  registerSchemaValidation,
  AuthController.registerUser
);
authRouter.post("/login", loginSchemaValidation, AuthController.loginUser);

export default authRouter;
