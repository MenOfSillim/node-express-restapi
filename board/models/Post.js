const mongoose = require('mongoose');

// schema
const postSchema = mongoose.Schema({
    title:{type:String, require:true},
    body:{type:String, requrie:true},
    createAt:{type:Date, default:Date.now},
    updateAt:{type:Date},
});

// model & export
const Post = mongoose.model('post', postSchema);
module.exports = Post;