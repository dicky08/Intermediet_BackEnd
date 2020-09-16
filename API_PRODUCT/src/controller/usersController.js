require("dotenv").config();
// Model
const { registerModel, loginModel, UpdateRefreshToken, deleteModel, deleteModelToken,updatePatchData } = require("../model/usersModel");
// Impor ENV
const { JWTPRIVATE, JWT_REFRESH } = require("../helper/env");
// Helper
const { success, failed, notFound, tokenResult, tokenFailed, tokenForbidden, } = require("../helper/respons");
// Import BYCRPT
const bycrpt = require("bcrypt");
// Import JWT
const jwt = require("jsonwebtoken");
const nodeMailer = require("nodemailer");

const usersController = {
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

    // Masukan data hasil hash
    registerModel(data)
        .then((result) => {
            success(res, result, "Success Registration");
        })
        .catch((err) => {
            failed(res, [], err.message);
        });
},
// Login
loginCtr: (req, res) => {
    const body = req.body;
    loginModel(body)
        // Kasih tau bahwa didalam fungsi yg parameter result ada proses asynchronous
        .then(async (result) => {
            const sukses = result[0];
            if (sukses) {
                const passwordDatabase = sukses.password;
                const id = sukses.id;
                const email = sukses.email;
                const emailHash = {
                    email: sukses.email,
                };
                const level = sukses.level;
                const match = await bycrpt.compare(body.password, passwordDatabase);
                if (match) {
                    const refreshToken = jwt.sign(emailHash, JWT_REFRESH);
                    const getToken = generateToken(emailHash);
                    if (sukses.refreshToken === null || sukses.refreshToken === "") {
                        UpdateRefreshToken(refreshToken, id)
                            .then(()=> {
                                if (level === 0) {
                                    tokenResult(res, { id, email, level, accessToken: getToken, refreshToken: refreshToken }, "Login Success, you are logged in as Admin");
                                } else {
                                    tokenResult(res, { id, email, level, accessToken: getToken, refreshToken: refreshToken }, "Login Success, you are logged in as Cashier"
                                    );
                                }
                            })
                            .catch((err) => {
                                console.log(err);
                            });
                    } else {
                        if (level === 0) {
                            tokenResult(res, { id, email, level, accessToken: getToken, refreshToken: sukses.refreshToken, }, "Login Success, you are logged in as Admin");
                        } else {
                            tokenResult(res, { id, email, level, accessToken: getToken, refreshToken: sukses.refreshToken, }, "Login Success, you are logged in as Cashier");
                        }
                    }
                }
            } else {
                notFound(res, [], "Email has not been registered");
            }
        })
        .catch((err) => {
            failed(res, [], err.message);
        });
},
refreshToken: (req, res) => {
    const newToken = req.body.token;
    if (newToken) {
        jwt.verify(newToken, JWT_REFRESH, (err, result) => {
            console.log(result);
            const refReshTOKEN = generateToken({ email: result.email, });
            tokenResult(res, { newToken: refReshTOKEN, }, "Refresh token success");
        });
    } else {
        tokenFailed(res, false, [], "Token is required!");
    }
},
deleteToken: (req, res) => {
    const tokens = req.body.token;
    console.log(tokens);
    if (tokens===null||tokens==='') {
        failed(res,[],'Not Found')
    }else{
        deleteModelToken(tokens)
        .then((result) => {
            success(res,result,'Success')
        }).catch((err) => {
            failed(res,[],err.message)
        });
        
    }
},
deleteUser: (req, res) => {
    const id = req.params.id;
    deleteModel(id)
        .then((result) => {
            success(res, result, "Success delete");
        })
        .catch((err) => {
            failed(res, [], err.message);
        });
},
updateCtr:(req,res) => {
    const id =req.params.id
    const body =req.body
    console.log(body);
    console.log(id);
    updatePatchData(body,id)
    .then((result) => {
        success(res,result,'Success Update')
    }).catch((err) => {
        console.log(err);
        
    });
}
};

function generateToken(emailHash) {
return jwt.sign(emailHash, JWTPRIVATE, {
    expiresIn: "2h",
});
}

module.exports = usersController;