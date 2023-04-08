const { createLogger, transports, format } = require("winston");
//에러 발생 시 날짜별로 관리 하는것이 로그 관리에 더 용이하다.
const winstonDaily = require("winston-daily-rotate-file"); //로그파일 일자별로 생성
const process = require("process"); //노드의 운영환경을 나타냄 ex.개발, 배포
const { combine, timestamp, label, printf } = format;
//* 로그 파일 저장 경로 → 루트 경로/logs 폴더
const logDir = `${process.cwd()}/logs`;
//* log 출력 포맷 정의 함수를 받아와 어떤 형태로 리턴해 줄것인지
const logFormat = printf(({ level, message, label, timestamp, stack }) => {
  if (level === 'error' && stack) {
    return `${timestamp} [${label}] ${level}: ${message}\n${stack}`; // date [systemname] loglevel message\nstack trace
  }
  return `${timestamp} [${label}] ${level}: ${message}`; // date [systemname] loglevel message
});
// Log level
// error :0, warn :1, info: 2, http: 3, verbose: 4, debug: 5, silly: 6
const logger = createLogger({
  //* 로그 출력 형식 정의
  format: combine(
    timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    label({ label: "Mood" }), // 어플리케이션 이름
    logFormat // log 출력 포맷
    //? format: combine() 에서 정의한 timestamp와 label 형식값이 logFormat에 들어가서 정의되게 된다. level이나 message는 콘솔에서 자동 정의
  ),
  //* 실제 로그를 어떻게 기록을 한 것인가 정의
  transports: [
    //* info 레벨 로그를 저장할 파일 설정 (info: 2 보다 높은 error: 0 와 warn: 1 로그들도 자동 포함해서 저장)
    new winstonDaily({
      level: "http", // info 레벨에선
      datePattern: "YYYY-MM-DD", // 파일 날짜 형식
      dirname: logDir, // 파일 경로
      filename: `%DATE%.log`, // 파일 이름
      maxFiles: 30, // 최근 30일치 로그 파일을 남김
      zippedArchive: true,
    }),
    //* error 레벨 로그를 저장할 파일 설정 (info에 자동 포함되지만 일부러 따로 빼서 설정)
    new winstonDaily({
      level: "error", // error 레벨에선
      datePattern: "YYYY-MM-DD",
      dirname: logDir + "/error", // /logs/error 하위에 저장
      filename: `%DATE%.error.log`, // 에러 로그는 2020-05-28.error.log 형식으로 저장
      maxFiles: 30, //파일 갯수
      zippedArchive: true, // 압축 허용 여부
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
console.log(process.env.NODE_ENV);
//* Production 환경이 아닌, 개발 환경일 경우 파일 들어가서 일일히 로그 확인하기 번거로우니까 화면에서 바로 찍게 설정 (로그 파일은 여전히 생성됨)
if (process.env.NODE_ENV !== "production") {
  logger.add(
    new transports.Console({
      format: format.combine(
        format.colorize(), // log level별로 색상 적용하기
        format.simple() // `${info.level}: ${info.message} JSON.stringify({ ...rest })` winston 기본포맷으로 출력
      ),
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
