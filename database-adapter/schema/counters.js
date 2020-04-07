const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var CounterSchema = new Schema({
    collection_name: { type: String, required: true },
    seq: { type: Number, default: 0 }
}, {
    strict: false
});

module.exports = mongoose.models && mongoose.models.counter ? mongoose.models.counter : mongoose.model('counter', CounterSchema)