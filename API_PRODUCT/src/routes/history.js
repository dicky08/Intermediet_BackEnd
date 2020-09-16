const express = require('express');
const router = express.Router();
// Destructur Controller
const {
    getAllCtr,
    getJoinCtr,
    getDetailCtr,
    insertCtr,
    updateCtr,
    deleteCtr
} = require('../controller/historyController');
// Auth
const {authentication,authorisazation} =require('../helper//authitentikasi')
// Redis
const {getRedisAllHistory,getRedisDetailHistory,getRedisJoinHistory} = require('../helper/redis_history')

router
    .get('/getAll',authentication,authorisazation,getRedisAllHistory, getAllCtr)
    .get('/getJoin',authentication,authorisazation,getRedisJoinHistory, getJoinCtr)
    .get('/getDetail/:id',authentication,authorisazation,getRedisDetailHistory, getDetailCtr)
    .post('/insert',authentication,authorisazation, insertCtr)
    .put('/update/:id',authentication,authorisazation, updateCtr)
    .delete('/delete/:id',authentication,authorisazation, deleteCtr);

module.exports = router;