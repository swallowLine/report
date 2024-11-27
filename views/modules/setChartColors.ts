import { ChartConst } from '../data/chart.data';

/**
  * トップタグクラウドの色の設定をランダムにする
  * 
  * @param wordLength 色種類の長さ(length)
  * @return setColors ランダムな色指定
*/
const setChartColors = (wordLength:number):string[] => {
  const setColors = [];
  for (let i = 0; i < wordLength; i++){
    setColors.push(ChartConst.colorChartArray[Math.floor(Math.random() * ChartConst.colorChartArray.length)]);
  }
  return setColors;
}

export default setChartColors;