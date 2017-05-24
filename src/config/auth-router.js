module.exports = server => {

    const express = require('express')
    const jwt = require('jsonwebtoken')
    const env = require('../.env')

    router = express.Router()
    server.use('/api', router)

    router.use((req, res, next) => {
        if(req.method === 'OPTIONS') {
            next()
        } else {
            const token = req.headers['authorization'] || req.query._token || req.body._token

            if(!token) {
                return res.status(401).send()
            }

            jwt.verify(token, env.authSecret, function(err, decoded) {
                if(err) {
                    return res.status(403).send({errors: {global: 'Failed to authenticate token'}})
                } else {
                    req.decoded = decoded
                    next()
                }
            })
        }
    });

    return router

}