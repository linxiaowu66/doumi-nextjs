import winston, { format } from "winston";
import "winston-daily-rotate-file";
const { combine } = winston.format;

const logFormat = winston.format.printf(function (info) {
  return `${
    info.timestamp
  }-${info.level}: ${JSON.stringify(info.message, null, 4)}\n`;
});

const logger = winston.createLogger({
  level: "info",
  format: combine(
    format.timestamp({
      format: "YYYY-MM-DD HH:MM:ss:SSS",
    }),
    format.prettyPrint(),
    logFormat
  ),
  transports: [
    new winston.transports.Console({
      level: "debug",
      format: combine(
        format.timestamp({
          format: "YYYY-MM-DD HH:MM:ss:SSS",
        }),
        format.colorize({ level: true }),
        format.prettyPrint(),
        logFormat
      ),
    }),
    new winston.transports.File({
      filename: "./logs/app.log",
    }),
    new winston.transports.DailyRotateFile({
      level: "info",
      filename: "./logs/doumiblog-%DATE%.log",
      datePattern: "YYYY-MM-DD",
      zippedArchive: true,
      maxSize: "20m",
      maxFiles: "14d",
    }),
    new winston.transports.DailyRotateFile({
      level: "error",
      filename: "./logs/doumiblog-error-%DATE%.log",
      datePattern: "YYYY-MM-DD",
      zippedArchive: true,
      maxSize: "20m",
      maxFiles: "14d",
    }),
  ],
});

export { logger };
