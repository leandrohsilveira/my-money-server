const restful = require('node-restful')
const mongoose = restful.mongoose

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true, min: 6, max: 12},
    email: { type: String, required: true }
})

module.exports = restful.model('User', userSchema)