import express from 'express';
import db from '../models/index';
import { format } from 'date-fns';

class HomeController {

  // クエリ関数

  // works取得(作成日降順)
  protected static async getWorksByCreatedAtDesc() {
    const works = await db.Work.findAll({ order: [['id', 'DESC']], include: db.Category })
      .catch((err: Error) => console.error(err));
    return works;
  }

  // categories取得
  protected static async getCategories() {
    const categories = await db.Category.findAll()
      .catch((err: Error) => console.error(err));
    return categories;
  }

  // work作成
  protected static async createWork(data: any) {
    const new_work = await db.Work.create({ done_date: format(new Date(data.date), 'yyyy/MM/dddd'), CategoryId: data.category, done_hours: data.hours, note: data.note })
    const new_works = await HomeController.getWorksByCreatedAtDesc();
    return new_works;
  }

  // コントローラーアクション

  public static async index(req: express.Request, res: express.Response) {
    const works = await HomeController.getWorksByCreatedAtDesc();
    const categories = await HomeController.getCategories();
    const result = [works, categories];
    res.json(result);
  };

  public static async create(req: express.Request, res: express.Response) {
    const data = req.body;
    const new_works = await HomeController.createWork(data);
    res.json(new_works);
  }
};

export default HomeController;