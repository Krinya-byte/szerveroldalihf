/**
* Felhasznalo torlese az id alapjan.
 * Visszalep /felhaszba torles utan
*/
const requireOption = require('../requireOption');

module.exports = function (objectrepository) {
    var felhaszModel = requireOption(objectrepository, 'felhaszModel')
    return function (req, res, next) {
       if(typeof res.locals.felhasznalo === 'undefined'){
           return next()
        }

        felhaszModel.remove({ _id: res.locals.felhasznalo._id }, (err, felhasznalo) => {
            if (err) {
                console.log(err)
                return next()
            }     
            return res.redirect('/felhasz')
        })
    }
}