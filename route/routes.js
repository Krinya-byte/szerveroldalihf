/**
Routok a middlewareekhez
 */

const renderMW = require('../middleware/renderMw');
const delFelhaszMW = require('../middleware/felhasz/delFelhaszMw');
const getFelhasznalokMW = require('../middleware/felhasz/getFelhasznalokMw');
const getFelhaszMW = require('../middleware/felhasz/getFelhaszMw');
const saveFelhaszMW = require('../middleware/felhasz/saveFelhaszMw');
const delSzamitoMW = require('../middleware/szamito/delSzamitoMw');
const getSzamitokMW = require('../middleware/szamito/getSzamitokMw');
const getSzamitoMW = require('../middleware/szamito/getSzamitoMw');
const saveSzamitoMW = require('../middleware/szamito/saveSzamitoMw');

const felhaszModel = require('../models/felhasznalo')
const szamitoModel = require('../models/szamitogep')
module.exports = function (app) {
    const objRepo = {
        felhaszModel: felhaszModel,
        szamitoModel: szamitoModel
    };

    app.use('/felhasz/new',
        saveFelhaszMW(objRepo),
        renderMW(objRepo, 'felhaszedit'));
    app.use('/felhasz/edit/:felhaszid',
        getFelhaszMW(objRepo),
        saveFelhaszMW(objRepo),
        renderMW(objRepo, 'felhaszedit'));
    app.get('/felhasz/del/:felhaszid',
        getFelhaszMW(objRepo),
        delFelhaszMW(objRepo));
    app.get('/felhasz',
        getFelhasznalokMW(objRepo),
        renderMW(objRepo, 'felhasz'));
    app.get('/szamito/:felhaszid',
        getFelhaszMW(objRepo),
        getSzamitokMW(objRepo),
        renderMW(objRepo, 'felhasznaloszamito'));
    app.use('/szamito/:felhaszid/new',
        getFelhaszMW(objRepo),
        saveSzamitoMW(objRepo),
        renderMW(objRepo, 'szamitogepedit'));
    app.use('/szamito/:felhaszid/edit/:szamitoid',
        getFelhaszMW(objRepo),
        getSzamitoMW(objRepo),
        saveSzamitoMW(objRepo),
        renderMW(objRepo, 'szamitogepedit'));
    app.get('/szamito/:felhaszid/del/:szamitoid',
        getFelhaszMW(objRepo),
        getSzamitoMW(objRepo),
        delSzamitoMW(objRepo),
        renderMW(objRepo, 'szamitogepedit'));
    app.use('/',
        renderMW(objRepo, 'index'));
};