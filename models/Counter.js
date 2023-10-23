const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CounterSchema = new Schema({
    model: String, // The model name (e.g., 'Content')
    field: String, // The field name (e.g., 'id_content')
    count: Number, // The current counter value
})

const Counter = mongoose.model('Counter', CounterSchema);

module.exports = Counter
