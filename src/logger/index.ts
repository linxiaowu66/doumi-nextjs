import winston from "winston";
import "winston-daily-rotate-file";
const { combine, timestamp, json } = winston.format;

let date = new Date().toISOString();
const logFormat = winston.format.printf(function (info) {
  return `${date}-${info.level}: ${JSON.stringify(info.message, null, 4)}\n`;
});

const logger = winston.createLogger({
  level: "info",
  format: combine(winston.format.colorize(), logFormat),
  transports: [
    new winston.transports.Console({
      level: "debug",
    }),
    new winston.transports.File({
      filename: "./logs/app.log",
    }),
    new winston.transports.DailyRotateFile({
      level: "info",
      filename: "./logs/doumiblog-%DATE%.log",
      datePattern: "YYYY-MM-DD-HH",
      zippedArchive: true,
      maxSize: "20m",
      maxFiles: "14d",
    }),
    new winston.transports.DailyRotateFile({
      level: "error",
      filename: "./logs/doumiblog-error-%DATE%.log",
      datePattern: "YYYY-MM-DD-HH",
      zippedArchive: true,
      maxSize: "20m",
      maxFiles: "14d",
    }),
  ],
});

export { logger };
