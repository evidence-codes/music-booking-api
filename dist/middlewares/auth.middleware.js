"use strict";
// middlewares/auth.middleware.ts
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAdminAuthenticated = exports.isAuthenticated = void 0;
const jwt_utils_1 = require("../utils/jwt.utils");
const error_1 = require("../utils/error");
const tokenBlacklist_1 = require("../utils/tokenBlacklist");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const ormconfig_1 = require("../ormconfig");
const User_1 = require("../models/User");
const isAuthenticated = (req, _res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const authorizationHeader = req.headers['authorization'];
    console.log({ authorizationHeader });
    if (!authorizationHeader) {
        return next(new error_1.UnauthorizedError('No authentication token provided.'));
    }
    const token = authorizationHeader.split(' ')[1];
    try {
        if (!token) {
            return next(new error_1.UnauthorizedError('No authentication token provided.'));
        }
        if ((0, tokenBlacklist_1.isBlacklisted)(token)) {
            return next(new error_1.UnauthorizedError('Token is invalid.'));
        }
        const decoded = (0, jwt_utils_1.verifyToken)(token);
        const userId = decoded.id;
        const user = yield ormconfig_1.UserRepository.findOneBy({ id: userId });
        if (!user) {
            return next(new error_1.UnauthorizedError('User not found.'));
        }
        req.user = user;
        req.userId = userId;
        next();
    }
    catch (error) {
        if (error instanceof jsonwebtoken_1.default.TokenExpiredError) {
            return next(new error_1.UnauthorizedError('Authentication token has expired.'));
        }
        else {
            return next(new error_1.UnauthorizedError('Authentication token is invalid.'));
        }
    }
});
exports.isAuthenticated = isAuthenticated;
const isAdminAuthenticated = (req, _res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const authorizationHeader = req.headers['authorization'];
    if (!authorizationHeader) {
        return next(new error_1.UnauthorizedError('No authentication token provided.'));
    }
    const token = authorizationHeader.split(' ')[1];
    // console.log({ token });
    try {
        if (!token) {
            return next(new error_1.UnauthorizedError('No authentication token provided.'));
        }
        const decoded = (0, jwt_utils_1.verifyToken)(token);
        const userId = decoded.id;
        const user = yield ormconfig_1.UserRepository.findOneBy({ id: userId });
        if (!user) {
            return next(new error_1.UnauthorizedError('User not found.'));
        }
        if ((user === null || user === void 0 ? void 0 : user.role) === User_1.Roles.USER) {
            return next(new error_1.UnauthorizedError('User not authorized.'));
        }
        req.user = user;
        req.userId = userId;
        next();
    }
    catch (error) {
        if (error instanceof jsonwebtoken_1.default.TokenExpiredError) {
            return next(new error_1.UnauthorizedError('Authentication token has expired.'));
        }
        else {
            return next(new error_1.UnauthorizedError('Authentication token is invalid.'));
        }
    }
});
exports.isAdminAuthenticated = isAdminAuthenticated;
