const express =  require("express");
const { customAPIError } = require("../errors/customAPIError");
const sendErrorForDev = (err, res) => {
    res.status(err.status.code || 500).json({
        status: err.status,
        error: err,
        message: err.message,
        stack: err.stack,
    });
};

const sendErrorForProd = (err, res) => {
    if (err.isOperational) {
        res.status(err.status.code).json({
            status: err.status,
            error: { message: err.message },
        });
    } else {
        res.status(500).json({
            status: { code: 500, message: "fail" },
            error: { message: "Something went very wrong" },
        });
    }
};

const handleCastError = (err) => {
    const message = `Cannot find ${err.path}: ${err.value}`;
    return new customAPIError(message, 400);
};

const handleDublicateFieldError = (err) => {
    const value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0];
    const message = `Duplicate field ${value}. Please use another one`;
    return new customAPIError(message, 400);
};

const handleS3Error = () => {
    const message = "Something went very wrong";
    return new customAPIError(message, 400);
};

const handleValidationError = (err) => {
    const errors = Object.values(err.errors).map((error) => {
        return error.message;
    });
    const message = `Invalid input data. ${errors.join(". ")}`;
    return new customAPIError(message, 400);
};

const errorHandlerMiddleware = (err, req, res, next) => {
    err.status = err.status || { code: 500, message: "error" };
    err.isOperational = err.isOperational ? true : err.isOperational === false ? false : true;

    sendErrorForDev(err, res);

    const logError = `StatusCode: ${err.status.code} | Message: ${err.message} \n${err.stack}`;
    console.log(logError)
};

module.exports = errorHandlerMiddleware;
