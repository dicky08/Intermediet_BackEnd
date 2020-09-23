const jwt = require('jsonwebtoken')
const { JWTPRIVATE } = require('../helper/env')
const { tokenFailed,notFound } = require('./respons')

module.exports = {
    authentication: (req, res, next) => {
        const token = req.headers.token
        if (token === undefined || token === '') {
            res.status(404)
            notFound(res, [], 'Token is required ')
        } else {
            next()
        }
    },
    authorisazation: (req, res, next) => {
        const token = req.headers.token
        jwt.verify(token, JWTPRIVATE, (err, decode) => {
            if (err && err.name === 'TokenExpiredError') {
                res.status(499).send({
                  msg: 'tokenExpired'
                  // tokenFailed(res, 'Expired', [], 'Token has been expired ')
                })
            } else if (err && err.name === 'JsonWebTokenError') {
                res.status(401)
                tokenFailed(res, 'Unauthorized', [], 'Failed authentication')
            } else {
                next()
            }
        })
    },
    admin: (req,res,next) => {
        const token = req.headers.token
        jwt.verify(token,JWTPRIVATE, (err,decoded) => {
            if (err && err.name==='TokenExpiredError') {
              res.status(499).send({
                msg: 'tokenExpired'
                // tokenFailed(res, 'Expired', [], 'Token has been expired ')
              })
            }else if(err&&err.name==='JsonWebTokenError'){
                res.status(401)
                tokenFailed(res, 'Unauthorized', [], 'Failed authentication')
            }else{
                const level = decoded.level
                const admin = 0
                if (level===admin) {
                    next()
                }else{
                    res.status(403)
                    res.json({
                       Message: 'Access denied/forbidden, only admin can access this page!',
                       Status: 'Denied',
                       Code: 403
                    })
                }         
            }
        })
    }

}