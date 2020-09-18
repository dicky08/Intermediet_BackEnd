const redis = require('redis')
const redisClient = redis.createClient()
const { success,dataTable } = require('./respons')
const _ = require('lodash')
module.exports = {
    getRedisAllCategory: (req, res,next) => {
        redisClient.get('categorys', (err,data) => {
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
                        const searching = sorting.filter(e => e.category_name.toLowerCase().includes(name.toLowerCase()))
                        dataRedis=searching
                    }
                    const countData = {
                        totalRows : dataRedis.length,
                        totalPages: Math.ceil(dataRedis.length/jmlhDataPerhalaman),
                        pagesActive,
                    }
                    const result= dataRedis.slice(startIndex,endIndex)
                    dataTable(res,result,countData,'Get All Category from Redis Success')
            }else{
                next()
            }
        })
    },
    getRedisDetailCategory: (req,res,next) => {
        redisClient.get('detail_category', (err,data) => {
            if (data) {
                success(res, JSON.parse(data), 'Get Detail Category from Redis Success')
            }else{
                next()
            }
        })
    }
}