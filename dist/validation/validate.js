"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const error_1 = require("../utils/error");
const validate = (schema, source = 'body') => {
    return (req, res, next) => {
        var _a;
        const input = Object.assign({}, req[source]);
        const { error } = schema.validate(input);
        if (error && ((_a = error.details) === null || _a === void 0 ? void 0 : _a[0])) {
            next(new error_1.BadRequestError(error.details[0].message));
        }
        else if (error) {
            next(new error_1.BadRequestError('Validation failed'));
        }
        next();
        return res;
    };
};
exports.default = validate;
