const fs = require('fs')
const path = require("path");
const multer = require("multer");



var storage = multer.diskStorage({
    destination:function(req ,file ,callback){
        var dir = path.join(__dirname,'./../public')
        if(!fs.existsSync(dir)){
            fs.mkdirSync(dir);
        }
        callback(null ,dir);
    },
    filename :function (req, file, callback){
        callback(null, file.originalname =Date.now() + file.originalname);
    }
});
var upload = multer({storage:storage,fileFilter: (req, file, cb) => {
    if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg" || file.mimetype == "image/svg") {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error('Only svg .png, .jpg and .jpeg format allowed!'));
    }
  }})
const fileUpload=async(req,res,next)=>{
    upload(req ,res,function(err){
        if(err){
            console.log(err);
            return res.json('something went wrong');
        }
        next();
    });
}
module.exports = upload   