import * as winston from 'winston';
import * as path from 'path';

const logDir = 'logs';
const logFile = path.join(logDir, 'app.log');

// Ensure log directory exists
import * as fs from 'fs';
if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir);
}

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp({
            format: 'YYYY-MM-DD HH:mm:ss'
        }),
        winston.format.errors({ stack: true }),
        winston.format.splat(),
        winston.format.printf(({ level, message, timestamp, stack }) => {
            if (stack) {
                return `${timestamp} ${level.toUpperCase()}: ${message} - ${stack}`;
            }
            return `${timestamp} ${level.toUpperCase()}: ${message}`;
        })
    ),
    transports: [
        //
        // - Write all logs with level `info` and below to `app.log`
        // - Write all logs with level `error` and below to `error.log`
        //
        new winston.transports.File({ filename: path.join(logDir, 'error.log'), level: 'error' }),
        new winston.transports.File({ filename: logFile }),
    ],
});

//
// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} ${JSON.stringify({ ...rest })} `
//
if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({
        format: winston.format.combine(
            winston.format.colorize(),
            winston.format.simple()
        ),
    }));
}

export default logger;
