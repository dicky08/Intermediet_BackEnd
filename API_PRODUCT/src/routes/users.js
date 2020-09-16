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
updateCtr
} = require("../controller/usersController");

router

  .post("/register", registerCtr)
  .post("/login", loginCtr)
  .post("/token", refreshToken)
  .patch("/update/:id", updateCtr)
  .delete("/logout", deleteToken)
  .delete("/deleted/:id", deleteUser)


module.exports = router;