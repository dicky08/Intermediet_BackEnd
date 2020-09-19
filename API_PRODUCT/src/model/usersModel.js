// Import Database
const db = require("../config/db_product");

const usersModel = {
    getAllUser: () => {
        return new Promise((resolve, reject) => {
            db.query(
                `SELECT * FROM users`,
                (err, result) => {
                    if (err) {
                        reject(new Error(err));
                    } else {
                        // console.log(result);
                        resolve(result);
                    }
                }
            );
        });
    },
    registerModel: (data) => {
        return new Promise((resolve, reject) => {
            db.query(
                `INSERT INTO users (email,password,level,is_active) 
            VALUES('${data.email}','${data.password}','${data.level}',0)`,
                (err, result) => {
                    if (err) {
                        reject(new Error(err));
                    } else {
                        // console.log(result);
                        resolve(result);
                    }
                }
            );
        });
    },
    // Login
    loginModel: (data) => {
        return new Promise((resolve, reject) => {
            db.query(`SELECT * FROM users where email='${data.email}'`,
                (err, result) => {
                    if (err) {
                        reject(new Error(err))
                    } else {
                        resolve(result)
                    }
                })
        })
    },
    getUsers: (email) => {
        return new Promise((resolve, reject) => {
            db.query(`UPDATE users SET is_active=1 WHERE email='${email}'`,
                (err, sukses) => {
                    if (err) {
                        reject(new Error(err))
                    } else {
                        resolve(sukses)
                    }
                })
        })
    },
    getLevel: (level) => {
        return new Promise((resolve, reject) => {
            db.query(`SELECT * FROM users WHERE level='${level}'`,
                (err, result) => {
                    if (err) {
                        reject(new Error(err))
                    } else {
                        resolve(result)
                    }
                })
        })
    },
    UpdateRefreshToken: (token, id) => {
        return new Promise((resolve, reject) => {
            db.query(`UPDATE users SET refreshToken ='${token}' WHERE id = '${id}'`,
                (err, result) => {
                    if (err) {
                        reject(new Error(err))
                    } else {
                        resolve(result)
                    }
                })
        })
    },
    deleteModel: (id) => {
        return new Promise((resolve, reject) => {
            db.query(`DELETE FROM users WHERE id=${id}`,
                (err, result) => {
                    if (err) {
                        reject(new Error(err))
                    } else {
                        resolve(result)
                    }
                })
        })
    },
    deleteModelToken: (id) => {
        return new Promise((resolve, reject) => {

            db.query(`UPDATE users SET refreshToken=null WHERE  id ='${id}'`,
                (err, result) => {
                    if (err) {
                        reject(new Error(err))
                    } else {
                        resolve(result)
                    }
                })
        })
    },
    updatePatchData: (data, id) => {
        return new Promise((resolve, reject) => {
            db.query(`UPDATE users SET ? WHERE id= ? `, [data, id], (err, result) => {
                if (err) {
                    reject(new Error(err))
                } else {
                    resolve(result)
                }
            })
        })
    }

};

module.exports = usersModel;