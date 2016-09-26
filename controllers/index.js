var bluebird = require('bluebird');
var mongoose = require('mongoose');
mongoose.Promise = bluebird;
var Template = mongoose.model('Template');

module.exports.fetchAll = function (req, res) {
    Template.find({})
        .select({ "_id": 1, "name": 1, "ts": 1 })
        .exec(function (err, results) {
            if (err) return res.status(400).send(err);
            if (!results) return res.status(404).end();
            return res.status(200).send(results);
        });
};

module.exports.fetchOne = function (req, res) {
    /** Não esqueça de tratar erros de request */
    Template.find({ _id: req.params.id })
        .select({ "_id": 1, "name": 1, "ts": 1 })
        .exec(function (err, results) {
            if (err) return res.status(400).send(err);
            if (!results) return res.status(404).end();
            return res.status(200).send(results);
        });
};

module.exports.createOne = function (req, res) {
    var template = new Template();
    template.name = req.body.name;
    template.category = req.body.category;
    template.save(function (err, result) {
        if (err) return res.status(400).send(err);
        if (!result) return res.status(404).end();
        return res.status(201).send({ _id: result._id });
    });
};

module.exports.updateOne = function (req, res) {
    res.status(204).send({});
};

module.exports.removeOne = function (req, res) {
    res.status(204).send({});
};