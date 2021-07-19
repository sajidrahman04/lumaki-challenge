var { CustomError } = require("./CustomError");

const PermissionDeniedError = new CustomError(403, "Authentication is required for this request.");
const SessionExpiredError = new CustomError(419, "Session expired, please login again.");
const LoginFailError = new CustomError(401, "The username or password is incorrect.");
const UserExistsError = new CustomError(400, "A User with this username already exists.");
const UserDNEError = new CustomError(400, "User does not exist.");
const InternalError = new CustomError(500, "Internal Server Error");

module.exports = {
    PermissionDeniedError, SessionExpiredError, LoginFailError, UserExistsError, UserDNEError, InternalError
}
