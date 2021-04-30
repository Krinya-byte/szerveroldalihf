const Schema = require('mongoose').Schema
const db = require('../config/db')

const felhasznalo = db.model('felhasznalo', {
    nev: String,
    kor: Number,
    hobbi: String,
    telszam: Number
})

module.exports = felhasznalo