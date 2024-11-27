/**
 * 今年の年度を返す
 * @return thisYear 今年
 */

const thisYear = ():number => {
  const thisYear = new Date().getFullYear();
  return thisYear;
};

export default thisYear;