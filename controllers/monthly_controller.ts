import express from 'express';
import { Op } from 'sequelize';
import db from '../models/index';
import { calcEndOfThisAndLastMonth } from '../helpers/controller_helper';

class MonthlyController {

  // クエリ関数
  protected static async getHoursPerCategory(req: express.Request, res: express.Response) {

    // クエリパラメータから日付(month)を取得して、前月末日と当月末日を算出
    let [startDate, endDate] = calcEndOfThisAndLastMonth(req);

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
      // month月のカテゴリー別の合計作業時間を取得
      await db.Work.sum('done_hours', { where: { done_date: { [Op.between]: [startDate, endDate] }, CategoryId: i } })
        .then((category_sum: number) => {
          const category_name = category_names_ary[category_id - 1].name;
          const category_rate = Math.round((category_sum / total_hours) * 100);
          // 配列に格納
          hours_per_category.push({
            'id': category_id,
            'name': category_name,
            'hours': category_sum,
            'rate': category_rate
          });
        })
        .catch((err: Error) => console.error(err));
      category_id++;  
    }
    
    // 合計の作業時間を配列の最後に追加
    hours_per_category.push({
      'id': category_id,
      'name': '合計',
      'hours': total_hours,
      'rate': 100
    });
    res.json(hours_per_category);
  }
  
  // コントローラーアクション
  public static index(req: express.Request, res: express.Response) {
    MonthlyController.getHoursPerCategory(req, res);
  };
};

export default MonthlyController;