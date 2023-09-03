const mongoose = require("mongoose")

mongoose.connect('mongodb+srv://WolfBot:xuxo2006@cluster0.vrs4i.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(db => console.log("conectado a MongoDB"))
.catch(err => console.log(err))