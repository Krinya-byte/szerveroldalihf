/**
* Szamitogep torlese id alapjan az adatbazisbol.
 */
const requireOption = require('../requireOption');

module.exports = function(objectrepository) {
    return function (req, res, next) {
        if(typeof res.locals.szamitogep === 'undefined'){
            return next()
         }
 
         res.locals.szamitogep.remove(err => {
             if(err){
                 return next()
             }
 
             return res.redirect('/felhasznaloszamito/${res.locals.felhasznalo._id}')
         })
     };
}