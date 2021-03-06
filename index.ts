import express from 'express';
import HomeController from './controllers/home_controller';
import MonthlyController from './controllers/monthly_controller';
import DailyController from './controllers/daily_controller';
const app: express.Express = express();

// CORS許可
app.use((req: express.Request, res: express.Response, next) => {
  res.header("Access-Control-Allow-Origin", process.env.NODE_ENV === 'production' ? "https://house-work-memo-front.herokuapp.com" : "http://localhost:3000");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-with, Content-TypeError, Accept, Content-Type");
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, DELETE')
  next();
})

// body-parser関連
app.use(express.json());
app.use(express.urlencoded());

// ポートの設定
app.set('port', (process.env.PORT || 5000));

// ルーティング
const router: express.Router = express.Router();

router.get('/home', HomeController.index);

router.post('/home', HomeController.create);

router.delete('/home', HomeController.delete);

router.get('/monthly', MonthlyController.index);

router.get('/daily', DailyController.index);

router.delete('/daily', DailyController.delete);

app.use(router);

// 待ち受け
app.listen(app.get('port'), () => {
  console.log("Node app is running at port:" + app.get('port'))
});;