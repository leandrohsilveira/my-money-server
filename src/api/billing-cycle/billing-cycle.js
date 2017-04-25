const restful = require('node-restful')
const mongoose = restful.mongoose

const Credit = require('../credit/credit')

const Debt = require('../debt/debt')

const billingCycleSchema = new mongoose.Schema({
    name: {type: String, required: true},
    month: {type: Number, min: 1, max: 12, required: true},
    year: {type: Number, min: 1970, required: true},
    credits: [Credit().schema],
    debts: [Debt().schema]
})

module.exports = restful.model('BillingCycle', billingCycleSchema)