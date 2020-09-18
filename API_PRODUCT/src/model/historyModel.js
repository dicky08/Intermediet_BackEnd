// Import Database
const db = require('../config/db_product');

const historyModel = {

    getAllModel: () => {
        return new Promise((resolve, reject) => {
            // id,history.cashier_name,orders_date,invoice,history_detail.name_product,history.ppn,history.amount FROM history JOIN history_detail ON history.id=history_detail.history_id
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
            db.query(`SELECT DISTINCT history.id,history.cashier_name,history.orders_date, history.id,history.cashier_name,orders_date,invoice,history_detail.name_product,history.ppn,history.amount FROM history JOIN history_detail ON history.id=history_detail.history_id`,
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