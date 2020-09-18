const express = require('express');
const router = express.Router();
// Destructur Controller
const {
    getAllCtr,
    getDetailCtr,
    updateCtr
} = require('../controller/history_detailController');
// Auth
const {authentication,authorisazation,admin} = require('../helper/authitentikasi')
// Redis
const {getRedisAllHistoryDetail} = require('../helper/redis_history_detail')
router
    .get('/getAll',authentication,authorisazation,getRedisAllHistoryDetail, getAllCtr)
    .get('/getDetail/:id',authentication,authorisazation,getDetailCtr)
    .put('/update/:id',authentication,authorisazation, updateCtr)

module.exports = router;