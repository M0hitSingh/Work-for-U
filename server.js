const cors = require('cors');
const dotenv = require('dotenv');
const express = require("express");
const mongoose = require('mongoose')
const passport = require("passport");
const httpContext = require("express-http-context");
const notFound = require("./errors/notFound");
const path = require('path')
const errorHandlerMiddleware = require("./middleware/errorHandler");
const router = require("./routes");
const {logRequest , generateRequestId} = require('./middleware/commonMiddleware')
const logger = require('./util/logger');

const corsOptions = {
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    // allowedHeaders: ["Content-Type", "Accept"],
    preflightContinue: false,
    optionsSuccessStatus: 204,
};

// Load environment variables
dotenv.config();

// Create Express server
const app = express();


//public 
app.use('/public',express.static('public'))

const MONGO_URI = process.env.MONGO_URI 

// Set HTTP context
app.use(httpContext.middleware);
app.use(generateRequestId);

// ADD THIS IS YOUR CONNECTION FILE
mongoose.set('strictQuery', true);
logger.info(`Logger Activated at ${process.env.ENV_LEVEL}`);
// Connecting Database
const connectDB = mongoose.connect(MONGO_URI,{
    useNewUrlParser:true,
    useUnifiedTopology:true
})
.then(logger.info("DB Connected Succesfully...."))
.catch((err)=>{
    console.log("DB Connection Failed!")
    console.log(err)
    process.exit(1)
});

// Express configuration
app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: "5mb" }));

// CORS configuration
app.use(cors(corsOptions));
app.options("*", cors);

// Log all the requests and response.
app.use(logRequest);
// app.use(logResponse);

app.use(router);

// Error handling
app.use(notFound);
app.use(errorHandlerMiddleware);

app.listen(process.env.PORT,()=>{
    logger.info("App is running at http://localhost:%d ",process.env.PORT);
});

process.on("SIGTERM", shutDown);
process.on("SIGINT", shutDown);
// Shutdown express server gracefully.

function shutDown() {
    logger.info("Received kill signal, shutting down gracefully");
    server.close(() => {
        logger.info("Closed out remaining connections");
        process.exit(0);
    });

    setTimeout(() => {
        logger.info("Could not close connections in time, forcefully shutting down");
        process.exit(1);
    }, 10000);
}
module.exports = app;
