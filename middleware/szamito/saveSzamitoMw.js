/**
* Szamitogep adatainak mentese az adatbazisba.
* Ha ott van mar akkor updateeli
 * Atlep a /felhasznaloszamitora
 */
const requireOption = require('../requireOption');

module.exports = function (objectrepository) {
    const szamitoModel = requireOption(objectrepository, 'szamitoModel')
    return function (req, res, next) {
        if (typeof req.body.nev === 'undefined' 
        || typeof req.body.memoria === 'undefined' 
        || typeof req.body.processzor === 'undefined' 
        || typeof req.body.videokartya === 'undefined' 
        || typeof req.body.haz === 'undefined'
            || typeof req.body.alaplap === 'undefined' 
            || typeof req.body.tapegyseg === 'undefined'
            || typeof res.locals.felhasznalo === 'undefined') {
            return next()
        }

        if (typeof res.locals.szamitogep === 'undefined') {
            res.locals.szamitogep = new szamitoModel()
        }
        res.locals.szamitogep.nev = req.body.nev
        res.locals.szamitogep.processzor = req.body.processzor
        res.locals.szamitogep.memoria = req.body.memoria
        res.locals.szamitogep.videokartya = req.body.videokartya
        res.locals.szamitogep.alaplap = req.body.alaplap
        res.locals.szamitogep.tapegyseg = req.body.tapegyseg
        res.locals.szamitogep.haz = req.body.haz
        res.locals.szamitogep._szamitogepe = res.locals.felhasznalo._id

        res.locals.szamitogep.save(err => {
            if (err) {
                return next(err)
            }
        })

        return res.redirect(`/szamito/${res.locals.felhasznalo._id}`)
    }
}