import express from 'express';


const app: express.Express = express();


// CORS許可
app.use((req: express.Request, res: express.Response, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-with, Content-TypeError, Accept");
  next();
})

// ルーティング
const router: express.Router = express.Router();
router.get('/', (req: express.Request, res: express.Response) => {
  res.json('hello world !!!');
});
app.use(router);

// 待ち受け
app.listen(5000, () => { console.log('server start, listening on port 5000'); });