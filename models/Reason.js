const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReasonSchema = new Schema({
    content_id: Number,
    reason: String
})

const Reason = mongoose.model('reasons', ReasonSchema);

module.exports = Reason
