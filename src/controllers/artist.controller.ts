import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { Artist } from "../models/artist.model";
import { errorResponse, successResponse } from "../utils/response.handler";
import { catchAsync, convertToLowercase } from "../utils/helpers";
import jwt from "jsonwebtoken";
import ArtistService from "../services/Artist.service";
import { BadRequestError, NotFoundError } from "../utils/error";

export interface ArtistRequest extends Request {
  artist?: Artist;
  artistId?: string;
}

if (process.env.JWT_SECRET === undefined) {
  throw new Error("JWT_SECRET_EXPIRE is not defined");
}

const secret = process.env.JWT_SECRET as string;

class ArtistController {
  constructor(private readonly artistService = ArtistService) {}

  registerArtist = catchAsync(async (req: Request, res: Response) => {
    const { name, email, genre, bio, password } = req.body;

    const emailTaken = await this.artistService.getArtistByEmail(
      convertToLowercase(email)
    );

    if (emailTaken) {
      throw new BadRequestError("Email already taken");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const artistData = {
      name,
      email: convertToLowercase(email),
      password: hashedPassword,
      genre,
      bio,
    };

    const artist = await this.artistService.saveArtist(artistData as Artist);

    successResponse({
      res,
      message: "Artist registered successfully",
      data: artist,
    });
  });

  loginArtist = catchAsync(async (req: Request, res: Response) => {
    const data = req.body;

    if (!data.email) {
      throw new BadRequestError("Email is required");
    }

    const query: any = {};

    if (data.email) {
      query.email = convertToLowercase(data.email!);
    }

    // Find artist by email or username
    const artist = await this.artistService.getArtistByEmail(query.email);

    if (!artist) {
      throw new BadRequestError("Invalid credentials");
    }

    const isPasswordValid = await bcrypt.compare(
      data.password,
      artist.password
    );

    if (!isPasswordValid) {
      throw new BadRequestError("Invalid credentials");
    }

    const accessToken = jwt.sign({ id: artist.id }, secret, {
      expiresIn: "1d",
    });

    // await this.authService.saveUser(user);

    return successResponse({
      res,
      message: "Artist logged in successfully",
      data: { artist, accessToken },
    });
  });

  updateArtistProfile = catchAsync(
    async (req: ArtistRequest, res: Response) => {
      const artist = req?.artist as Artist;
      if (!artist) throw new BadRequestError("Artist not found");

      await this.artistService.editArtistProfile(artist.id, req.body);

      return successResponse({ res, message: "Artist updated successfully" });
    }
  );

  getArtistProfile = catchAsync(async (req: ArtistRequest, res: Response) => {
    const id = (req.query.artistId || req?.artistId) as string;
    const artist = await this.artistService.getArtistById(id);

    if (!artist) throw new NotFoundError("Artist not found");

    return successResponse({
      res,
      message: "Artist profile fetched successfully",
      data: artist,
    });
  });

  changeArtistPassword = catchAsync(
    async (req: ArtistRequest, res: Response) => {
      const artist = req?.artist as Artist;
      const { oldPassword, newPassword } = req.body;

      if (!artist) throw new BadRequestError("Invalid credentials");

      const isPasswordValid = await bcrypt.compare(
        oldPassword,
        artist.password
      );
      if (!isPasswordValid)
        throw new BadRequestError("Old password is incorrect");

      const hashedPassword = await bcrypt.hash(newPassword, 10);
      await this.artistService.editArtistProfile(artist.id, {
        password: hashedPassword,
      });

      return successResponse({ res, message: "Password changed successfully" });
    }
  );
}

export default new ArtistController();
