//dependencies

const mongoose = require("mongoose")

//create our schema
const bookSchema = new mongoose.Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    completed: Boolean
})

//compose our model from the schema
//have variable called book
//result of the mongoose method
//model is a method
//string of what the is called
//pass in the schema
const Book = mongoose.model("Book", bookSchema)

//export our model
module.exports = Book