/**
*Felhasznalo adatainak lekerese id alapjan es megjelenitese az adatbazisbol.
 * res mentese res.localsba
 */
const requireOption = require('../requireOption');

module.exports = function (objectrepository) {
    var felhaszModel = requireOption(objectrepository, 'felhaszModel')
    return function (req, res, next) {
        if (typeof req.body.userid === 'undefined') {
            console.log("miafasz")
            return next()
        }
        console.log("miafasz")
        felhaszModel.findOne({ _id: req.params.userid }, (err, felhasznalo) => {
            if (err || !felhasznalo) {
                console.log("miafasz")
                return next()
            }

            res.locals.felhasznalo = felhasznalo
            return next()
        })
    }
}