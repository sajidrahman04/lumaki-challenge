const jwt = require("jsonwebtoken");
var { USER_TYPES, User } = require("../db/models/user");
var ApiError = require("./ErrorTypes");

const SECRET_KEY = "SECRET_KEY";

module.exports = {
    vendorAuth: async (req, res, next) => {
        try {
            const token = (req.headers['authorization'] ? req.headers.authorization.split(' ')[1] : req.body.token || req.query.token || (req.cookies ? req.cookies.token : null));
            if (!token) {
                throw ApiError.PermissionDeniedError;
            }
            const decoded = jwt.verify(token, SECRET_KEY);
            const user = await User.findOne({ email: decoded.email });
            if(!user){
                throw ApiError.UserDNEError;
            }
            if(!user.type === USER_TYPES.VENDOR){
                throw ApiError.PermissionDeniedError;
            }
            req.body.email = decoded.email;
            req.body.company = decoded.company;
            next();
        } catch (e) {
            if(e instanceof jwt.TokenExpiredError){
                next(ApiError.SessionExpiredError);
            }
            else if(e instanceof jwt.JsonWebTokenError){
                next(ApiError.PermissionDeniedError);
            }
            else{
                next(e);
            }
        }
    },
}
