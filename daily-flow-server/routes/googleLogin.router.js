const router = require("express").Router();
const googleLogin = require("../controller/googleLogin.controller");

router.post("/googleLogin", googleLogin);

module.exports = router;
