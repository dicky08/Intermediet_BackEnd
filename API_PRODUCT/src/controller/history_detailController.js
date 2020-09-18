// Destructur Model
const {
    getAllModel,
    getdetailModel,
    updateModel,
    deleteModel
} = require('../model/history_detailModel');

const {
    success,
    failed,
    dataTable,
    notFound
} = require('../helper/respons');
// Redis
const redis = require('redis')
const redisClient = redis.createClient()

const history_detailController = {
    getAllCtr: (req, res) => {
        // const where = !req.query.where ? 'orders_date' : req.query.where;
        // const name = !req.query.name ? '' : req.query.name;
        // const orderBy = !req.query.orderBy ? 'id' : req.query.orderBy
        // const sort = !req.query.sort ? 'ASC' : req.query.sort

        // // Pagination
        // const jmlhDataPerhalaman = !req.query.limit ? 5 : parseInt(req.query.limit);
        // const pagesActive = !req.query.pages ? 1 : parseInt(req.query.pages);
        // const start = pagesActive === 1 ? 0 : (jmlhDataPerhalaman * pagesActive) - jmlhDataPerhalaman

        getAllModel()
            .then((result) => {
                redisClient.set('history_detail', JSON.stringify(result))
                success(res, result, 'Get All History Detail Success');
            })
            .catch((err) => {
                failed(res, [], err.message)
            })
        },
        getDetailCtr: (req, res) => {
            const id = req.params.id;
            getdetailModel(id)
            .then((result) => {
                if (result.length<1) {
                    notFound(res,[], 'Data not Found')
                }
                success(res, result, 'Get Detail History Detail Success');
            })
            .catch((err) => {
                failed(res, [], err.message)
            })
    },
    updateCtr: (req, res) => {
        const id = req.params.id;
        const body = req.body;
        updateModel(body, id)
            .then((result) => {
                redisClient.del('history_detail')
                success(res, result, 'Update History Detail Success');
            })
            .catch((err) => {
                failed(res, [], err.message)
            })
    },
}

module.exports = history_detailController;