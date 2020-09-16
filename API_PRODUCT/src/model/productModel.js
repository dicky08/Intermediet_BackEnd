// Import Database
const db = require('../config/db_product');
const fs = require('fs');
const path = require('path');

const productModel = {
    // Best Product
    besProductModel: (start,end) => {
        return new Promise((resolve, reject) => {
            db.query(`SELECT best_product.id,category_name,product_name,price,image, (SELECT COUNT(*) FROM best_product) as count FROM product JOIN best_product ON best_product.id_product=product.id JOIN category ON product.category_id=category.id   LIMIT ${start},${end}`, (err, result) => {
                if (err) {
                    reject(new Error(err))
                } else {
                    resolve(result);
                }
            })
        })
    },
       // Model GetAll
       getRedisModel: () => {
        return new Promise((resolve, reject) => {
            db.query(`SELECT product.id,category_id,category_name,product_name,price,image, (SELECT COUNT(*) FROM product) as count FROM product JOIN category ON product.category_id=category.id`, (err, result) => {
                if (err) {
                    reject(new Error(err))
                } else {
                    resolve(result);
                }
            })
        })
    },
    // Model GetAll
    getAllModel: (where, name, orderBy, sort, start, end) => {
        return new Promise((resolve, reject) => {
            db.query(`SELECT product.id,category_id,category_name,product_name,price,image, (SELECT COUNT(*) FROM product) as count FROM product JOIN category ON product.category_id=category.id WHERE ${where} LIKE '%${name}%' ORDER BY ${orderBy} ${sort} LIMIT ${start},${end}`, (err, result) => {
                if (err) {
                    reject(new Error(err))
                } else {
                    resolve(result);
                }
            })
        })
    },

    // Model Detail
    getDetailModel: (id) => {
        return new Promise((resolve, reject) => {
            db.query(`SELECT product.id,category_name,product_name,price,image FROM product RIGHT JOIN category ON product.category_id=category.id WHERE product.id='${id}'`,

                (err, result) => {
                    if (err) {
                        reject(new Error(err));
                    } else {
                        resolve(result);
                    }
                })
        })
    },

    // Model Insert
    insertModel: (data) => {
        return new Promise((resolve, reject) => {
            db.query(`INSERT INTO product (category_id,product_name,price,image) 
                      VALUES('${data.category_id}','${data.product_name}','${data.price}','${data.image}')`,
                (err, result) => {
                    if (err) {
                        reject(new Error(err));
                    } else {
                        resolve(result);
                    }
                })
        })
    },
    // Model Update
    updateModel: (data, id) => {
        return new Promise((resolve, reject) => {
            db.query(`SELECT * FROM product WHERE id='${id}'`,
                (err, result) => {
                    if (err) {
                        reject(new Error(err));
                    } else {
                        let oldImage = result[0].image;
                        let newImage = data.image;
                        if (!newImage) {
                            db.query(`UPDATE product SET 
                                category_id  = '${data.category_id}',
                                product_name = '${data.product_name}',
                                price        = '${data.price}',
                                image        = '${oldImage}'
                                WHERE id     = '${id}'`,
                                (err, result) => {
                                    if (err) {
                                        reject(new Error(err))
                                    } else {
                                        resolve(result);
                                    }
                                })
                        } else {
                            let oldPath = path.join(__dirname + `/../img/${result[0].image}`);
                            fs.unlink(oldPath, function (err) {
                                if (err) throw err;
                                console.log('Deleted');
                            })
                            db.query(`UPDATE product SET 
                                    category_id  = '${data.category_id}',
                                    product_name = '${data.product_name}',
                                    price        = '${data.price}',
                                    image        = '${newImage.filename}'
                                    WHERE id     = '${id}'`,
                                (err, result) => {
                                    if (err) {
                                        reject(new Error(err))
                                    } else {
                                        resolve(result);
                                    }
                                })
                        }
                    }
                })
        })
    },

    // Model Delete
    deleteModel: (id) => {
        return new Promise((resolve, reject) => {
            db.query(`SELECT * FROM product WHERE id=${id}`,
                (err, result) => {
                    if (err) {
                        reject(new Error(err));
                    } else {
                        // Delete Image
                        let filepath = path.join(__dirname + `/../img/${result[0].image}`)
                        fs.unlink(filepath, function (err) {
                            if (err) {
                                throw err
                            } else {
                                console.log(`Deleted ${filepath} Success`);
                            }
                        })
                        // Query DELETE
                        db.query(`DELETE  FROM product WHERE id=${id} `,
                            (err, result) => {
                                if (err) {
                                    reject(new Error(err));
                                } else {
                                    resolve(result);
                                }
                            })
                    }
                })
        })
    },
    updatePacthModel: (data, id) => {
        return new Promise((resolve, reject) => {
            db.query(`SELECT * FROM product WHERE id = ${id}`, (err, result) => {
                if (err) {
                    reject(new Error(err));
                } else {
                    if (!data.image) {
                        data.image = result[0].image;
                        db.query(`UPDATE product SET ? WHERE id = ?`, [data, id], (err, result) => {
                            if (err) {
                                reject(new Error(err))
                            } else {
                                resolve(result);
                            }
                        })
                    } else {
                        let oldPath = path.join(__dirname + `/../img/${result[0].image}`);
                        fs.unlink(oldPath, function (err) {
                            if (err) throw err;
                            console.log('Updated');
                        })
                        db.query(`UPDATE product SET ? WHERE id = ?`, [data, id], (err, result) => {
                            if (err) {
                                reject(new Error(err))
                            } else {
                                resolve(result);
                            }
                        })
                    }

                }
            })
        })
    }

}

module.exports = productModel;