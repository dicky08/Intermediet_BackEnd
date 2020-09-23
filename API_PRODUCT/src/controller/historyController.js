// Destructur Model
const {
    getAllModel,
    getJoinModel,
    getdetailModel,
    insertModel,
    updateModel,
    deleteModel
} = require('../model/historyModel');
const {insertModelHistoryDetail} = require('../model/history_detailModel')
const {
    success,
    failed,
    notFound
} = require('../helper/respons');
// Redis
const redis = require('redis')
const redisClient = redis.createClient()

const historyController = {
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
                  // redisClient.set('history', JSON.stringify(result))
                  success(res, result, 'Get All History Success');
            })
            .catch((err) => {
                  res.status(400)
                  failed(res, [], err.message)
            })
      },
      getJoinCtr: (req, res) => {
            getJoinModel()
            .then((result) => {
                  // redisClient.set('join_history', JSON.stringify(result))
                  success(res, result, 'Get Join All History Success');
            })
            .catch((err) => {
                  res.status(500)
                  failed(res, [], err.message)
            })
      },
      getDetailCtr: (req, res) => {
            const id = req.params.id;
            getdetailModel(id)
            .then((result) => {
                  if (result.length<1) {
                        res.status(404)
                        notFound(res,[],'Data Not Found')
                  }
                  success(res, result, 'Get Detail History Success');
            })
            .catch((err) => {
                  res.status(500)
                  failed(res, [], err.message)
            })
      },
      insertCtr: (req, res) => {
            const body = req.body;
            insertModel(body)
            .then((result) => {
                  const idMaster = result.insertId
                  const inserDetail = body.detail.map((item)=>{
                        insertModelHistoryDetail(item,idMaster)
                  })
                  Promise.all(inserDetail)
                  .then(() => {
                        redisClient.del('history')
                        success(res, result, 'Success Insert')
                  })
                  .catch((err)=> {
                        res.status(500)
                        failed(res,[],err.message)
                  })
            })
            .catch((err) => {
                  res.status(500)
                  failed(res, [], err.message)
            })
      },
      updateCtr: (req, res) => {
            const id = req.params.id;
            const body = req.body;
            updateModel(body, id)
            .then((result) => {
                  redisClient.del('history')
                  success(res, result, 'Update History Success');
            })
            .catch((err) => {
                  res.status(500)
                  failed(res, [], err.message)
            })
    },
    deleteCtr: (req, res) => {
        const id = req.params.id;
        
        deleteModel(id)
        .then((result) => {
              redisClient.del('history')
              success(res, result, 'Delete History Success');
            })
            .catch((err) => {
                  res.status(500)
                  failed(res, [], err.message)
            })
      }
}

module.exports = historyController;