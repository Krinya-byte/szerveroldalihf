/**
*Szamitogepek adatainak lekerese adatbazisbol.
 */
const requireOption = require('../requireOption');

module.exports = function (objectrepository) {
    return function (req, res, next) {
        const szamitoModel = requireOption(objectrepository, 'szamitoModel')

        return function (req, res, next) {
            szamitoModel.find({}, (err, szamitogepek) => {
                if (err) {
                    return next(err);
                }
                res.locals.szamitogepek = szamitogepek
                return next();
            })
        }
    }
}