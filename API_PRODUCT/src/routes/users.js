const express = require("express");
const router = express.Router();
// const upload = require('../helper/upload');

// Destructur Method yg ada Controller
const {
registerCtr,
loginCtr,
refreshToken,
deleteToken,
deleteUser,
updateCtr,
verify
} = require("../controller/usersController");

router

  .post("/register", registerCtr)
  .post("/login", loginCtr)
  .post("/token", refreshToken)
  .patch("/update/:id", updateCtr)
  .patch("/logout/:id", deleteToken)
  .delete("/deleted/:id", deleteUser)
  .get('/verify/:token',verify)

module.exports = router;