"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const validate_1 = __importDefault(require("./validate"));
const createPackageSchema = joi_1.default.object({
    receiverName: joi_1.default.string().required(),
    receiverPhoneNumber: joi_1.default.string().required(),
    category: joi_1.default.string().required(),
    packageName: joi_1.default.string().required(),
    weight: joi_1.default.number().required(),
    quantity: joi_1.default.number().required(),
    value: joi_1.default.number().required(),
    preferredVehicle: joi_1.default.string().required(),
    pickupLocation: joi_1.default.string().required(),
    dropOffLocation: joi_1.default.string().required(),
    // deliveryInstructions: Joi.string().required(),
    deliveryCost: joi_1.default.number().required(),
    distance: joi_1.default.number().required(),
    eta: joi_1.default.number().required(),
});
const calculateDeliveryCostSchema = joi_1.default.object({
    weight: joi_1.default.number().required(),
    distance: joi_1.default.number().required(),
    category: joi_1.default.string().required(),
    preferredVehicle: joi_1.default.string().required(),
});
exports.default = {
    createPackageSchemaValidation: (0, validate_1.default)(createPackageSchema),
    calculateDeliveryCostSchemaValidation: (0, validate_1.default)(calculateDeliveryCostSchema),
};
