const redis = require("redis");
const redisClient = redis.createClient();
const {
    success,
    notFound,
    dataTable
} = require("./respons");
const _ = require('lodash')

module.exports = {
    getRedisProduct: (req, res, next) => {
            // // Pagination
            redisClient.get("produk", (err, data) => {
                if (data) {
                    const where = !req.query.where ? 'product_name' : req.query.where;
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
                  
                    if (where!==null) {
                        const searchingCateogry = sorting.filter(e => e.category_name.toLowerCase().includes(where.toLowerCase()))
                        dataRedis=searchingCateogry
                    }
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
                    dataTable(res,result,countData,'Get All Product Data from Redis Success')
                 
            } else {
                next();
            }
        });
    },
    getRedisDetailProduct: (req, res, next) => {
        redisClient.get("produk_detail", (err, data) => {
            if (data) {
                success(res, JSON.parse(data), "Success Get Detail Product from Redis");
            } else {
                next();
            }
        });
    },
    getRedisBestProduct: (req, res, next) => {
        redisClient.get("best_product", (req, data) => {
            if (data) {
                success(
                    res,
                    JSON.parse(data),
                    "Get All Best Product from Redis Success"
                );
            } else {
                next();
            }
        });
    },
};

