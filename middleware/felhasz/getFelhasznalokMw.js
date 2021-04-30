/**
*Felhasznalok adatainak lekerese az adatbazisbol
*
 */
const requireOption = require('../requireOption');

module.exports = function (objectrepository) {
    const felhaszModel = requireOption(objectrepository, 'felhaszModel')
    return function (req, res, next) {
            felhaszModel.find({}, (err, felhasznalok) => {
                if (err) {
                    return next(err);
                }
                res.locals.felhasznalok = felhasznalok
            })
            return next()
    }
}