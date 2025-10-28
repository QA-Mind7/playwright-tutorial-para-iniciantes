import * as dotenv from 'dotenv';
import Joi from 'joi';

const environmentPath = process.env.ENVIRONMENT
  ? `./env/.env.${process.env.ENVIRONMENT}`
  : `./env/.env.dev`; // Default to dev environment

dotenv.config({
  path: environmentPath,
});

const envSchema = Joi.object({
  // Environment
  BASE_URL: Joi.string().uri().required(),
  USER_NAME: Joi.string().required(),
  PASSWORD: Joi.string().required(),

  // Playwright settings
  WORKERS: Joi.number().integer().min(1).required(),
  RETRY_FAILED: Joi.number().integer().min(0).required(),
}).unknown(true);

const envVars = envSchema.validate(process.env, {
  allowUnknown: true,
  abortEarly: false,
});

if (envVars.error) {
  throw new Error(`Environment validation error: ${envVars.error.message}`);
}

export class Config {
  static readonly BASE_URL: string = envVars.value.BASE_URL;
  static readonly USER_NAME: string = envVars.value.USER_NAME;
  static readonly PASSWORD: string = envVars.value.PASSWORD;

  static readonly WORKERS: number = envVars.value.WORKERS;
}
