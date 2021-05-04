/**
* Szamitogep torlese id alapjan az adatbazisbol.
 */
const requireOption = require('../requireOption');

module.exports = function(objectrepository) {
    var szamitoModel = requireOption(objectrepository, 'szamitoModel')
    return function (req, res, next) {
        if(typeof res.locals.szamitogep === 'undefined'){
            return next()
         }
         szamitoModel.remove({ _id: res.locals.szamitogep._id }, (err, szamitogep) => {
            if (err) {
                console.log(err)
                return next()
            }     
             return res.redirect(`/szamito/${res.locals.felhasznalo._id}`)
         })
     }
}