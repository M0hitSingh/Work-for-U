const bcrypt = require('bcrypt');
const crypto = require('crypto');
const jwt = require('jwt');
const mongoose = require('mongoose');


const jobMasterSchema = new mongoose.Schema(
    {
        jobName:{
            type: String,
            required: [true, "Please provide job name"],
            trim: true,
        }
    }
);





module.exports =  mongoose.model("jobMaster", jobMasterSchema, "jobMaster");
