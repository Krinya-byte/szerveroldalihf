/**
 * Felhasznalo mentese az adatbazisba.
 * Ha mar letezik a res.localsban akkor updateeli
 * Visszalep a /felhasz -ba
 */

const felhasznalo = require('../../models/felhasznalo');
const requireOption = require('../requireOption');

module.exports = function (objectrepository) {
    const felhaszModel = requireOption(objectrepository, 'felhaszModel')
    return function (req, res, next) {
        if (
            typeof req.body.nev === 'undefined' ||
            typeof req.body.kor === 'undefined' ||
            typeof req.body.hobbi === 'undefined' ||
            typeof req.body.telszam === 'undefined'
        ) {
            return next();
        }
        if (typeof res.locals.felhasznalo === 'undefined') {
            res.locals.felhasznalo = new felhaszModel()
        }
        res.locals.felhasznalo.nev = req.body.nev
        res.locals.felhasznalo.kor = req.body.kor
        res.locals.felhasznalo.hobbi = req.body.hobbi
        res.locals.felhasznalo.telszam = req.body.telszam
        res.locals.felhasznalo.save(function (err, result) {
            if (err) {
                console.log(err);
            }
            else {
                console.log(result)
            }
        })
        return res.redirect('/felhasz')
    }
}