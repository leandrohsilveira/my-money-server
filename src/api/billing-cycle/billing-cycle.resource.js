
module.exports = config => {
    const BillingCycle = require('./billing-cycle')
    const ErrorHandler = require('../utils/error.handler')
    const options = {
        new: true,
        runValidators: true
    }

    const authRouter = config.authRouter

    BillingCycle.methods(['get', 'post', 'put', 'delete'])
    BillingCycle.updateOptions(options)
    // BillingCycle.after('post', ErrorHandler.makeMiddleware()).after('put', ErrorHandler.makeMiddleware())
    BillingCycle.route('count', count)
    BillingCycle.route('summary',  summary)
    BillingCycle.register(authRouter, '/billing-cycles')

    function summary(req, res, next) {
        BillingCycle.aggregate({
            $project: {
                credit: {$sum: '$credits.value'},
                debt: {$sum: '$debts.value'}
            }
        }, {
            $group: {
                _id: null,
                credit: {$sum: '$credit'},
                debt: {$sum: '$debt'}
            }
        }, {
            $project: {
                _id: 0, 
                credit: 1, 
                debt: 1
            }
        }, (error, result) => {
            if(error) {
                res.status(500).json(ErrorHandler.makeException(error))
            } else {
                res.json(result[0] || {credit: 0, debt: 0})
            }
        })
    }

    function count(req, res, next) {
        BillingCycle.count((error, count) => {
            if(error) {
                res.status(500).json(ErrorHandler.makeException(error))
            } else {
                res.json({count})
            }
        })
    }

}