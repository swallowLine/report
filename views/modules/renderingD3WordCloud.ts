import * as d3 from 'd3';
import d3Cloud from 'd3-cloud';
import type { WordCloudItem, D3WordCloudDatasets } from '../types/wordCloud'

// 変数
let maxScale:number;
const colorChartArray = ["rgb(56,166,217)", "rgb(255,112,158)", "rgb(195,215,0)"]; // 基本色から彩色。名詞：青、動詞：ピンク、形容詞：黄緑

// 関数
const getWordCloudMaxScale = (data:WordCloudItem[], countMax:number) => {
  let countSum = 0, countArea = 0;
  data.forEach(x => countSum = countSum + (x.key.length * x.value));
  data.forEach(x => countArea = countArea + (x.key.length * x.value * x.value));
  maxScale = Math.sqrt(1200 * 600 / countArea) * 11;
  if (countMax < 13) {
    maxScale = maxScale * 0.55 ;
  }
  if (data.filter(x => x.key.length > 8 && (countMax < 13 ? x.value > 9 : x.value > 18 )).length > 0) {
    maxScale = 100;
  } 
  if (data.filter(x => x.key.length > 10 && (countMax < 13 ? x.value > 9 : x.value > 18)).length > 0) {
    maxScale = 90;
  }
  if (data.filter(x => x.key.length > 12 && (countMax < 13 ? x.value > 9 : x.value > 18)).length > 0) {
    maxScale = 80;
  }
  if (maxScale > 200 && !(data.filter(x => x.value > 4).length > 0)) {
    maxScale = 70;
  }
  return maxScale;
};

// ワードクラウドの描画（プログラム用）
const setWordCloudDataProgram = (data: WordCloudItem[]) => {
  let h = 500;
  let w = 1200;
  let countMax = d3.max(data, d => d.value) ?? 0;
  let maxScale = getWordCloudMaxScale(data, countMax);
  let sizeScale = d3.scaleLinear().domain([0, countMax]).range([10, maxScale]);
  let words = data.map((d) => {
    return { text: d.key, size: sizeScale(d.value), partOfSpeechKbn: d.partOfSpeechKbn };
  });

  // ワードクラウドを描画する div 要素を作成
  const container = document.createElement('div');
  container.className = 'word-cloud-container';

  const draw = (words: D3WordCloudDatasets[]) => {
    // console.log(words);
    d3.select(container)
      .append("svg")
      .attr("viewBox", "0 0 " + w + " " + h)
      .attr("width", "100%")
      .attr("height", "100%")
      .append("g")
      .attr("transform", "translate(" + w / 2 + "," + h / 2 + ")")
      .selectAll("text")
      .data(words)
      .enter()
      .append("text")
      .attr("text-anchor", "middle")
      .style("font-size", (d) => d.size / 2 + "px")
      .style("font-family", "Noto Sans Mono JP")
      .style("fill", (d, i) => colorChartArray[d.partOfSpeechKbn - 1]) // 品詞順
      .transition()
      .duration(500)
      .style("font-size", (d) => d.size + "px")
      .attr("transform", d => "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")")
      .text(d => d.text);
  }

  d3Cloud().size([w, h])
    .words(words)
    .padding(3)
    .rotate(() => 0)
    .font("Noto Sans JP")
    .fontSize(d => d.size ?? 0)
    .on("end", draw)
    .start();

  return container;
};

export default setWordCloudDataProgram;