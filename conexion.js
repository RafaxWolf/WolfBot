const mongoose = require("mongoose")
const chalk = require("chalk")

mongoose.connect('mongodb+srv://WolfBot:xuxo2006@cluster0.vrs4i.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(db => console.log("Conectado a " + chalk.greenBright("MongoDB")))
.catch(err => console.log(err))