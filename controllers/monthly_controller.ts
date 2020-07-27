import express from 'express';
import { Op } from 'sequelize';
import { startOfMonth, lastDayOfMonth } from 'date-fns';
import db from '../models/index';

class MonthlyController {

  // クエリ関数
  public static async hoursPerCategory(req: express.Request, res: express.Response) {

    let startDate: any = req.query.month;
    // 前月末日に変換(DB問い合わせの条件指定で一日繰り上げになる為)
    startDate = startOfMonth(new Date(startDate));
    let endDate: any = req.query.month;
    // 当月末日に変換
    endDate = lastDayOfMonth(new Date(endDate));
    console.log(startDate, endDate);

    const hours: Array<any/*{ [id: number]: number }*/> = await [1, 2, 3, 4].map((id: number) => {
      db.Work.findAll({ where: { done_date: { [Op.between]: [startDate, endDate] } } })
        //.sum('done_hours', /*{ where: { CategoryId: id } }*/)
        .then((result: number) => {
          //const hours_per_category: number = result;
          //return { id: hours_per_category }
          return 'hello';
        })
        .catch ((err: Error) => console.error(err));
    })
    res.json(hours);
  }
  

  // コントローラーアクション
  public static index(req: express.Request, res: express.Response) {
    MonthlyController.hoursPerCategory(req, res);
  };
};

export default MonthlyController;