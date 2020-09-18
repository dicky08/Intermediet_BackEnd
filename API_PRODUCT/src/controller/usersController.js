require("dotenv").config();
// Model
const { registerModel, loginModel, UpdateRefreshToken, deleteModel, deleteModelToken, updatePatchData, getUsers } = require("../model/usersModel");
// Impor ENV
const { JWTPRIVATE, JWT_REFRESH, JWT_REGIS, EMAIL, PASSWORD } = require("../helper/env");
// Helper
const { success, failed, notFound, tokenResult, tokenFailed, tokenForbidden, } = require("../helper/respons");
// Import BYCRPT
const bycrpt = require("bcrypt");
// Import JWT
const jwt = require("jsonwebtoken");
const nodeMailer = require("nodemailer");

const usersController = {
    ////////////////////////////////////CONTROLLER/////////////////////////////////
    // Register
    registerCtr: async (req, res) => {
        const body = req.body;
        // Buat salt dengan 10 digit
        const salt = await bycrpt.genSalt(10);
        // HashPassword gunakan async await/promsie karena asynchcrnous
        const hash = await bycrpt.hash(body.password, salt);
        // Tampung data
        const data = {
            email: body.email,
            password: hash,
            level: body.level,
        };

        /////////////////////////////////MODEL/////////////////////////////////
        // Masukan data hasil hash
        registerModel(data)
            .then(() => {
                // SEND EMAIL
                const hash = jwt.sign({ email: data.email }, JWT_REGIS)
                let transporter = nodeMailer.createTransport({
                    host: 'smtp.gmail.com',
                    port: 587,
                    secure: false,
                    requireTLS: true,
                    auth: {
                        // ENV
                        user: EMAIL,
                        pass: PASSWORD
                    }
                })

                let mailOptions = {
                    from: EMAIL,
                    to: data.email,
                    subject: 'Welcome to activation',
                    html: `
                Please activation of email !<br>
                <a href="http://localhost:3000/users/verify/${hash}">Activasi</a>
            `
                }
                transporter.sendMail(mailOptions, (err, sukses) => {
                    if (err) {
                        res.status(500)
                        failed(res, [], err.message);
                    } else {
                        success(res, [], 'Oke')
                    }
                })
                res.json({
                    Message: 'Success registration, Please activation of email! '
                })
            })
            .catch((err) => {
                res.status(500)
                failed(res, [], err.message);
            });
    },
    /////////////////////////////////////CONTROLLER///////////////////////////////
    // Login
    loginCtr: (req, res) => {
        const body = req.body;
        loginModel(body)
            // Kasih tau bahwa didalam fungsi yg parameter result ada proses asynchronous
            .then(async (result) => {
                const sukses = result[0];
                if (sukses) {
                    if (sukses.is_active === 1) {
                        const passwordDatabase = sukses.password;
                        const id = sukses.id;
                        const email = sukses.email;
                        const emailHash = {
                            id: sukses.id,
                            email: sukses.email,
                            level: sukses.level
                        };
                        const level = sukses.level;
                        const match = await bycrpt.compare(body.password, passwordDatabase);
                        if (match) {
                            const refreshToken = jwt.sign(emailHash, JWT_REFRESH);
                            const getToken = generateToken(emailHash);
                            if (sukses.refreshToken === null || sukses.refreshToken === "") {
                                UpdateRefreshToken(refreshToken, id)
                                    .then(() => {
                                        if (level === 0) {
                                            res.status(200)
                                            tokenResult(res, { id, email, level, accessToken: getToken, refreshToken: refreshToken }, "Login Success, you are logged in as Admin");
                                        } else {
                                            res.status(200)
                                            tokenResult(res, { id, email, level, accessToken: getToken, refreshToken: refreshToken }, "Login Success, you are logged in as Cashier"
                                            );
                                        }
                                    })
                                    .catch((err) => {
                                        res.status(500)
                                        failed(res, [], err.message)
                                    });
                            } else {
                                if (level === 0) {
                                    res.status(200)
                                    tokenResult(res, { id, email, level, accessToken: getToken, refreshToken: sukses.refreshToken, }, "Login Success, you are logged in as Admin");
                                } else {
                                    res.status(200)
                                    tokenResult(res, { id, email, level, accessToken: getToken, refreshToken: sukses.refreshToken, }, "Login Success, you are logged in as Cashier");
                                }
                            }
                        }else{
                            res.status(500)
                            notFound(res, [], "Wrong password");
                        }
                    } else {
                        res.status(404)
                        notFound(res, [], "Email has not been activated");
                    }
                } else {
                    res.status(404)
                    notFound(res, [], "Email has not been registered");
                }
            })
            .catch((err) => {
                res.status(500)
                failed(res, [], err.message);
            });
    },
    /////////////////////////////////REFFRESH TOKEN/////////////////////////////////
    // Refresh Token
    refreshToken: (req, res) => {
        const newToken = req.body.token;
        if (newToken) {
            jwt.verify(newToken, JWT_REFRESH, (err, result) => {
                const refReshTOKEN = generateToken({ email: result.email, });
                res.status(200)
                tokenResult(res, { newToken: refReshTOKEN, }, "Refresh token success");
            });
        } else {
            res.status(401)
            tokenFailed(res, false, [], "Token is required!");
        }
    },
    /////////////////////////////////DELETE TOKEN/////////////////////////////////////
    // Logout/Delete Token
    deleteToken: (req, res) => {
        const id = req.params.id;
        if (id === null || id === '') {
            res.status(404)
            failed(res, [], 'Not Found')
        } else {
            deleteModelToken(id)
                .then((result) => {
                    res.status(200)
                    success(res, result, 'Success')
                }).catch((err) => {
                    res.status(500)
                    failed(res, [], err.message)
                });

        }
    },
    ////////////////////////////////////DELETE USER/////////////////////////////
    // Delete User
    deleteUser: (req, res) => {
        const id = req.params.id;
        deleteModel(id)
            .then((result) => {
                res.status(200)
                success(res, result, "Success delete");
            })
            .catch((err) => {
                res.status(500)
                failed(res, [], err.message);
            });
    },
    ////////////////////////////////UPDATE USER//////////////////////////////////
    // Update Users
    updateCtr: (req, res) => {
        const id = req.params.id
        const body = req.body
        updatePatchData(body, id)
            .then((result) => {
                res.status(200)
                success(res, result, 'Success Update')
            }).catch((err) => {
                res.status(500)
                failed(res, [], 'Failed activation')
            });
    },
    /////////////////////////////VERIFIKASI EMAIL///////////////////////////////
    // Verifikasi Email
    verify: (req, res) => {
        const token = req.params.token
        if (token) {
            jwt.verify(token, process.env.JWT_REGIS, (err, decode) => {
                if (err) {
                    res.status(500)
                    failed(res, [], 'Failed Activation!')
                } else {
                    const email = decode.email
                    getUsers(email)
                        .then((result) => {
                            if (result.affectedRows) {
                                res.status(200)
                                success(res, { email }, 'Congratulation, Your account has been created!')
                            }
                            res.status(500)
                            failed(res, [], 'Failed activation')
                        })
                        .catch((err) => {
                            res.status(500)
                            failed(res, [], err.message)
                        });
                }
            })
        }
    }

};
////////////////////////////////GENERATE TOKEN////////////////////////////////////
function generateToken(emailHash) {
    return jwt.sign(emailHash, JWTPRIVATE, {
        expiresIn: "2h",
    });
}

module.exports = usersController;