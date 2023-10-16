/*
 * @file: config.ts
 * @description:  It contain multipal environment.
 * @author: Rajneshwar Singh
 */

import { ConfigModule } from '@nestjs/config';
ConfigModule.forRoot();

const development = {
  port: process.env.DEV_PORT,
  database: process.env.DEV_DB_DATABASE,
  dbUsername: process.env.DEV_DB_USERNAME,
  dbPassword: process.env.DEV_DB_PASSWORD,
  dbHost: process.env.DEV_DB_HOST,
  dbPort: process.env.DEV_DB_PORT,
  dbDialect: process.env.DEV_DB_DIALECT,
  dbLogger: process.env.DEV_DB_LOOGER,
  jwtSecretKey: process.env.DEV_JWT_SECRETKEY,
};

const staging = {
  port: process.env.STAGE_PORT,
  database: process.env.STAGE_DB_DATABASE,
  dbUsername: process.env.STAGE_DB_USERNAME,
  dbPassword: process.env.STAGE_DB_PASSWORD,
  dbHost: process.env.STAGE_DB_HOST,
  dbPort: process.env.STAGE_DB_PORT,
  dbDialect: process.env.STAGE_DB_DIALECT,
  dbLogger: process.env.STAGE_DB_LOOGER,
  jwtSecretKey: process.env.STAGE_JWT_SECRETKEY,
};

const configs = { development, staging };
const env = process.env.NODE_ENV || 'development';
const config = configs[env];
export default config;
