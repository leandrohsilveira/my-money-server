module.exports = config => {
    const AuthService = require('./auth.service')

    // TODO: register on router

    const router = config.router

    router.post('/token', AuthService.validateToken)
    router.post('/login', AuthService.login)
    router.post('/signup', AuthService.signup)


}