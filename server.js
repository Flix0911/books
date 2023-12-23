//depends

require("dotenv").config() //this is how we make use of our .env variables
require("./config/db") //bring in our db configuration

const express = require("express")
const morgan = require("morgan") //best friends for all of the gossip aka logger
const methodOverride = require("method-override")
const bookRouter = require("./routes/books")

//our application
const app = express()
const { PORT = 3013 } = process.env
//const PORT = process.env.PORT || 3013 ~ this is the same as above
const seedData = require("./models/seed")

//bring in our model
const Book = require("./models/Book")

//middleware
//gives us access to request, response and next
app.use((req, res, next) => {
    req.model = {
    Book,
    seedData
}
    console.log("this is middleware")
    next()
})

app.use(morgan("dev")) //logger
app.use(express.urlencoded({ extended: true })) //body parse this is how get access to req.body
app.use(methodOverride("_method")) //lets us use DELETE and PUT HTTP verbs

//router
//app.use(prefix url, router to execute) 
app.use("/books", bookRouter)

//server listener
app.listen(PORT, () => console.log(`Listening to the sounds of ${PORT}`))
