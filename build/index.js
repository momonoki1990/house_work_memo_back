"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const index_1 = __importDefault(require("./models/index"));
const app = express_1.default();
// CORS許可
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", process.env.NODE_ENV === 'production' ? "https://sample-react-ts-app.herokuapp.com" : "http://localhost:3000");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-with, Content-TypeError, Accept");
    next();
});
// body-parser関連
app.use(express_1.default.json());
app.use(express_1.default.urlencoded());
// クエリ関数
async function workAll(res) {
    const works = await index_1.default.Work.findAll().catch((err) => console.error(err));
    res.json(works);
}
async function worksByCreatedAtDesc(res) {
    const works = await index_1.default.Work.findAll({ order: [['createdAt', 'DESC']] }).catch((err) => console.error(err));
    res.json(works);
}
// ポートの設定
app.set('port', (process.env.PORT || 5000));
// ルーティング
const router = express_1.default.Router();
router.get('/', (req, res) => {
    workAll(res);
});
router.get('/home', (req, res) => {
    worksByCreatedAtDesc(res);
});
app.use(router);
// 待ち受け
app.listen(app.get('port'), () => {
    console.log("Node app is running at port:" + app.get('port'));
});
;
