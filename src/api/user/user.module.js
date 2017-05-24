

module.exports = config => {
    require('./user.resource')(config)
    require('./auth.resource')(config)
}