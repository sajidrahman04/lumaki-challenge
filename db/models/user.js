const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const USER_TYPES = {
    ADMIN: "admin",
    VENDOR: "vendor",
    USER: "user",
};

const VendorInfoSchema = new Schema(
    {
        companyName: String,
        address: String
    });

const UserInfoSchema = new Schema(
    {
        phone: String,
        resume: Buffer
    }
)

const UserSchema = new Schema(
    {
        identity: {
            type: Object,
            default: {
                isAdmin: false
            }
        },
        email: {
            type: String
        },
        password: {
            type: String
        },
        type: {
            type: String
        },
        vendorInfo: VendorInfoSchema,
        userInfo: UserInfoSchema,
    },
    {
        timestamps: true,
        collection: "users"
    },

);

const User = mongoose.model('User', UserSchema, 'users');

module.exports = { USER_TYPES,  User};
