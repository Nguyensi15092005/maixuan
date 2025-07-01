const express = require("express");
const router = express.Router();

const controller = require("../../controller/search-kh.controller");

router.get('/', controller.index);




module.exports = router;