const express = require('express')

module.exports = function(server) {
    const router = express.Router()

    // Base route
    server.use('/api', router)

    return router
}