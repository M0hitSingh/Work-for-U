const express = require('express');
const httpContext = require('express-http-context');
const logger = require('../util/logger');
const uuid = require('uuid');
const generateRequestId = async (req , res, next) => {
    httpContext.set("requestId", uuid.v4());
    return next();
};

const logRequest = (req, res, next) => {
    logger.info(
        `${req.protocol.toUpperCase()}-${req.httpVersion} ${req.method} ${req.url}, ` +
            `headers: ${JSON.stringify(req.headers, null, 2)}, ` +
            `query: ${JSON.stringify(req.query, null, 2)}, ` +
            `params: ${JSON.stringify(req.params, null, 2)}, ` +
            `body: ${JSON.stringify(req.body, null, 2)}`
    );
    return next();
};

const logResponse = (req, res, next) => {
    res.on("finish", () => {
        logger.info("Request completed.");
    });
    return next();
};

module.exports = { generateRequestId, logRequest, logResponse };
