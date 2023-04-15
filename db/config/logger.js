const { createLogger, transports, format } = require("winston");
const winstonDaily = require("winston-daily-rotate-file");
const process = require("process");
const { combine, timestamp, label, printf } = format;
const logDir = `${process.cwd()}/logs`;

const logFormat = printf(({ level, message, label, timestamp, stack }) => {
  if (level === "error" && stack) {
    return `${timestamp} [${label}] ${level}: ${message}\n${stack}`;
  }
  return `${timestamp} [${label}] ${level}: ${message}`;
});

const logger = createLogger({
  //로그 출력 형식 정의
  format: combine(
    timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    label({ label: "Mood" }),
    logFormat
  ),
  transports: [
    new winstonDaily({
      level: "http",
      datePattern: "YYYY-MM-DD",
      dirname: logDir,
      filename: `%DATE%.log`,
      maxFiles: 30,
      zippedArchive: true,
    }),
    new winstonDaily({
      level: "error",
      datePattern: "YYYY-MM-DD",
      dirname: logDir + "/error",
      filename: `%DATE%.error.log`,
      maxFiles: 30,
      zippedArchive: true,
    }),
  ],
});
logger.stream = {
  // morgan wiston 설정
  write: (message) => {
    logger.http(message);
  },
};
require("dotenv").config();
//개발 환경일 경우
if (process.env.NODE_ENV !== "production") {
  logger.add(
    new transports.Console({
      format: format.combine(format.colorize(), format.simple()),
    })
  );
  logger.stream = {
    // morgan wiston 설정
    write: (message) => {
      console.info(message);
      logger.http(message);
    },
  };
}
module.exports = logger;
