import { Request, Response } from 'express';
import { Op } from 'sequelize';
import db from '../models/index';
import { calcEndOfThisAndLastMonth } from '../helpers/controller_helper';

class DailyController {

  // クエリ関数

  // works取得(done_date降順→id昇順)
  protected static async getWorksOfMonthInDescOfDoneDate(req: Request, res: Response) {

    // クエリパラメータから日付(month)を取得して、前月末日と当月末日を算出
    let [startDate, endDate] = calcEndOfThisAndLastMonth(req);

    const works = await db.Work.findAll({ order: [['done_date', 'DESC']], where: { done_date: { [Op.between]: [startDate, endDate] } }, include: db.Category })
      .catch((err: Error) => console.error(err));
    
    res.json(works);
  }

  // work削除
  protected static async deleteWork(id: any) {
    await db.Work.destroy({ where: { id: id } })
      .catch((err: Error) => console.error(err));
  }


  // コントローラーアクション

  public static index(req: Request, res: Response) {
    console.log('DailyController#index')
    DailyController.getWorksOfMonthInDescOfDoneDate(req, res);
  };

  public static async delete(req: Request, res: Response) {
    const id = req.query.id;
    await DailyController.deleteWork(id);
    const new_works = await DailyController.getWorksOfMonthInDescOfDoneDate(req, res);
    res.json(new_works);
  };
};

export default DailyController;