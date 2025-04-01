import { Response } from "express";
import UserService from "../services/User.service";
import { catchAsync } from "../utils/helpers";
import { successResponse } from "../utils/response.handler";
import { BadRequestError, NotFoundError } from "../utils/error";
import { Request } from "../types/express";
import { User } from "../models/user.model";
import bcrypt from "bcryptjs";

class UserController {
  constructor(private readonly userService = UserService) {}

  updateUserProfile = catchAsync(async (req: Request, res: Response) => {
    const user = req?.user as User;
    if (!user) throw new BadRequestError("User not found");

    await this.userService.editUserProfile(user.id, req.body);

    return successResponse({ res, message: "User updated successfully" });
  });

  getUserProfile = catchAsync(async (req: Request, res: Response) => {
    const id = (req.query.userId || req?.userId) as string;
    const user = await this.userService.getUserById(id);

    if (!user) throw new NotFoundError("User not found");

    return successResponse({
      res,
      message: "User profile fetched successfully",
      data: user,
    });
  });

  changeUserPassword = catchAsync(async (req: Request, res: Response) => {
    const user = req?.user as User;
    const { oldPassword, newPassword } = req.body;

    if (!user) throw new BadRequestError("Invalid credentials");

    const isPasswordValid = await bcrypt.compare(oldPassword, user.password);
    if (!isPasswordValid)
      throw new BadRequestError("Old password is incorrect");

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await this.userService.editUserProfile(user.id, {
      password: hashedPassword,
    });

    return successResponse({ res, message: "Password changed successfully" });
  });
}

export default new UserController();
