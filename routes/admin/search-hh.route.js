const express = require("express");
const router = express.Router();

const controller = require("../../controller/search-hh.controller");

router.get('/', controller.index);




module.exports = router;