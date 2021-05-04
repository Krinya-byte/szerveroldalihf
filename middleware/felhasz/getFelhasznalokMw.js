/**
*Felhasznalok adatainak lekerese az adatbazisbol
*
 */
const requireOption = require('../requireOption');

module.exports = function (objectrepository) {
    const felhaszModel = requireOption(objectrepository, 'felhaszModel')
    return function (req, res, next) {
            felhaszModel.find({}, (err, felhasznalos) => {
                if (err) {
                    console.log(err)
                }
                res.locals.felhasznalos = felhasznalos
                return next()
            })
    }
}