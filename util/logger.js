const httpContext = require('express-http-context');
const winston = require('winston');
const format = winston.format.printf(({level , message ,timestamp})=>{
    return `${timestamp} [${level}] : ${message} `;
})
const consoleFormat = winston.format.colorize()
const logger = winston.createLogger({
    level:"info",
    format:winston.format.combine(winston.format.colorize(),winston.format.timestamp({format:"HH:mm:ss"}),format),
    transports: [
        new winston.transports.Console({ format: consoleFormat }),
        new winston.transports.File({ filename: "logs/error.log", level: "error" }),
        new winston.transports.File({ filename: "logs/app.log"}),
    ] 
})

module.exports = logger