/**
 * 日付時刻を比較する
 *
 * @param date1 比較する日付時刻
 * @param date2 比較する日付時刻
 * @return boolean date1がdate2より後かどうか
 */
const isComparisonDateAndTime = (date1:Date, date2:Date) => {
  return date1.getTime() > date2.getTime();
}

export default isComparisonDateAndTime;