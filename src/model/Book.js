const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: {type: String, required: true, index: true}, 
    author: {type: String, required: true, index: true}, 
    status: {type: String, enum: ["read", "unread"], default: "unread"}, 
    description:{type: String, required: true}, 
    date:{type: String}
}, {
    timestamps: true
})

bookSchema.index({ title: 1, author: 1 });

const Book = mongoose.model("books", bookSchema);

module.exports = {Book}; 