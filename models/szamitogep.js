const Schema = require('mongoose').Schema
const db = require('../config/db')

const szamitogep = db.model('szamitogep', {
    nev: String,
    processzor: String,
    memoria: String,
    videokartya: String,
    alaplap: String,
    tapegyseg: String,
    haz: String,
    _szamitogepe: {
        type: Schema.Types.ObjectId,
        ref: 'felhasznalo'
    }
})

module.exports = szamitogep