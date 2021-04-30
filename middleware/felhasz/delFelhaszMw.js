/**
* Felhasznalo torlese az id alapjan.
 * Visszalep /felhaszba torles utan
*/
const requireOption = require('../requireOption');

module.exports = function (objectrepository) {
    return function (req, res, next) {
       if(typeof res.locals.felhasznalo === 'undefined'){
           return next()
        }

        res.locals.felhasznalo.remove(err => {
            if(err){
                return next()
            }

            return res.redirect('/felhasz')
        })
    }
}