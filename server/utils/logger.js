import winston from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';

const { combine, timestamp, printf, colorize, errors } = winston.format;

const logFormat = printf(({ level, message, timestamp, stack }) => {
  return `${timestamp} ${level}: ${stack || message}`;
});

const logger = winston.createLogger({
  level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
  format: combine(
    timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    errors({ stack: true }),
    logFormat
  ),
  transports: [
    // In production (Vercel), we ONLY log to console because Vercel has a read-only filesystem
    // Writing to 'logs/' will crash the serverless function.
    ...(process.env.NODE_ENV === 'production' 
      ? [
          new winston.transports.Console({
            format: combine(colorize(), logFormat),
          })
        ]
      : [
          new DailyRotateFile({
            filename: 'logs/error-%DATE%.log',
            datePattern: 'YYYY-MM-DD',
            level: 'error',
            maxFiles: '14d',
          }),
          new DailyRotateFile({
            filename: 'logs/combined-%DATE%.log',
            datePattern: 'YYYY-MM-DD',
            maxFiles: '14d',
          }),
          new winston.transports.Console({
            format: combine(colorize(), logFormat),
          })
        ]
    )
  ],
});

export default logger;
