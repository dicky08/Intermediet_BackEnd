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
const {authentication,authorisazation} = require('../helper/authitentikasi')
// Redis
const {getRedisAllCategory,getRedisDetailCategory} = require('../helper/redis_category')

router
    .get('/getAll',authentication,authorisazation,getRedisAllCategory, getAllCtr)
    .get('/getDetail/:id',authentication,authorisazation,getRedisDetailCategory, getDetailCtr)
    .post('/insert',authentication,authorisazation, insertCtr)
    .put('/update/:id',authentication,authorisazation, updateCtr)
    .delete('/delete/:id',authentication,authorisazation, deleteCtr);

module.exports = router;