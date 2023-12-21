//depends

require("dotenv").config() //this is how we make use of our .env variables
require("./config/db") //bring in our db configuration

const express = require("express")
const morgan = require("morgan") //best friends for all of the gossip aka logger

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

//routes & router

//Index - GET display/render all of the books

//New - GET for the form to create a new book
app.get("/books/new", (req, res) => {
    res.send("new book")
})

//Create - POST 
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
        res.send(newBook)
        
    } catch (err) {
        res.send(err)
    }
})

//Show - GET rending only one book


//server listener
app.listen(PORT, () => console.log(`Listening to the sounds of ${PORT}`))
