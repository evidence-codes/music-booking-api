import { NextFunction, Request, Response } from "express";
import * as crypto from "crypto";

export const USPhoneNumberPattern =
  /^(\+\d{1,2}\s?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$|^(\+1\s?)?\d{10}$/;

export function catchAsync<T>(
  fn: (req: Request, res: Response, next: NextFunction) => Promise<T>
) {
  return (req: Request, res: Response, next: NextFunction): void => {
    fn(req, res, next).catch((err) => next(err));
  };
}
export const generateOTP = (numDigits = 4) => {
  if (numDigits <= 0) {
    return "";
  }

  const min = Math.pow(10, numDigits - 1);
  const max = Math.pow(10, numDigits) - 1;
  return Math.floor(min + Math.random() * (max - min + 1)).toString();
};

export function generateRandomToken(size: number): string {
  // Generates a string twice as long as the size, because hex encoding represents each byte as two characters
  const randomString = crypto.randomBytes(size).toString("hex");

  // Convert to alphanumeric (0-9, a-z, A-Z) by replacing non-alphanumeric characters
  // This is a basic replacement and might not be perfectly uniform in distribution
  const alphanumericString = randomString.replace(/[^0-9a-zA-Z]/g, () => {
    const randomByte = crypto.randomBytes(1).readUInt8(0);
    if (randomByte % 2 === 0) {
      return String.fromCharCode("a".charCodeAt(0) + (randomByte % 26));
    } else {
      return String.fromCharCode("0".charCodeAt(0) + (randomByte % 10));
    }
  });

  // Trim or pad the string to the desired size
  if (alphanumericString.length > size) {
    return alphanumericString.substring(0, size);
  } else {
    // Pad with '0's if the string is shorter than the desired size
    return alphanumericString.padEnd(size, "0");
  }
}

export function generateRandomPassword(length: number = 8): string {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

export function convertToLowercase(data: string) {
  return data?.toLowerCase() || "";
}

export function generateRandomString(length: number): string {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}
