const bcrypt = require('bcrypt');
const crypto = require('crypto');
const jwt = require('jwt');
const mongoose = require('mongoose');


const workerSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: [true, "Please provide first name"],
            trim: true,
        },
        lastName: {
            type: String,
            trim: true,
        },
        email: {
            type: String,
            required: [true, "Please provide email"],
            match: [
                /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/,
                "Please provide valid email",
            ],
            trim: true,
            lowercase: true,
        },
        password: {
            type: String,
            required: [true, "Please provide password"],
        },
        passwordResetToken: {
            type: String,
        },
        phoneNumber: {
            type: String,
            required: [true, "Please provide phone number"],
            trim: true,
        },
        // gender: {
        //     type: String,
        //     required: [true, "Please provide gender"],
        //     enum: {
        //         values: ["Male", "Female", "Others"],
        //         message: "Please choose from Male, Female or Others",
        //     },
        // },
        job:{
            type: mongoose.Types.ObjectId,
            required: true,
            ref: "jobMaster",
        },
        avatar: {
            type: String,
            trim: true,
        },
        isActive: {
            type: Boolean,
            default: true,
        },
    },
    { timestamps: true }
);





module.exports =  mongoose.model("worker", workerSchema, "worker");
