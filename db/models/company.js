const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CompanySchema = new Schema(
    {
        name: {
            type: String
        },
        domain: {
            type: String
        },
        addresses: {
            type: [String]
        },
        postings: [
            {type: Schema.ObjectId, ref: 'Posting'}
        ]
    },
    {
        timestamps: true,
        collection: "companies"
    },

);


module.exports = mongoose.model('Company', CompanySchema, 'companies');
