/**
 *Felhasznalo adatainak lekerese id alapjan es megjelenitese az adatbazisbol.
 * res mentese res.localsba
 */
const requireOption = require("../requireOption");

module.exports = function (objectrepository) {
  var felhaszModel = requireOption(objectrepository, "felhaszModel");
  return function (req, res, next) {
    felhaszModel.findOne({ _id: req.params.felhaszid }, (err, felhasznalo) => {
      if (err ||!felhasznalo) {
        console.log(err);
        return next(err);
      }
      res.locals.felhasznalo = felhasznalo;
      return next();
    });
  };
};
