const router = require("express").Router();
const {sync, send, deliver} = require("../controllers/mailCtrl");

router.post("/mail", sync);
router.post("/mail/send", send);
router.post("/mail/deliver", deliver);

module.exports = router;