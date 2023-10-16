import { v4 as uuidv4 } from 'uuid';
import { getNamespace } from 'continuation-local-storage';
import { createLogger, format, transports, Logger } from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';
import appRoot from 'app-root-path';
import path from 'path';

const namespace = getNamespace('logger');
const logsPath = path.join(appRoot.path, 'lib/logger/logs/');

const fileFormat = format.combine(
  format.timestamp(),
  format.align(),
  format.printf((info: any) => {
    try {
      const logId = namespace?.get('logId') || uuidv4();
      const { timestamp, level, message, ...args } = info;
      const ts = timestamp.slice(0, 19).replace('T', ' ');
      return `${ts} - ${logId} - ${level}: ${message?.trim() || ''} ${Object.keys(args).length ? JSON.stringify(args, null, 2) : ''}`;
    } catch (error) {
      console.error('Error @ fileFormat @ logger', error);
      return '';
    }
  }),
);

const createCustomLogger = (logLevel: string, fileName: string): Logger => {
  return createLogger({
    level: logLevel,
    format: fileFormat,
    transports: [
      new DailyRotateFile({
        level: logLevel,
        filename: `${logsPath}/${fileName}-%DATE%.log`,
        handleExceptions: true,
        json: true,
        // maxsize: 5242880, // 5MB
        // colorize: false,
      }),
    ],
  });
};

const infoLogger = createCustomLogger('info', 'info');
const errorLogger = createCustomLogger('error', 'error');

const consoleFormat = format.combine(
  format.colorize(),
  format.timestamp(),
  format.align(),
  format.printf((info: any) => {
    try {
      const logId = namespace?.get('logId') || uuidv4();
      const { timestamp, level, message, ...args } = info;
      const ts = timestamp.slice(0, 19).replace('T', ' ');
      return `${ts} - ${logId} - ${level}: ${message?.trim() || ''} ${Object.keys(args).length ? JSON.stringify(args, null, 2) : ''}`;
    } catch (error) {
      console.error('Error @ consoleFormat @ logger', error);
      return '';
    }
  }),
);

if (process.env.NODE_ENV !== 'production') {
  infoLogger.add(new transports.Console({ format: consoleFormat }));
  errorLogger.add(new transports.Console({ format: consoleFormat }));
}

const logger = {
  info: async (msg: string, ...args: any[]) => {
    infoLogger.info(msg, ...args);
  },
  error: async (msg: string, ...args: any[]) => {
    errorLogger.error(msg, ...args);
  },
};

export default logger;
