var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        index: true,
        unique: true
    },
    category: String,
    ts: {
        type: Date,
        'default': Date.now()
    }
});

mongoose.model('Template', schema);