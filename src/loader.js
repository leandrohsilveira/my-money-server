const config = function() {
    const server = require('./config/server')
    const database = require('./config/database')
    const router = require('./config/router')(server)

    return {server, router, database}
}()

require('./api/billing-cycle/billing-cycle.module')(config)
