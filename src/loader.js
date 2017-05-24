const config = function() {
    const server = require('./config/server')
    const database = require('./config/database')
    const router = require('./config/router')(server)
    const authRouter = require('./config/auth-router')(server)

    return {server, router, authRouter, database}
}()

require('./api/billing-cycle/billing-cycle.module')(config)
require('./api/user/user.module')(config)
