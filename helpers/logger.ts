import winston from "winston";

enum LoggerLevel {
  info = 'info',
  debug = 'debug',
}

winston.addColors({
  info: 'bold green',
  debug: 'bold white',
  warn: 'bold yellow',
  error: 'bold red',
});

const format = winston.format.combine(
  winston.format.colorize({ all: true }),
  winston.format.timestamp({ format: 'YY-MM-DD HH:mm:ss' }),
  winston.format.align(),
  winston.format.ms(),
  winston.format.printf((info) => ` ${info.timestamp} [${info.level}]:  ${info.message}`),
  winston.format.align()
);

const logger = winston.createLogger({
  level: LoggerLevel.info,
  format: format,
  transports: [new winston.transports.Console()],
});
export const log = {
  /**
   * Visible only if LOG=true
   */
  debug: (content: unknown) => logger.debug(content),
  /**
   * Always visible
   */
  info: (content: unknown) => logger.info(content),
  /**
   * Always visible
   */
  warn: (content: unknown) => logger.warn(content),
  /**
   * Always visible
   */
  error: (content: unknown) => logger.error(content),
};
