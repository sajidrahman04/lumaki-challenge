var Posting = require("../../db/models/posting");
var Company = require("../../db/models/company");
var ApiError = require("../../middleware/ErrorTypes");

module.exports = {
    create: async (companyName, position, description, duration, deadline) => {
        const company = await Company.findOne({ name: companyName}).populate("postings");
        if(!company){
            return ApiError.InternalError;
        }

        // lowercase company/position to make it easy to query
        const postingInfo = {
            company: companyName.toLowerCase(),
            position : position.toLowerCase(),
            description: description,
            duration: duration,
            deadline: deadline
        }
        
        const newPosting = await Posting.create(postingInfo);
        if(!newPosting){
            return ApiError.InternalError;
        }

        company.postings.push(newPosting);
        await company.save();

        return {};
    },

    get: async (queries) => {
        if(!queries){
            queries = {};
        }
        const matches = {};
        const { company, title } = queries;
        if(company){
            matches.company = company.toLowerCase();
        }
        if(title){
            matches.position = {$regex: title.toLowerCase()};
        }

        const postings = await Posting.find(matches);
        const mappedPostings = postings.map((p) => {return {company: p.company, position: p.position, description: p.description, deadline: p.deadline}});
        return { postings: mappedPostings };
    },

}
