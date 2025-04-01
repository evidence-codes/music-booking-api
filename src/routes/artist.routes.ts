import { Router } from "express";
import artistController from "../controllers/artist.controller";
import Validator from "../validation/artist.validation";
import { isArtistAuthenticated } from "../middlewares/auth.middleware";

const {
  registerSchemaValidation,
  loginSchemaValidation,
  updateArtistSchemaValidation,
  changePasswordSchemaValidation,
} = Validator;
const artistRouter = Router();

artistRouter.post(
  "/register",
  registerSchemaValidation,
  artistController.registerArtist
);
artistRouter.post(
  "/login",
  loginSchemaValidation,
  artistController.loginArtist
);

artistRouter.use(isArtistAuthenticated);
artistRouter.put(
  "/profile",
  updateArtistSchemaValidation,
  artistController.updateArtistProfile
);
artistRouter.put(
  "/password",
  changePasswordSchemaValidation,
  artistController.changeArtistPassword
);
artistRouter.get("/profile", artistController.getArtistProfile);

export default artistRouter;
