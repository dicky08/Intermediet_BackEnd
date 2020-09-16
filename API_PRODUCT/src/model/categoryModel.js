// Import Database
const db = require("../config/db_product");

const categoryModel = {
  getAllModel: (where, name, orderBy, sort, start, end) => {
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT *, (SELECT COUNT (*) FROM category) as count FROM category WHERE ${where} LIKE '%${name}%' ORDER BY ${orderBy} ${sort} LIMIT ${start},${end}`,
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
  getDetailModel: (id) => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT * FROM category WHERE id = '${id}'`, (err, result) => {
        if (err) {
          reject(new Error(err));
        } else {
          resolve(result);
        }
      });
    });
  },
  getLimitModel: (start, end) => {
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT * FROM category LIMIT ${start},${end}`,
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
  insertModel: (data) => {
    return new Promise((resolve, reject) => {
      db.query(
        `INSERT INTO category (category_name)
            VALUES('${data.category_name}')`,
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
  updateModel: (data, id) => {
    return new Promise((resolve, reject) => {
      db.query(
        `UPDATE category SET 
            category_name='${data.category_name}' 
            WHERE id='${id}'`,
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
  deleteModel: (id) => {
    return new Promise((resolve, reject) => {
      db.query(`DELETE FROM category WHERE id ='${id}'`, (err, result) => {
        if (err) {
          reject(new Error(err));
        } else {
          resolve(result);
        }
      });
    });
  },
};

module.exports = categoryModel;
