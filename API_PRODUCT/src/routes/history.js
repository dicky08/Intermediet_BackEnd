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
const {authentication,authorisazation,admin} =require('../helper//authitentikasi')
// Redis
const {getRedisAllHistory,getRedisJoinHistory} = require('../helper/redis_history')

router
    .get('/getAll',getRedisAllHistory, getAllCtr)
    .get('/getJoin',getRedisJoinHistory, getJoinCtr)
    .get('/getDetail/:id', getDetailCtr)
    .post('/insert',authentication,authorisazation, insertCtr)
    .put('/update/:id',authentication,authorisazation, updateCtr)
    .delete('/delete/:id',authentication,authorisazation, deleteCtr);

module.exports = router;