const express = require("express");
const router = express.Router();

const controller = require("../../controller/account.controller");

router.get('/create', controller.create);

router.post('/create', controller.createPost);



module.exports = router;