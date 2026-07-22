import * as winston from 'winston';
import * as path from 'path';

export class MyLogger {
  private static loggerInstance: winston.Logger;

  private static createLogger(): winston.Logger {
    const logDir = 'logs';
    const filename = path.join(logDir, 'test-run.log');

    return winston.createLogger({
      level: 'info',
      format: winston.format.combine(
        winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        winston.format.printf(({ timestamp, level, message, ...meta }) => {
          let log = `${timestamp} [${level.toUpperCase()}]`;
          if (meta.className) {
            log += ` [${meta.className}]`;
          }
          log += `: ${message}`;
          if (Object.keys(meta).length > 1) {
            log += ` ${JSON.stringify(meta, null, 2)}`;
          }
          return log;
        })
      ),
      transports: [
        new winston.transports.Console({
          format: winston.format.combine(
            winston.format.colorize(),
            winston.format.printf(({ timestamp, level, message, ...meta }) => {
                let log = `${timestamp} [${level}]`;
                if (meta.className) {
                  log += ` [${meta.className}]`;
                }
                log += `: ${message}`;
                return log;
            })
          ),
        }),
        new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
        new winston.transports.File({ filename }),
      ],
    });
  }

  public static getLogger(className?: string): winston.Logger {
    if (!MyLogger.loggerInstance) {
      MyLogger.loggerInstance = MyLogger.createLogger();
    }
    if (className) {
      return MyLogger.loggerInstance.child({ className });
    }
    return MyLogger.loggerInstance;
  }
}
