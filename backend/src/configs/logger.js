import winston from "winston";

const { combine, timestamp, printf, colorize, align } = winston.format;

const customFormat = printf(({ level, message, timestamp, stack }) => {
  return `${timestamp} [${level}]: ${stack || message}`;
});

const logger = winston.createLogger({
  level: process.env.NODE_ENV === "production" ? "info" : "debug",
  format: combine(
    timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    align(),
    customFormat
  ),
  transports: [
    new winston.transports.Console({
      format: combine(colorize({ all: true }), customFormat),
    }),
    // Optionally add file logging for production
    // new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
    // new winston.transports.File({ filename: 'logs/combined.log' }),
  ],
});

export default logger;
