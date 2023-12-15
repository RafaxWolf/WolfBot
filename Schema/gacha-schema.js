const { Schema, model} = require("mongoose")

const gachapon = new Schema({
    userID: String,
    Protogemas: {
        type: Number,
        default: 0
    },
    PolvoEstelar: {
        type: Number,
        default: 0
    },
    BrilloEstelar: {
        type: Number,
        default: 0
    },
    Destinos: {
        type: Number,
        default: 0
    },
    Encuentros: {
        type: Number,
        default: 0
    }
});

module.exports = model('gachapon', gachapon)