const authMiddleware = require("../../middlewares/auth.middleware");

const systemConfig = require("../../config/system");
const dashboardRoutes = require("./dashboard.route");
const hanhoaRouter = require("./hanghoa.route");
const nhacungcapRouter = require("./nhacungcap.route");
const khachhangRouter = require("./khachhang.route");
const hoadonRouter = require("./hoadon.route");
const searchHH = require("./search-hh.route");
const searchKH = require("./search-kh.route");
const accoutRoute = require("./account.route");
const authRouter = require("./auth.route");
const doanhthuRouter = require("./doanhthu.route");


module.exports = (app) => {
    const Admin = systemConfig.prefixAdmin;
    app.use(Admin + '/dashboard',authMiddleware.requireAuth, dashboardRoutes);

    app.use(Admin + '/hanghoa',authMiddleware.requireAuth, hanhoaRouter);

    app.use(Admin + '/nhacungcap',authMiddleware.requireAuth, nhacungcapRouter);

    app.use(Admin + '/khachhang',authMiddleware.requireAuth, khachhangRouter);

    app.use(Admin + '/hoadon',authMiddleware.requireAuth, hoadonRouter);

    app.use(Admin + '/searchhh',authMiddleware.requireAuth, searchHH);

    app.use(Admin + '/searchkh',authMiddleware.requireAuth, searchKH);

    app.use(Admin + '/account',authMiddleware.requireAuth, accoutRoute);

    app.use(Admin + '/doanhthu',authMiddleware.requireAuth, doanhthuRouter);

    app.use(Admin + '/auth', authRouter);









}