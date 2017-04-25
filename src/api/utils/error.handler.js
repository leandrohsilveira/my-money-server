const _ = require('lodash')
module.exports = class ErrorHandler {

    static makeMiddleware() {
        return (req, res, next) => {
            const bundle = res.locals.bundle

            if(bundle.errors) {
                const errors = []
                _.forIn(bundle.errors, error => errors.push(error.message))
                res.status(500).json({errors})
            } else {
                next()
            }
        }
    }

    static makeException(errors) {
        return {
            errors: {
                _exceptions: Array.isArray(errors) ? errors : [errors]
            }
        }
    }

    static makeGlobalMessage(messages) {
        return {
            errors: {
                _globals: Array.isArray(messages) ? messages : [messages]
            }
        }
    }

}