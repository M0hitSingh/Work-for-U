const express = require('express')
const jwt = require('jsonwebtoken')
const { createCustomError } =  require("../errors/customAPIError");
const User =  require("../model/User");

const errorMessage = "You do not have permissions to perform this action";

const authorization = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer")) {
        const message = "Unauthenticaded No Bearer";
        return next(createCustomError(message, 401));
    }

    const token = authHeader.split(" ")[1];
    try {
        const payload =await jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findOne({ isActive: true, _id: payload.userId ,isVerified:true});
        console.log(user)
        if (!user) {
            return next(createCustomError("Invalid JWT"));
        }

        if (user && user.changePasswordAfter(payload.iat)) {
            return next(createCustomError("User recently changed the password, Please login again", 401));
        } else if (user) {
            req.user = { userId: payload.userId, details: user };
        }
        next();
    } catch (error) {
        let message;
        let err
        if (error instanceof jwt.TokenExpiredError) {
            message = "Token Expired";

        } else {
            message = "Authentication failed invalid JWT";
        }

        return next(createCustomError(message, 401));
    }
};


module.exports = { authorization};
