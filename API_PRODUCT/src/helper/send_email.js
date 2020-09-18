// const nodeMailer = require('nodemailer')
// const envi = require('./env')
// const jwt = require('jsonwebtoken')
// module.exports = {
//     sendEmail: (req,res,email) => {
//         const hash = jwt.sign({email:email}, envi.JWT_REGIS)
//            let transporter = nodeMailer.createTransport({
//                service: 'gmail',
//                auth:{
//                    user: process.env.EMAIL,
//                    pass: process.env.PASSWORD
//                }
//            })
//            let mailOptions = {
//                from: process.env.EMAIL,
//                to: 'dickyf147@gmail.com',
//                subject: 'Hai',
//                text: `http://localhost:3000/users/verify/${hash}` 
//            }
//            transporter.sendMail(mailOptions, (err,sukses) => {
//                if (err) {
//                    console.log(err);
//                }else{
//                    console.log(sukses);
//                }
//            })
//            res.json({
//                 msg: 'Cek Email'
//         })
//     }

// }