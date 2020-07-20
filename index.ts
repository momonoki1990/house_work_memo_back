import express from 'express';

const app: express.Express = express();

// CORS許可
app.use((req: express.Request, res: express.Response, next) => {
  res.header("Access-Control-Allow-Origin", process.env.NODE_ENV === 'production' ? "https://sample-react-ts-app.herokuapp.com" : "http://localhost:3000");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-with, Content-TypeError, Accept");
  next();
})

// ポートの設定
app.set('port', (process.env.PORT || 5000));

// ルーティング
const router: express.Router = express.Router();
router.get('/', (req: express.Request, res: express.Response) => {
  res.json('hello world !!!');
});
app.use(router);

// 待ち受け
app.listen(app.get('port'), () => {
  console.log("Node app is running at port:" + app.get('port'))
});;