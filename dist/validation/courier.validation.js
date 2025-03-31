"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const validate_1 = __importDefault(require("./validate"));
// import { timezoneValidator } from './session.validate';
const loginSchema = joi_1.default.object({
    email: joi_1.default.string().email(),
    password: joi_1.default.string().required(),
});
const registerCourierProfileSchema = joi_1.default.object({
    email: joi_1.default.string().email().required(),
    address: joi_1.default.string().required(),
    licenseNumber: joi_1.default.string().required(),
    licenseExpiry: joi_1.default.string().required(),
    vehicleType: joi_1.default.string().required(),
    vehicleMake: joi_1.default.string().required(),
    vehicleModel: joi_1.default.string().required(),
    vehicleYear: joi_1.default.string().required(),
    vehicleColor: joi_1.default.string().required(),
});
exports.default = {
    loginSchemaValidation: (0, validate_1.default)(loginSchema),
    registerCourierProfileSchemaValidation: (0, validate_1.default)(registerCourierProfileSchema),
};
