/**
*Megfelelo id-ju szamitogep adatainak lekerese az adtbazisbol.
 *  res mentese res.localsba
 */
const requireOption = require('../requireOption');

module.exports = function (objectrepository) {
    return function (req, res, next) {
        var szamitoModel = requireOption(objectrepository, 'szamitoModel')

        if (typeof req.param('szamitoid') === 'undefined') {
            return next();
        }

        return function (req, res, next) {
            szamitoModel.findOne({ _id: req.params.szamitoid }, (err, szamitogep) => {
                if (err || !szamitogep) {
                    return next(err);
                }

                res.locals.szamitogep = szamitogep
                return next()
            })
        }
    }
}