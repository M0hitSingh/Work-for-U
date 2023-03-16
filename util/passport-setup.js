// const passport = require('passport');
// const GoogleStrategy = require('passport-google-oauth20').Strategy
// const dotenv = require('dotenv');
// const { sendSuccessApiResponse } = require('../middleware/successApiResponse');
// const User = require('../model/User');
// dotenv.config();

// passport.serializeUser(function(user, cb) {
//     cb(null, user);
// });
  
// passport.deserializeUser(function(obj, cb) {
//     cb(null, obj);
// });   

// passport.use(new GoogleStrategy({
//     clientID:process.env.GOOGLE_CLIENT_ID,
//     clientSecret:process.env.GOOGLE_CLIENT_SECRET,
//     callbackURL:"http://localhost:8080/api/v1/auth/google/callback"
//     },
//     async function(accessToken , refreshToken , profile , next){
//         let token;
//         const isUser = await User.findOne({email:profile._json.email,isVerified:true})
//         if(!isUser){
//             const user = new User({
//                 firstName:profile._json.given_name,
//                 lastName:profile._json.family_name,
//                 email:profile._json.email,
//                 password:accessToken,
//                 isVerified:true
//             })
//             await user.save();
//             token = user.generateJWT() 
//         }
//         else{
//             token = isUser.generateJWT();
//         }
//         next(sendSuccessApiResponse(token,201));
//     }
// )); 


 