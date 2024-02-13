const router = require("express").Router();
const { userRegister, userLogin } = require("../controller/auth");



/* USER REGISTER */
router.post("/register",userRegister );

/* USER LOGIN*/
router.post("/login",userLogin);

module.exports = router