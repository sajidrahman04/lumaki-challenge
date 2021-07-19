var { USER_TYPES, User } = require("../../db/models/user");
var Company = require("../../db/models/company");
var ApiError = require("../../middleware/ErrorTypes");

const companyMethods = require("./company");

const bycrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const saltRounds = 10;

const createVendor = async (basicInfo, vendorInfo) => {
    const companyExists = await Company.findOne({ name: vendorInfo.companyName});
    if(!companyExists){
        await companyMethods.create(vendorInfo.companyName, vendorInfo.companyName, [vendorInfo.address]);
    }
    const newVendor = await User.create({
        email: basicInfo.email,
        password: basicInfo.password,
        vendorInfo: vendorInfo,
        type: USER_TYPES.VENDOR
    });
    if(!newVendor){
        throw ApiError.InternalError;
    }
}

module.exports = {
    register: async (email, password, type, otherInfo) => {
        const exists = await User.findOne({ email: email });
        if (exists) {
            throw ApiError.UserExistsError
        }
        const encryptedPass = await bycrypt.hash(password, saltRounds);

        const basicInfo = {
            email: email,
            password: encryptedPass,
        }

        if(type == USER_TYPES.VENDOR){
            await createVendor(basicInfo, otherInfo);
        }
        // no support for regular user for now
        else{
            throw ApiError.InternalError;
        }
        return {};
    },

    login: async (email, password) => {
        const user = await User.findOne({ email: email });
        if (!user) {
            throw ApiError.LoginFailError
        }
        let match = await bycrypt.compare(password, user.password);
        if (!match) {
            throw ApiError.LoginFailError
        }
        const companyName = user.type == USER_TYPES.VENDOR ? user.vendorInfo.companyName : null;
        const payload = { email: user.email, isAdmin: user.isAdmin, company: companyName};
        const token = jwt.sign(payload, "SECRET_KEY", {
            expiresIn: '1h'
        });
        return {
            success: true,
            body: {
                message: 'Authentication Successful!',
                token: token,
                email: email
            }
        }
    },
    getUserById: async (req, res) => { },
    deleteUserById: async (req, res) => { },
}
