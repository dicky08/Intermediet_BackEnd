// Destructur Method yang ada di Model
const {
besProductModel,
getAllModel,
getDetailModel,
insertModel,
updateModel,
deleteModel,
updatePacthModel,
getRedisModel
} = require('../model/productModel');
const {
success,
failed,
notFound,
dataTable
} = require('../helper/respons');

// Import Redis
const redis = require('redis')
const redisClient = redis.createClient()
// Upload
const upload = require('../helper/upload')


// Controller
const productController = {
// Best Product
besProductCtr: (req, res) => {
    // Pagination
    const jmlhDataPerhalaman = !req.query.limit ? 3 : parseInt(req.query.limit);
    const pagesActive = !req.query.pages ? 1 : parseInt(req.query.pages);
    const start = pagesActive === 1 ? 0 : (jmlhDataPerhalaman * pagesActive) - jmlhDataPerhalaman
    besProductModel(start, jmlhDataPerhalaman)
        .then((result) => {
            if (result.length < 1) {
                notFound(res, result, 'Data Not Found')
            }
            redisClient.set('best_product', JSON.stringify(result))
            success(res, result, 'Get Best Product Success');
        })
        .catch((err) => {
            failed(res, [], err.message)
        })
},
// Get All Data
getAllCtr: (req, res) => {
    const where = !req.query.where ? 'product_name' : req.query.where
    const name = !req.query.name ? '' : req.query.name
    const orderBy = !req.query.orderBy ? 'id' : req.query.orderBy
    const sort = !req.query.sort ? 'DESC' : req.query.sort
    // Pagination
    const jmlhDataPerhalaman = !req.query.limit ? 10 : parseInt(req.query.limit);
    const pagesActive = !req.query.pages ? 1 : parseInt(req.query.pages);
    const start = pagesActive === 1 ? 0 : (jmlhDataPerhalaman * pagesActive) - jmlhDataPerhalaman

    getAllModel(where, name, orderBy, sort, start, jmlhDataPerhalaman)
        .then((result) => {
            if (result.length < 1) {
                res.status(404)
                notFound(res, result, 'Data Not Found')
            }
            const countData = result[0].count;
            const coundDatabase = {
                totalRow: countData,
                totalPages: Math.ceil(countData / jmlhDataPerhalaman),
                pagesActive
            }
            res.status(200)
            dataTable(res, result, coundDatabase, `Get All Product Success`)

        })
        .catch((err) => {
            res.status(500)
            failed(res, [], err.message)
        })
    // GET REDIS
    getRedisModel()
        .then((results) => {
            redisClient.set('produk', JSON.stringify(results))
        })
        .catch(() => {
            res.status(500)
            failed(res, [], 'Error set redis')
        })
},
// Detail data
getDetailCtr: (req, res) => {
    const id = req.params.id_product;
    getDetailModel(id)
        .then((result) => {
            if (result.length < 1) {
                res.status(404)
                notFound(res, result, 'Data Not Found')
            }
            success(res, result, 'Get Detail Product Success');
        })
        .catch((err) => {
            res.status(500)
            failed(res, [], err.message)
        })
},
// Insert Data
insertCtr: (req, res) => {
    upload.single('image')(req, res, (err) => {
        if (err) {
            // Cek Ukuran Gambar
            if (err.code === 'LIMIT_FILE_SIZE') {
                failed(res, [], 'File too large, (Max 2 mb)')
            } else {
                // Cek Ekstensi Gambar
                failed(res, [], 'File must be of type jpg,jpeg or png')
            }
        } else {
            // Cek jika Gambar kosong
            if (req.file === undefined) {
                failed(res, [], 'Image canot be empty')
            } else {
                const body = req.body;
                body.image = req.file.filename
                insertModel(body)
                    .then((result) => {
                        redisClient.del('produk')
                        success(res, result, 'Insert Product Success');
                    })
                    .catch((err) => {
                        failed(res, [], err.message)
                    })
            }

        }
    })
},
// Update Data
updateCtr: (req, res) => {
    upload.single('image')(req, res, (err) => {
        if (err) {
            // Cek Ukuran Gambar
            if (err.code === 'LIMIT_FILE_SIZE') {
                failed(res, [], 'File too large, (Max 2 mb)')
            } else {
                // Cek Ekstensi Gambar
                failed(res, [], 'File must be of type jpg,jpeg or png')
            }
        } else {
            const id = req.params.id_product;
            const body = req.body;
            body.image = req.file;

            updateModel(body, id)
                .then((result) => {
                    redisClient.del('produk')
                    success(res, result, 'Update Product Success');
                })
                .catch((err) => {
                    failed(res, [], err.message)
                })
        }
    })
},
// Delete Data
deleteCtr: (req, res) => {
    const id = req.params.id_product;
    deleteModel(id)
        .then((result) => {
            redisClient.del('produk')
            success(res, result, 'Delete Product Success');
        })
        .catch((err) => {
            failed(res, [], err.message)
        })
},
updatePatch: (req, res) => {
    upload.single('image')(req, res, (err) => {
        if (err) {
            // Cek Ukuran Gambar
            if (err.code === 'LIMIT_FILE_SIZE') {
                failed(res, [], 'File too large, (Max 2 mb)')
            } else {
                // Cek Ekstensi Gambar
                failed(res, [], 'File must be of type jpg,jpeg or png')
            }
        } else {
            const id = req.params.id_product;
            const body = req.body;
            body.image = !req.file ? '' : req.file.filename;
            updatePacthModel(body, id)
                .then((result) => {
                    redisClient.del('produk')
                    success(res, result, 'Update Patch Product Success');
                })
                .catch((err) => {
                    failed(res, [], err.message)
                })
        }
    })
}
}

module.exports = productController;