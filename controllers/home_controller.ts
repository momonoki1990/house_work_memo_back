import { Request, Response } from 'express';
import db from '../models/index';
import { format } from 'date-fns';

class HomeController {

  // クエリ関数

  // works取得(ID降順)
  protected static async getWorksInDescOfId() {
    const works = await db.Work.findAll({ order: [['id', 'DESC']], include: db.Category, limit: 10 })
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
    await db.Work.create({ done_date: format(new Date(data.date), 'yyyy/MM/dddd'), CategoryId: data.category, done_hours: data.hours, note: data.note })
      .catch((err: Error) => console.error(err));
  }

  // work削除
  protected static async deleteWork(id: any) {
    await db.Work.destroy({ where: { id: id } })
      .catch((err: Error) => console.error(err));
  }

  
  // コントローラーアクション

  public static async index(req: Request, res: Response) {
    const works = await HomeController.getWorksInDescOfId();
    const categories = await HomeController.getCategories();
    const result = [works, categories];
    res.json(result);
  };

  public static async create(req: Request, res: Response) {
    const data = req.body;
    await HomeController.createWork(data);
    const new_works = await HomeController.getWorksInDescOfId();
    res.json(new_works);
  }

  public static async delete(req: Request, res: Response) {
    const id = req.query.id;
    await HomeController.deleteWork(id);
    const new_works = await HomeController.getWorksInDescOfId();
    res.json(new_works);
  };
};

export default HomeController;