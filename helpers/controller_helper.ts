import { Request } from 'express';
import { startOfMonth, lastDayOfMonth } from 'date-fns';

// クエリパラメータから日付(month)を取得して、前月末日と当月末日を算出
export function calcEndOfThisAndLastMonth(req: Request) {

  // クエリパラメータから日付(month)を取得
  let startDate: any = req.query.month;

  // 前月末日に変換(DB問い合わせの条件指定で一日繰り上げになる為)
  startDate = startOfMonth(new Date(startDate));
  
  // 再度、クエリパラメータから日付(month)を取得
  let endDate: any = req.query.month;

  // 当月末日に変換
  endDate = lastDayOfMonth(new Date(endDate));

  return [startDate, endDate];
};