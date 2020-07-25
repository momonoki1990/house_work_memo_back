import express from 'express';
import { Model } from 'sequelize';
import db from './models/index';

const app: express.Express = express();

// CORS許可
app.use((req: express.Request, res: express.Response, next) => {
  res.header("Access-Control-Allow-Origin", process.env.NODE_ENV === 'production' ? "https://sample-react-ts-app.herokuapp.com" : "http://localhost:3000");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-with, Content-TypeError, Accept");
  next();
})

// body-parser関連
app.use(express.json());
app.use(express.urlencoded());

// クエリ関数
async function workAll(res: express.Response) {
  const works = await db.Work.findAll().catch((err: Error) => console.error(err));
  res.json(works);
}

async function worksByCreatedAtDesc(res: express.Response) {
  const works = await db.Work.findAll({order: [['createdAt', 'DESC']]}).catch((err: Error) => console.error(err));
  res.json(works);
}

// ポートの設定
app.set('port', (process.env.PORT || 5000));

// ルーティング
const router: express.Router = express.Router();

router.get('/', (req: express.Request, res: express.Response) => {
  workAll(res);
});

router.get('/home', (req: express.Request, res: express.Response) => {
  worksByCreatedAtDesc(res);
})

app.use(router);

// 待ち受け
app.listen(app.get('port'), () => {
  console.log("Node app is running at port:" + app.get('port'))
});;