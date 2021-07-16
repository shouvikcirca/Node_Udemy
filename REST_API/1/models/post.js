const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const postSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    creator: {
        type: Object,
        required: String
    }
}, {timestamps: true});  // Mongoose will automatically add a timestamp when a new object os added to the database


module.exports = mongoose.model('Post', postSchema); 

// We export a model based on the schema rather than the schema itself
// The above creates a database by the name Post based on postSchema