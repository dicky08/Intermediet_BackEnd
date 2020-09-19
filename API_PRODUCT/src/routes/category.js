const express = require('express');
const router = express.Router();
// Destructur Controller
const {
    getAllCtr,
    getDetailCtr,
    insertCtr,
    updateCtr,
    deleteCtr
} = require('../controller/categoryController');
// Auth
const {authentication,authorisazation,admin} = require('../helper/authitentikasi')
// Redis
const {getRedisAllCategory} = require('../helper/redis_category')

router
    .get('/getAll',getRedisAllCategory, getAllCtr)
    .get('/getDetail/:id', getDetailCtr)
    .post('/insert',authentication,authorisazation,admin, insertCtr)
    .put('/update/:id',authentication,authorisazation,admin, updateCtr)
    .delete('/delete/:id',authentication,authorisazation,admin, deleteCtr);

module.exports = router;