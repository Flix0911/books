//depends

require("dotenv").config() //this is how we make use of our .env variables
require("./config/db") //bring in our db configuration

const express = require("express")
const morgan = require("morgan") //best friends for all of the gossip aka logger
const methodOverride = require("method-override")

//our application
const app = express()
const { PORT = 3013 } = process.env
//const PORT = process.env.PORT || 3013 ~ this is the same as above

//bring in our model
const Book = require("./models/Book")

//middleware
//gives us access to request, response and next
// app.use((req, res, next) => {
//     console.log("this is middleware")
//     next()
// })

app.use(morgan("dev")) //logger
app.use(express.urlencoded({ extended: true })) //body parse this is how get access to req.body
app.use(methodOverride("_method")) //lets us use DELETE and PUT HTTP verbs

//routes & router

//Index - GET display/render all of the books
app.get("/books", async (req, res) => {
    //find all of the books
    let books = await Book.find({})

    //render all of the books => index.ejs
    res.render("index.ejs", {
        books: books.reverse()
    })
})

//New - GET for the form to create a new book
app.get("/books/new", (req, res) => {
    //render the create form
    res.render("new.ejs")
})

//DELETE 
app.delete("/books/:id", async (req, res) => {
    try {
    //find a book and then delete it
    let deletedBook = await Book.findByIdAndDelete(req.params.id)
        console.log(deletedBook)
    //good ui response? redirect back to the index
    res.redirect("/books")
    } catch (error) {
        res.status(500).send("something went wrong when deleting")
    }
})

//UPDATE


// Create - POST
app.post("/books", async (req, res) => {
    try {
        if (req.body.completed === "on") {
            // if checked
            req.body.completed = true
        } else {
            // if not checked
            req.body.completed = false
        }
    
        let newBook = await Book.create(req.body)
        res.redirect("/books")
        
    } catch (err) {
        res.send(err)
    }
})

//EDIT
app.get("/books/edit/:id", async (req, res) => {
    try {
        //find the book and edit
        let foundBook = await Book.findById(req.params.id)
        res.render("edit", {
            book: foundBook
        })
    } catch (error) {
        res.send("hello from the error side")
    }    
})

//Show - GET rendering only one book
app.get("/books/:id", async (req, res) => {
    // find a book by _id
    let foundBook = await Book.findById(req.params.id) // the request params object

    //console.log(foundBook)
    // render show.ejs with the foundBook
    res.render("show.ejs", {
        book: foundBook
    })
})

//server listener
app.listen(PORT, () => console.log(`Listening to the sounds of ${PORT}`))
