// Import Database
const db = require("../config/db_product");

const usersModel = {
    registerModel: (data) => {
        return new Promise((resolve, reject) => {
            db.query(
                `INSERT INTO users (email,password,level) 
              VALUES('${data.email}','${data.password}','${data.level}' )`,
                (err, result) => {
                    if (err) {
                        reject(new Error(err));
                    } else {
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
        return new Promise((resolve,reject) => {
            db.query(`DELETE FROM users WHERE id=${id}`,
            (err,result) => {
                if (err) {
                    reject(new Error(err))
                }else{
                    resolve(result)
                }
            })
        })
    },
    deleteModelToken:(token) => {
        return new Promise((resolve,reject) => {
            
            db.query(`UPDATE users SET refreshToken=null WHERE  refreshToken ='${token}'`, 
            (err,result) => {
                if (err) {
                    reject(new Error(err))
                }else{
                    resolve(result)
                }
            })
        })
    },
    updatePatchData: (data,id) => {
        return new Promise((resolve,reject) => {
            db.query(`UPDATE users SET ? WHERE id= ? `,[data,id], (err,result) => {
                if (err) {
                    reject(new Error(err))
                }else{
                    resolve(result )
                }
            })
        })
    }

};

module.exports = usersModel;