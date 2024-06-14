const mongoose = require("mongoose")
const chalk = require("chalk")
require("dotenv").config()


mongoose.connect(`mongodb+srv://WolfBot:${process.env.MONGODB_PASSWD}@cluster0.vrs4i.mongodb.net/Database?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(db => console.log("Conectado a " + chalk.greenBright("MongoDB")))
.catch(err => console.log(err))