const _ = require('lodash')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const User = require('./user')
const env = require('../../.env')
const ErrorHandler = require('../utils/error.handler')

const emailRegex = /\S+@\S+\.\S+/
const passwordRegex = /((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%]).{6,20})/

module.exports = {
    EMAIL_REGEX: emailRegex,
    PASSWORD_REGEX: passwordRegex,
    login: login,
    validateToken: validateToken,
    signup: signup
}

function login(req, res, next) {
    const username = req.body.username || ''
    const password = req.body.password || ''

    User.findOne({username}, (error, user) => {
        if(error) {
            res.status(500).json(ErrorHandler.makeException(error))
        } else if (user && bcrypt.compareSync(password, user.password)) {
            const token = jwt.sign(user, env.authSecret, {
                expiresIn: '1 day'
            })
            const { username, email } = user
            res.json({username, email, token})
        } else {
            res.status(403).send()
        }
    })
}

function validateToken(req, res, next) {
    const token = req.headers['authorization'] || req.body.token || ''

    jwt.verify(token, env.authSecret, (error, decoded) => res.json({valid: !error}))
}

function signup(req, res, next) {
    const {
        username, 
        email, 
        password, 
        confirmPassword
    } = req.body
    let valid = true
    const errors = {}

    if(!username) {
        errors.username = { message: 'Path "username" is required'}
        valid = false
    }

    if(!email) {
        errors.email = { message: 'Path "email" is required'}
        valid = false
    } else if(!email.match(emailRegex)) {
        errors.email = { message: 'Path "email" is not valid'}
        valid = false
    }

    let passwordHash
    if(!password) {
        errors.password = { message: 'Path "password" is required'}
        valid = false
    } else if(!password.match(passwordRegex)) {
        errors.password = { message: 'Path "password" is not valid'}
        valid = false
    } else {
        const salt = bcrypt.genSaltSync()
        passwordHash = bcrypt.hashSync(password, salt)
        if(!bcrypt.compareSync(confirmPassword, passwordHash)) {
            errors.password = { message: 'Path "password" don\'t matches the confirmation'}
            valid = false
        }

    }
    return User.findOne({username}, (error, user) => {
        if(error) {
            return res.status(500).json(ErrorHandler.makeException(error))
        } else if (user) {
            errors.username = { message: 'The "username" provided already exists'}
            valid = false
        } else {
            const newUser = new User({username, email, password: passwordHash})
            return newUser.save(err => {
                if(err) {
                    return res.status(500).json(ErrorHandler.makeException(error))
                } else {
                    return res.json(newUser)
                }
            })
        }
        if(!valid) {
            return res.status(400).json({errors})
        }
    })
}