const restful = require('node-restful')
const mongoose = restful.mongoose

const debtSchema = new mongoose.Schema({
    name: {type: String, required: true},
    value: {type: Number, min: 0, required: true},
    status: {type: String, required: false, default: 'PENDING', uppercase: true, enum: ['PAID', 'PENDING', 'SCHEDULED']}
})

module.exports = restful.model('Debt', debtSchema)