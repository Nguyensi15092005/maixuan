const express = require('express');
const bodyParser = require('body-parser');
const methodOverride = require('method-override')

//flash
const flash = require('express-flash');

// câu lệnh này dùng để dùng dotenv
require("dotenv").config();

// momment fomat thời gian
const moment = require('moment')


const systemConfig = require("./config/system");

const cookieParser = require('cookie-parser');
const session = require('express-session');

//ket noi data
const database = require("./config/database");
database.connect();
const port = process.env.POST || 3003;

//nhung file routes vao
const routeAdmin = require("./routes/admin/index.routes");

// createdoanhthu 0h01
const createDoanhthu = require("./helper/crerateDoanhThu");



const app = express();

// thư viện method-override dùng để gi đè phương thức trong html
app.use(methodOverride('_method'))

// để lấy đc thuộc tính trong req.body
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json())

// flash 
app.use(cookieParser('SISISISISISISI'));
app.use(session({ cookie: { maxAge: 60000 } }));
app.use(flash());
//end flash

createDoanhthu();

app.use(express.static(`${__dirname}/public`));

// App locals Variables
app.locals.prefixAdmin = systemConfig.prefixAdmin;
app.locals.moment = moment;

// cau hinh pug de dung pug
app.set('views', `${__dirname}/views`);
app.set('view engine', 'pug');

// goi Routes
routeAdmin(app);


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})  



// "scripts": {
//     "start": "electron .",
//     "dev": "nodemon index.js",
//     "package": "electron-packager . web-ban-nuoc --platform=win32 --arch=x64 --overwrite --out=dist"
//   },