const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PostingSchema = new Schema(
    {
        company : {
            type: String
        },
        position : {
            type: String
        },
        description: {
            type: String
        },
        duration: {
            Type: String
        },
        deadline: {
            type: String
        }
    },
    {
        timestamps: true,
        collection: "postings"
    },

);


module.exports = mongoose.model('Posting', PostingSchema, 'postings');
