// middlewares/auth.middleware.ts

import { Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwt.utils";
import { UnauthorizedError } from "../utils/error";
import { isBlacklisted } from "../utils/tokenBlacklist";
import jwt from "jsonwebtoken";

import { Request } from "../types/express";
import { ArtistRequest } from "../controllers/artist.controller";

import { User } from "../models/user.model";
import { Artist } from "../models/artist.model";

export const isAuthenticated = async (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  const authorizationHeader = req.headers["authorization"];
  console.log({ authorizationHeader });
  if (!authorizationHeader) {
    return next(new UnauthorizedError("No authentication token provided."));
  }

  const token = authorizationHeader.split(" ")[1];

  try {
    if (!token) {
      return next(new UnauthorizedError("No authentication token provided."));
    }

    if (isBlacklisted(token)) {
      return next(new UnauthorizedError("Token is invalid."));
    }

    const decoded = verifyToken(token);

    const userId = decoded.id;
    const user = await User.findByPk(userId);
    if (!user) {
      return next(new UnauthorizedError("User not found."));
    }
    req.user = user;
    req.userId = userId;
    next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return next(new UnauthorizedError("Authentication token has expired."));
    } else {
      return next(new UnauthorizedError("Authentication token is invalid."));
    }
  }
};

export const isArtistAuthenticated = async (
  req: ArtistRequest,
  _res: Response,
  next: NextFunction
) => {
  const authorizationHeader = req.headers["authorization"];
  console.log({ authorizationHeader });
  if (!authorizationHeader) {
    return next(new UnauthorizedError("No authentication token provided."));
  }

  const token = authorizationHeader.split(" ")[1];

  try {
    if (!token) {
      return next(new UnauthorizedError("No authentication token provided."));
    }

    if (isBlacklisted(token)) {
      return next(new UnauthorizedError("Token is invalid."));
    }

    const decoded = verifyToken(token);

    const artistId = decoded.id;
    const artist = await Artist.findByPk(artistId);
    if (!artist) {
      return next(new UnauthorizedError("Artist not found."));
    }
    req.artist = artist;
    req.artistId = artistId;
    next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return next(new UnauthorizedError("Authentication token has expired."));
    } else {
      return next(new UnauthorizedError("Authentication token is invalid."));
    }
  }
};

export const isAdminAuthenticated = async (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  const authorizationHeader = req.headers["authorization"];
  if (!authorizationHeader) {
    return next(new UnauthorizedError("No authentication token provided."));
  }

  const token = authorizationHeader.split(" ")[1];
  // console.log({ token });
  try {
    if (!token) {
      return next(new UnauthorizedError("No authentication token provided."));
    }
    const decoded = verifyToken(token);

    const userId = decoded.id;
    const user = await User.findByPk(userId);

    if (!user) {
      return next(new UnauthorizedError("User not found."));
    }
    if (user?.role === "customer" || user?.role === "artist") {
      return next(new UnauthorizedError("User not authorized."));
    }
    req.user = user;
    req.userId = userId;
    next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return next(new UnauthorizedError("Authentication token has expired."));
    } else {
      return next(new UnauthorizedError("Authentication token is invalid."));
    }
  }
};
