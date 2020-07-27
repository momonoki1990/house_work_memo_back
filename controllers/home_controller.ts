import express from 'express';
import db from '../models/index';

class HomeController {

  // クエリ関数
  public static async worksByCreatedAtDesc(res: express.Response) {
    const works = await db.Work.findAll({ order: [['createdAt', 'DESC']], include: db.Category })
      .catch((err: Error) => console.error(err));
    res.json(works);
  }

  // コントローラーアクション
  public static index(req: express.Request, res: express.Response) {
    HomeController.worksByCreatedAtDesc(res);
  };
};

export default HomeController;