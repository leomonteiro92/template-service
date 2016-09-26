var express = require('express');
var router = express.Router();
var passport = require('passport');
var service = require('../services/index');

/** GET all entities */
router.get('/', service.fetchAll);

/** POST a new entity */
router.post('/', service.createOne);

/** GET a given entity by its id */
router.get('/:id', passport.authenticate('bearer', { session: false }), service.fetchOne);

/** PUT updates a given entity */
router.put('/:id', service.updateOne);

/** DELETE a given entity by its id */
router.delete('/:id', service.removeOne);

module.exports = function (app) {
    app.use('/api/v1', router);
}