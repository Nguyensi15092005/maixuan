const express = require("express");
const router = express.Router();

const controller = require("../../controller/khachhang.controller");

router.get('/', controller.index);

router.get('/create', controller.create);

router.post('/create', controller.createPost);

router.get('/edit/:id', controller.edit);

router.patch('/edit/:id', controller.editPatch);

router.delete('/delete/:id', controller.delete);

router.patch('/change-multi', controller.changeMulti);







module.exports = router;