const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var bookSchema = new Schema({
    name: {
        type: String
    },
    author: {
        type:String
    },
    description: {
        type: String
    } 
});
let Book = mongoose.model('book', bookSchema);

module.exports = Book;