import express from 'express';
import { Op } from 'sequelize';
import { startOfMonth, lastDayOfMonth, addDays } from 'date-fns';
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
  
    const hours_per_category: Array<object> = [];
    const categories = await db.Category.count()
      .catch((err: Error) => console.error(err));
    const category_names = JSON.stringify(await db.Category.findAll({ attributes: ['name'] })
      .catch((err: Error) => console.error(err)));
    const category_names_ary = JSON.parse(category_names);
    const total_hours = await db.Work.sum('done_hours', { where: { done_date: { [Op.between]: [startDate, endDate] } } })
      .catch((err: Error) => console.error(err));
    
    let category_id = 1;
    for (let i = 1; i <= categories; i++) {
      await db.Work.sum('done_hours', { where: { done_date: { [Op.between]: [startDate, endDate] }, CategoryId: i } })
        .then((category_sum: number) => {
          const category_name = category_names_ary[category_id - 1].name;
          const category_rate = Math.round((category_sum / total_hours) * 100);
          hours_per_category.push({
            'id': category_id,
            'category_name': category_name,
            'hours': category_sum,
            'rate': category_rate
          });
        })
        .catch((err: Error) => console.error(err));
      category_id++;  
    }
    
    hours_per_category.push({
      'id': category_id,
      'category_name': '合計',
      'hours': total_hours,
      'rate': 100
    });
    res.json(hours_per_category);
  }
  

  // コントローラーアクション
  public static index(req: express.Request, res: express.Response) {
    MonthlyController.hoursPerCategory(req, res);
  };
};

export default MonthlyController;