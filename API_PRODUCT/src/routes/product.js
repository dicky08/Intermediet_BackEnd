const express = require("express");
const router = express.Router();
const upload = require('../helper/upload');

const { authentication, authorisazation } = require('../helper/authitentikasi');
const {getRedisProduct, getRedisDetailProduct, getRedisBestProduct,insertProduct} = require('../helper/redis_product')
// Destructur Method yg ada Controller
const {
  besProductCtr,
  getAllCtr,
  getDetailCtr,
  insertCtr,
  updateCtr,
  deleteCtr,
  updatePatch
} = require("../controller/productController");

router

  .get("/best-product",authentication,authorisazation,getRedisBestProduct , besProductCtr)
  .get("/getAll",authentication,authorisazation,getRedisProduct ,getAllCtr)
  .get("/getDetail/:id_product",authentication,authorisazation,getRedisDetailProduct, getDetailCtr)
  .post("/insert",authentication,authorisazation,  insertCtr)
  .put("/update/:id_product",authentication,authorisazation, updateCtr)
  .patch("/updatePatch/:id_product",authentication,authorisazation, updatePatch)
  .delete("/delete/:id_product",authentication,authorisazation, deleteCtr);

module.exports = router;