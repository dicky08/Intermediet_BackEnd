const jwt = require('jsonwebtoken')
const {JWTPRIVATE} = require('./env')
const {tokenFailed,notFound} = require('./respons')
const databaseUser = require('../model/usersModel')

module.exports = {
    admin: (req,res,next) => {
        const token = req.headers.token
        jwt.verify(token,JWTPRIVATE, (err,decoded) => {
            if (err && err.name==='TokenExpiredError') {
                tokenFailed(res, 'Expired', [], 'Token has been expired')
            }else if(err&&err.name==='JsonWebTokenError'){
                tokenFailed(res, 'Unauthorized', [], 'Failed authentication')
            }else{
                const level = decoded.level
                const admin = 0
                if (level===admin) {
                    next()
                }else{
                    res.json({
                       Message: 'Access denied/forbidden, only admin can access this page!',
                       Status: 'Denied',
                       Code: 403
                    })
                }         
            }
        })
    },
    
    cashier: (req,res,next) => {
        const token = req.headers.token
        jwt.verify(token,JWTPRIVATE, (err,decode) => {
            if (err && err.name==='TokenExpiredError') {
                tokenFailed(res, 'Expired', [], 'Token has been expired')
            }else if(err&&err.name==='JsonWebTokenError'){
                tokenFailed(res, 'Unauthorized', [], 'Failed authentication')
            }else{
                const level = decode.level
                const cashier = 1
                if (level===cashier) {
                    next()
                }else{
                    res.json({
                        Message: 'Access denied/forbidden, only Cashier can access this page!',
                        Status: 'Denied',
                        Code: 403
                    })
                }
            }
        })
    }

}
