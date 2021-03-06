// Import Database
const db = require('../config/db_product');

const historyModel = {

    getAllModel: () => {
        return new Promise((resolve, reject) => {
            db.query(`SELECT * FROM history`,
                (err, result) => {
                    if (err) {
                        reject(new Error(err));
                    } else {
                        resolve(result);
                    }
                })
        })
    },
    getJoinModel: (id) => {
        return new Promise((resolve, reject) => {
            db.query(`SELECT history.cashier_name, history_detail.history_id, history_detail.product_id,history_detail.name_product, history_detail.qty, history_detail.price FROM history JOIN history_detail ON history.id=history_detail.history_id`,
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
            db.query(`SELECT * FROM history WHERE id ='${id}'`,
                (err, result) => {
                    if (err) {
                        reject(new Error(err));
                    } else {
                        resolve(result);
                    }
                })
        })
    },
  
    insertModel: (data) => {
        return new Promise((resolve, reject) => {
          db.query(
            `INSERT INTO history (cashier_name,invoice,ppn,amount)
             VALUES('${data.cashier_name}','${data.invoice}','${data.ppn}','${data.amount}')`,
            (err, result) => {
              if (err) {
                reject(new Error(err));
              } else {
                resolve(result)
               
              }
            }
          );
        });
      },
    updateModel: (data, id) => {
        return new Promise((resolve, reject) => {
            db.query(`UPDATE history SET
                    cashier_name = '${data.cashier_name}',
                    invoice = '${data.invoice}',
                    ppn                = '${data.ppn}',
                    amount          = '${data.amount}'
                    WHERE id       = '${id}'`,
                (err, result) => {
                    if (err) {
                        reject(new Error(err));
                    } else {
                        resolve(result);
                    }
                })
        })
    },
    deleteModel: (id) => {
        return new Promise((resolve, reject) => {
            db.query(`DELETE FROM history WHERE id='${id}'`,
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
module.exports = historyModel;