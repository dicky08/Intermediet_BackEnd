const redis = require('redis')
const redisClient = redis.createClient()
const _ = require('lodash')
const {
    success,
    notFound,
    dataTable
} = require("./respons");

// Respond
module.exports = {
    getRedisAllHistory:(req,res,next) => {
        redisClient.get('history', (err,data) => {
            if (data) {
                const name = !req.query.name ? null : req.query.name;
                const orderBy = !req.query.orderBy ? 'id' : req.query.orderBy;
                const sort = !req.query.sort ? 'asc' : req.query.sort;
                let jmlhDataPerhalaman = !req.query.limit ?  10 : parseInt(req.query.limit);
                let pagesActive = !req.query.pages ? 1 : parseInt(req.query.pages);
                const startIndex = (pagesActive - 1) * jmlhDataPerhalaman;
                const endIndex = pagesActive * jmlhDataPerhalaman;
                // Pagination
                let results = JSON.parse(data);
                const sorting = _.orderBy(results,[orderBy],[sort])
                    let dataRedis = sorting
                    if (name!==null) {
                        const searching = sorting.filter(e => e.product_name.toLowerCase().includes(name.toLowerCase()))
                        dataRedis=searching
                    }
                    const countData = {
                        totalRows : dataRedis.length,
                        totalPages: Math.ceil(dataRedis.length/jmlhDataPerhalaman),
                        pagesActive,
                    }
                    const result= dataRedis.slice(startIndex,endIndex)
                    dataTable(res,result,countData,'Get All History from Redis Success')
            }else{
                next()
            }
        })
    },
    getRedisDetailHistory: (req,res,next) => {
        redisClient.get('get_detail_history', (err,data) => {
            if (data) {
                success(res, JSON.parse(data), 'Get Detail History from Redis Success')
            }else{
                next()
            }
        })
    },
    getRedisJoinHistory: (req,res,next) => {
        redisClient.get('join_history', (err,data) =>{
            if (data) {
                success(req,JSON.parse(data, ' Get Join History from Redis Success'))
            }else{
                next()
            }
        })
    }
}