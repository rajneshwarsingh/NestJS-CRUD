import { v4 as uuidv4 } from 'uuid';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const namespace = require('continuation-local-storage').getNamespace('logger');
import { createLogger, transports, format } from 'winston';
import 'winston-daily-rotate-file'; // Add DailyRotateFile to Winston transports

const logsPath = `${process.cwd()}/logger/logs/`;

const fileFormat = format.combine(
  format.timestamp(),
  format.align(),
  // eslint-disable-next-line consistent-return
  format.printf((info) => {
    let log = '';
    try {
      const logId = namespace && namespace.get('logId') ? namespace.get('logId') : uuidv4();
      const { timestamp, level, message, ...args } = info;
      const ts = timestamp.slice(0, 19).replace('T', ' ');
      log = `${ts} - ${logId} - ${level}: ${message ? message.trim() : ''} ${Object.keys(args).length ? JSON.stringify(args, null, 2) : ''}`;
      return log;
    } catch (error) {
      console.log('Error @ fileFormat @ logger ', error);
    }
  }),
);
//Create the logger
const info = createLogger({
  level: 'info',
  format: fileFormat,
  transports: [
    new transports.DailyRotateFile({
      level: 'info',
      filename: `${logsPath}/info-%DATE%.log`,
      handleExceptions: true,
      json: true,
      maxSize: 100000, // 5MB
    }),
    new transports.Console({
      level: 'error',
      format: format.combine(format.colorize(), format.simple()),
    }),
  ],
});

const error = createLogger({
  level: 'error',
  format: fileFormat,
  transports: [
    new transports.DailyRotateFile({
      level: 'error',
      filename: `${logsPath}/error-%DATE%.log`,
      handleExceptions: true,
      json: true,
      maxSize: 5242880, // 5MB
    }),
    new transports.Console({
      level: 'error',
      format: format.combine(format.colorize(), format.simple()),
    }),
  ],
});

const consoleFormat = format.combine(
  format.colorize(),
  format.timestamp(),
  format.align(),
  // eslint-disable-next-line consistent-return
  format.printf((info: any) => {
    let log = '';
    try {
      const logId = namespace && namespace.get('logId') ? namespace.get('logId') : uuidv4();
      const { timestamp, level, message, ...args } = info;
      const ts = timestamp.slice(0, 19).replace('T', ' ');
      log = `${ts} - ${logId} - ${level}: ${message ? message.trim() : ''} ${Object.keys(args).length ? JSON.stringify(args, null, 2) : ''}`;
      return log;
    } catch (error) {
      console.log('Error @ fileFormat @ logger ', error);
    }
  }),
);

if (process.env.NODE_ENV !== 'production') {
  info.add(
    new transports.Console({
      format: consoleFormat,
    }),
  );
  error.add(
    new transports.Console({
      format: consoleFormat,
    }),
  );
}

const logger = {
  info: async (msg, ...args) => {
    info.info(msg, ...args);
  },
  error: async (msg: any, ...args: any) => {
    console.log('msg', msg);
    console.log('args', args);
    error.error(msg, ...args);
  },
};
export default logger;
