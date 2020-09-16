const express = require('express');
const router = express.Router();
// Destructur Controller
const {
    getAllCtr,
    getDetailCtr,
    updateCtr,
    deleteCtr
} = require('../controller/history_detailController');
// Auth
const {authentication,authorisazation} = require('../helper/authitentikasi')
// Redis
const {getRedisAllHistoryDetail,getRedisGetDetailHistoryDetail} = require('../helper/redis_history_detail')
router
    .get('/getAll',authentication,authorisazation, getAllCtr)
    .get('/getDetail/:id',authentication,authorisazation,getRedisGetDetailHistoryDetail,getDetailCtr)
    .put('/update/:id',authentication,authorisazation, updateCtr)
    .delete('/delete/:id',authentication,authorisazation, deleteCtr);

module.exports = router;