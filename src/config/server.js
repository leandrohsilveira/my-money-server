const port = 3003

const bodyParser = require('body-parser')
const express = require('express')
const allowCors = require('./cors')
const expressQueryInt = require('express-query-int')

const server = express()

server.use(bodyParser.urlencoded({extended: true}))
server.use(bodyParser.json())
server.use(allowCors)
server.use(expressQueryInt())

server.listen(port, function() {
    console.log(`The SERVER is running on port ${port}`)
})

module.exports = server