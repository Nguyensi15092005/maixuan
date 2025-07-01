const express = require("express");
const router = express.Router();

const controller = require("../../controller/APIprint.controller");



router.post('/print', controller.print);



module.exports = router;