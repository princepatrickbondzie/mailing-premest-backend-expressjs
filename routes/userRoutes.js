const router = require("express").Router();
const { signup, login } = require("../controllers/authCtrl");
const { getUser } = require("../controllers/UserCtrl");

router.post("/signup", signup);
router.post("/login", login);
router.get("/user/:username", getUser);

module.exports = router;
