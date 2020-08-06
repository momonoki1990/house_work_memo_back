import { Request, Response } from 'express';
import { Op } from 'sequelize';
import db from '../models/index';
import { calcEndOfThisAndLastMonth } from '../helpers/controller_helper';

class MonthlyController {

  // クエリ関数

  protected static async getHoursPerCategory(req: Request, res: Response) {

    // クエリパラメータから日付(month)を取得して、前月末日と当月末日を算出
    let [startDate, endDate] = calcEndOfThisAndLastMonth(req);

    // 結果を格納する空配列を用意
    const hours_per_category: Array<object> = [];

    // カテゴリーの数
    const num_of_categories = await db.Category.count()
      .catch((err: Error) => console.error(err));
    
    // db.Category.findAllを配列(categories)に格納
    const categories = await db.Category.findAll()
      .catch((err: Error) => console.error(err));

    // 合計作業時間を計算
    const total_hours = await db.Work.sum('done_hours', { where: { done_date: { [Op.between]: [startDate, endDate] } } })
      .catch((err: Error) => console.error(err));
    
    // month月のカテゴリー別の合計作業時間を取得
    let category_id = 1;
    for (let i = 1; i <= num_of_categories; i++) {
      await db.Work.sum('done_hours', { where: { done_date: { [Op.between]: [startDate, endDate] }, CategoryId: category_id } })
        .then((category_sum: number) => {
          const category_name = categories[category_id - 1].name;
          const category_rate = Math.round((category_sum / total_hours) * 100) || 0;
          
          // 作業時間をidやカテゴリー名・割合と共に配列に格納
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
  
  public static index(req: Request, res: Response) {
    MonthlyController.getHoursPerCategory(req, res);
  };
};

export default MonthlyController;