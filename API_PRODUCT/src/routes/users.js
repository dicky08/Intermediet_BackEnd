const express = require("express");
const router = express.Router();
// const upload = require('../helper/upload');

// Destructur Method yg ada Controller
const {
getAllUserCtr,
registerCtr,
loginCtr,
refreshToken,
deleteToken,
deleteUser,
updateCtr,
verify
} = require("../controller/usersController");
const {authentication,authorisazation,admin} = require('../helper/authitentikasi')
router

  .get("/getAll",authentication,authorisazation,admin, getAllUserCtr)
  .post("/register", registerCtr)
  .post("/login", loginCtr)
  .post("/token", refreshToken)
  .patch("/update/:id", updateCtr)
  .patch("/logout/:id", deleteToken)
  .delete("/deleted/:id", deleteUser)
  .get('/verify/:token',verify)

module.exports = router;