var Company = require("../../db/models/company");

var ApiError = require("../../middleware/ErrorTypes");

module.exports = {
    // maybe should do check for company exisitng here instead
    create: async (name, domain, addresses) => {
        const companyInfo = {
            name: name,
            domain: domain,
            addresses: addresses
        }
        const newCompany = await Company.create(companyInfo);
        if (!newCompany) {
            throw ApiError.InternalError;
        }
        return {};
    }
}
