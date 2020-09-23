// Import Database
const db = require('../config/db_product');

const history_detailModel = {

    getAllModel: () => {
        return new Promise((resolve, reject) => {

            db.query(`SELECT * FROM history_detail JOIN product ON history_detail.product_id=product.id JOIN history ON history_detail.history_id=history.id `,
                (err, result) => {
                    if (err) {
                        reject(new Error(err));
                    } else {
                        resolve(result);
                    }
                })
        })
    },
    getdetailModel: (id) => {
        return new Promise((resolve, reject) => {
            db.query(`SELECT * FROM history_detail WHERE id ='${id}'`,
                (err, result) => {
                    if (err) {
                        reject(new Error(err));
                    } else {
                        resolve(result);
                    }
                })
        })
    },
    updateModel: (data, id) => {
        return new Promise((resolve, reject) => {
            db.query(`UPDATE history_detail SET 
            history_id          ='${data.history_id}', 
            product_id        ='${data.product_id}', 
            name_product  ='${data.name_product}', 
            qty                     ='${data.qty}', 
            price                   ='${data.price}'
            WHERE id='${id}'`,
                (err, result) => {
                    if (err) {
                        reject(new Error(err));
                    } else {
                        resolve(result);
                    }
                })
        })
    },
    insertModelHistoryDetail:(data,id) => {
        return new Promise((resolve,reject) => {
            db.query(`INSERT INTO history_detail (history_id,product_id,name_product,qty,price)
            VALUES('${id}','${data.product_id}','${data.name_product}','${data.qty}','${data.price}')`,
            (err,results) => {
                if (err) {
                    reject(new Error(err))
                }else{
                    resolve(results)
                }
            })
        })
    },
    deleteModel: (id) => {
        return new Promise((resolve, reject) => {
            db.query(`DELETE FROM history_detail WHERE id='${id}'`,
                (err, result) => {
                    if (err) {
                        reject(new Error(err));
                    } else {
                        resolve(result);
                    }
                })
        })
    }
}


// Export Modul
module.exports = history_detailModel;