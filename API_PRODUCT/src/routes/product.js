const express = require("express");
const router = express.Router();
const upload = require('../helper/upload');

const { authentication, authorisazation,admin } = require('../helper/authitentikasi');
const {getRedisProduct, getRedisBestProduct} = require('../helper/redis_product')
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

  .get("/best-product",getRedisBestProduct , besProductCtr)
  .get("/getAll",authentication,authorisazation,getRedisProduct ,getAllCtr)
  .get("/getDetail/:id_product",authentication,authorisazation, getDetailCtr)
  .post("/insert",authentication,authorisazation,admin,  insertCtr)
  .put("/update/:id_product",authentication,authorisazation,admin, updateCtr)
  .patch("/updatePatch/:id_product",authentication,authorisazation,admin, updatePatch)
  .delete("/delete/:id_product",authentication,authorisazation,admin, deleteCtr);

module.exports = router;