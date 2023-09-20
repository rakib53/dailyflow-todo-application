const {
  registration,
  loginUser,
  signJsonWebToken,
  verifyJsonWebToken,
  userInfo,
} = require("../controller/users.controller");
const router = require("express").Router();

router.post("/registration", signJsonWebToken, registration);
router.post("/login", signJsonWebToken, loginUser);
router.get("/userInfo", verifyJsonWebToken, userInfo);
module.exports = router;
