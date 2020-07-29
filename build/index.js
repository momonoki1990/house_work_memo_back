"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const home_controller_1 = __importDefault(require("./controllers/home_controller"));
const monthly_controller_1 = __importDefault(require("./controllers/monthly_controller"));
const daily_controller_1 = __importDefault(require("./controllers/daily_controller"));
const app = express_1.default();
// CORS許可
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", process.env.NODE_ENV === 'production' ? "https://house-work-memo-front.herokuapp.com" : "http://localhost:3000");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-with, Content-TypeError, Accept, Content-Type");
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, DELETE');
    //res.header('Content-Type', 'application/json, charset=utf-8')
    next();
});
// body-parser関連
app.use(express_1.default.json());
app.use(express_1.default.urlencoded());
// ポートの設定
app.set('port', (process.env.PORT || 5000));
// ルーティング
const router = express_1.default.Router();
router.get('/home', home_controller_1.default.index);
router.post('/home', home_controller_1.default.create);
router.delete('/home', home_controller_1.default.delete);
router.get('/monthly', monthly_controller_1.default.index);
router.get('/daily', daily_controller_1.default.index);
router.delete('/daily', daily_controller_1.default.delete);
app.use(router);
// 待ち受け
app.listen(app.get('port'), () => {
    console.log("Node app is running at port:" + app.get('port'));
});
;
