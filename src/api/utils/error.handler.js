
module.exports = class ErrorHandler {

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