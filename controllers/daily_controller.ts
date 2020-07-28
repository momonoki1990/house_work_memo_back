import express from 'express';
import { Op } from 'sequelize';
import db from '../models/index';
import { calcEndOfThisAndLastMonth } from '../helpers/controller_helper';

class DailyController {

  // クエリ関数
  protected static async getWorksOfMonthByCreatedAtDesc(req: express.Request, res: express.Response) {
    
    // クエリパラメータから日付(month)を取得して、前月末日と当月末日を算出
    let [startDate, endDate] = calcEndOfThisAndLastMonth(req);

    const works = await db.Work.findAll({ order: [['done_date', 'DESC']], where: { done_date: { [Op.between]: [startDate, endDate] } }, include: db.Category })
      .catch((err: Error) => console.error(err));
    res.json(works);
  }

  // コントローラーアクション
  public static index(req: express.Request, res: express.Response) {
    console.log('DailyController#index')
    DailyController.getWorksOfMonthByCreatedAtDesc(req, res);
  };
};

export default DailyController;