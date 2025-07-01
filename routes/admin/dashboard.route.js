const express = require("express");
const router = express.Router();

const controller = require("../../controller/dashboard.controller");

router.get('/', controller.dashboard);

router.get("/manager", controller.dashboardManager);

router.get('/baocaocuoingay', controller.baocaocuoingay);


module.exports = router;