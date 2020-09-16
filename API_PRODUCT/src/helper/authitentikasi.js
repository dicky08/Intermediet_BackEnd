const jwt = require('jsonwebtoken')
const {
    JWTPRIVATE
} = require('../helper/env')
const {
    tokenFailed,
    notFound
} = require('./respons')

module.exports = {
    authentication: (req, res, next) => {
        const token = req.headers.token
        if (token === undefined || token === '') {
            notFound(res, [], 'Token is required ')
        } else {
            next()
        }
    },
    authorisazation: (req, res, next) => {
        const token = req.headers.token
        jwt.verify(token, JWTPRIVATE, (err, decode) => {
            if (err && err.name === 'TokenExpiredError') {
                tokenFailed(res, 'Expired', [], 'Token has been expired ')
            } else if (err && err.name === 'JsonWebTokenError') {
                tokenFailed(res, 'Unauthorized', [], 'Failed authentication')
            } else {
                next()
            }
        })
    }

}