/**
*Megfelelo id-ju szamitogep adatainak lekerese az adtbazisbol.
 *  res mentese res.localsba
 */
const requireOption = require('../requireOption');

module.exports = function (objectrepository) {
    var szamitoModel = requireOption(objectrepository, 'szamitoModel')
    return function (req, res, next) {
        szamitoModel.findOne({ _id: req.params.szamitoid }, (err, szamitogep) => {
            if (err ||!szamitogep) {
                console.log(err)
                return next(err);
            }

            res.locals.szamitogep = szamitogep
            return next()
        })
    }
}