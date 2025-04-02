import dotenv from "dotenv";
dotenv.config();

export function getEnvValue(key: string, isRequired = true): string {
  const value = process.env[key];
  if (!value && isRequired) {
    throw new Error(`Env variable ${key} not found`);
  }
  return value as string;
}
export const config = {
  jwt: {
    secret: getEnvValue("JWT_SECRET"),
    expiresIn: getEnvValue("JWT_SECRET_EXPIRE"),
  },
};
