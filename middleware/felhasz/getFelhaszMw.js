/**
*Felhasznalo adatainak lekerese id alapjan es megjelenitese az adatbazisbol.
 * res mentese res.localsba
 */
const requireOption = require('../requireOption');

module.exports = function (objectrepository) {
    var felhaszModel = requireOption(objectrepository, 'felhaszModel')
    return function (req, res, next) {
        if (typeof req.params.felhaszid === 'undefined') {
            console.log("miafaszom")
            return next()
        }
        felhaszModel.findOne({ _id: req.params.felhaszid }, (err, felhasznalo) => {
            if (err) {
                console.log(err)
                return next()
            }
            res.locals.felhasznalo = felhasznalo
            return next()
        })
    }
}