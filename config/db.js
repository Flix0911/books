//dependencies

//mongoose speaks mongodb
const mongoose = require("mongoose")

//connected to our database
mongoose.connect(process.env.DATABASE_URL)

//set up connection status listeners
//throw an error
mongoose.connection.on("error", (err) => console.log(err.message + "ooops there is an error"))
//show we're connected
mongoose.connection.on("connected", () => console.log("connected to mongo"))
//show we're disconnected
mongoose.connection.on("disconnected", () => console.log("disconnected from mongo"))