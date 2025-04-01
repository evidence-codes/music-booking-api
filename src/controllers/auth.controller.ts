import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { User } from "../models/user.model";
import { errorResponse, successResponse } from "../utils/response.handler";
import { catchAsync, convertToLowercase } from "../utils/helpers";
import jwt from "jsonwebtoken";
import { config } from "../config/config";
import AuthService from "../services/Auth.service";
import { BadRequestError } from "../utils/error";

if (process.env.JWT_SECRET === undefined) {
  throw new Error("JWT_SECRET_EXPIRE is not defined");
}

const secret = process.env.JWT_SECRET as string;

class AuthController {
  constructor(private readonly authService = AuthService) {}

  registerUser = catchAsync(async (req: Request, res: Response) => {
    const { name, email, password } = req.body;

    const emailTaken = await this.authService.getUserByEmail(
      convertToLowercase(email)
    );

    if (emailTaken) {
      throw new BadRequestError("Email already taken");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const userData = {
      name,
      email: convertToLowercase(email),
      password: hashedPassword,
    };

    const user = await this.authService.saveUser(userData as User);

    successResponse({
      res,
      message: "User registered successfully",
      data: user,
    });
  });

  loginUser = catchAsync(async (req: Request, res: Response) => {
    const data = req.body;

    if (!data.email) {
      throw new BadRequestError("Email is required");
    }

    const query: any = {};

    if (data.email) {
      query.email = convertToLowercase(data.email!);
    }

    // Find user by email or username
    const user = await this.authService.getUserByEmail(query.email);

    if (!user) {
      throw new BadRequestError("Invalid credentials");
    }

    const isPasswordValid = await bcrypt.compare(data.password, user.password);

    if (!isPasswordValid) {
      throw new BadRequestError("Invalid credentials");
    }

    const accessToken = jwt.sign({ id: user.id }, secret, {
      expiresIn: "1d",
    });

    // await this.authService.saveUser(user);

    return successResponse({
      res,
      message: "User logged in successfully",
      data: { user, accessToken },
    });
  });
}

export default new AuthController();
