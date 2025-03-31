"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const validate_1 = __importDefault(require("./validate"));
// import { timezoneValidator } from './session.validate';
const loginSchema = joi_1.default.object({
    username: joi_1.default.string().optional(),
    email: joi_1.default.string().email().optional(),
    password: joi_1.default.string().required(),
}).or('username', 'email');
const registerSchema = joi_1.default.object({
    email: joi_1.default.string().email().required(),
});
const registerProfileSchema = joi_1.default.object({
    fullName: joi_1.default.string().required(),
    email: joi_1.default.string().email().required(),
    phoneNumber: joi_1.default.string().required(),
    password: joi_1.default.string().required().min(8),
});
const requestPasswordResetSchema = joi_1.default.object({
    email: joi_1.default.string().email().optional(),
    username: joi_1.default.string().optional(),
}).or('email', 'username');
const resetPasswordSchema = joi_1.default.object({
    token: joi_1.default.string().required(),
    password: joi_1.default.string().required().min(8),
});
const userPersonalDetails = joi_1.default.object({
    fullName: joi_1.default.string().optional(),
    email: joi_1.default.string().email().optional(),
    phoneNumber: joi_1.default.string().optional(),
    dateOfBirth: joi_1.default.date().iso().optional(),
});
const changePassword = joi_1.default.object({
    oldPassword: joi_1.default.string().required(),
    newPassword: joi_1.default.string().required().min(8),
});
const updateUserProfile = joi_1.default.object({
    fullName: joi_1.default.string().optional(),
    username: joi_1.default.string().optional(),
    bio: joi_1.default.string().optional(),
    profilePictureBase64: joi_1.default.string().optional(),
});
const verifyEmailSchema = joi_1.default.object({
    email: joi_1.default.string().required(),
    otp: joi_1.default.string().required(),
});
const requestNewCodeSchema = joi_1.default.object({
    email: joi_1.default.string().required(),
});
const changeEmailSchema = joi_1.default.object({
    oldEmail: joi_1.default.string().required(),
    newEmail: joi_1.default.string().email().required(),
});
const updateAppSettings = joi_1.default.object({
    theme: joi_1.default.string().valid('light', 'dark').required(),
});
exports.default = {
    loginSchemaValidation: (0, validate_1.default)(loginSchema),
    registerSchemaValidation: (0, validate_1.default)(registerSchema),
    registerProfileSchemaValidation: (0, validate_1.default)(registerProfileSchema),
    requestPasswordResetSchemaValidation: (0, validate_1.default)(requestPasswordResetSchema),
    resetPasswordSchemaValidation: (0, validate_1.default)(resetPasswordSchema),
    userPersonalDetailsValidation: (0, validate_1.default)(userPersonalDetails),
    changePasswordValidation: (0, validate_1.default)(changePassword),
    updateUserProfileValidation: (0, validate_1.default)(updateUserProfile),
    verifyEmailSchemaValidation: (0, validate_1.default)(verifyEmailSchema),
    requestNewCodeSchemaValidation: (0, validate_1.default)(requestNewCodeSchema),
    changeEmailSchemaValidation: (0, validate_1.default)(changeEmailSchema),
    updateAppSettingsValidation: (0, validate_1.default)(updateAppSettings),
};
