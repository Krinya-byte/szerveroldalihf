/**
* Szamitogep adatainak mentese az adatbazisba.
* Ha ott van mar akkor updateeli
 * Atlep a /felhasznaloszamitora
 */
const requireOption = require('../requireOption');

module.exports = function (objectrepository) {
    return function (req, res, next) {
        const szamitoModel = requireOption(objectrepository, 'szamitoModel')
        if (typeof req.body.nev === 'undefined' || typeof req.body.memoria === 'undefined' || typeof req.body.processzor === 'undefined' || typeof req.body.videokartya === 'undefined' || typeof req.body.haz === 'undefined'
            || typeof req.body.alaplap === 'undefined' || typeof req.body.tapegyseg === 'undefined'
            || typeof req.locals.felhasznalo === 'undefined') {
            return next()
        }

        if (typeof res.locals.szamitogep === 'undefined') {
            res.locals.szamitogep = new szamitoModel()
        }
        res.locals.felhasznalo.nev = req.body.nev
        res.locals.felhasznalo.processzor = req.body.processzor
        res.locals.felhasznalo.memoria = req.body.memoria
        res.locals.felhasznalo.videokartya = req.body.videokartya
        res.locals.felhasznalo.alaplap = req.body.alaplap
        res.locals.felhasznalo.tapegyseg = req.body.tapegyseg
        res.locals.felhasznalo.haz = req.body.haz
        res.locals.felhasznalo._szamitogepe = req.body._szamitogepe

        res.locals.felhasznalo.save(err => {
            if (err) {
                return next(err)
            }
        })

        return res.redirect('/felhasznaloszamito/${res.locals.felhasznalo._id}')
    }
}