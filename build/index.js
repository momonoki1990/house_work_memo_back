"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = express_1.default();
// CORS許可
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-with, Content-TypeError, Accept");
    next();
});
// ルーティング
const router = express_1.default.Router();
router.get('/', (req, res) => {
    res.json('hello world !!!');
});
app.use(router);
// 待ち受け
app.listen(5000, () => { console.log('server start, listening on port 5000'); });
