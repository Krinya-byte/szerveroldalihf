/**
*Szamitogepek adatainak lekerese adatbazisbol.
 */
const requireOption = require('../requireOption');

module.exports = function (objectrepository) {
    const szamitoModel = requireOption(objectrepository, 'szamitoModel')
    return function (req, res, next) {
        if (typeof res.locals.felhasznalo === 'undefined') {
            return next();
        }
        szamitoModel.find({_szamitogepe: res.locals.felhasznalo._id}, (err, szamitogepek) => {
            if (err) {
                return next(err)
            }
            res.locals.szamitogepek = szamitogepek
            return next()
        })
    }
}