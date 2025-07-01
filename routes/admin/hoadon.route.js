const express = require("express");
const router = express.Router();

const controller = require("../../controller/hoadon.controller");

router.get('/', controller.index);

router.post('/create', controller.create);

router.delete('/delete/:id', controller.delete);







module.exports = router;