import { Router } from "express";
import userController from "../controllers/user.controller";
import Validator from "../validation/user.validation";
import { isAuthenticated } from "../middlewares/auth.middleware";

const { updateUserSchemaValidation, changePasswordSchemaValidation } =
  Validator;
const userRouter = Router();

userRouter.use(isAuthenticated);
userRouter.put(
  "/profile",
  updateUserSchemaValidation,
  userController.updateUserProfile
);
userRouter.put(
  "/password",
  changePasswordSchemaValidation,
  userController.changeUserPassword
);
userRouter.get("/profile", userController.getUserProfile);

export default userRouter;
