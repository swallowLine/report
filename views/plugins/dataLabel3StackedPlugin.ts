import { ChartConst } from '../data/chart.data';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);
Chart.defaults.font.family = "Noto Sans JP";


// 積み上げ(3つ)横棒グラフ
const dataLabel3StackedPlugin = () => {
  let labelShown = false;
  return {
    id: 'dataLabel3StackedPlugin',
    afterDatasetsDraw: (chart:Chart) => {
      // afterRender は何度も実行されるので、２回目以降は処理しない
      if (labelShown) {
        return;
      }
      let strings: string[] = [];
      let numberX: number[] = [];
      chart.data.datasets.forEach((dataset, i) => {
        const meta = chart.getDatasetMeta(i);
        if (!meta.hidden) {
          meta.data.forEach((element, index) => {
            let position = element.tooltipPosition();
            strings.push(dataset.data[index]?.toString() + "名");
            numberX.push(position.x);
          });
        }
      });
      // ラベルの HTML
      const labelBox1 = document.createElement('div');
      labelBox1.classList.add('chartBarBox');
      labelBox1.innerHTML = '<span>'
        + strings[0]
        + '</span></div>';
      const labelBox2 = document.createElement('div');
      labelBox2.classList.add('chartBarBox');
      labelBox2.innerHTML = '<span>'
        + strings[1]
        + '</span></div>';
      const labelBox3 = document.createElement('div');
      labelBox3.classList.add('chartBarBoxLast');
      labelBox3.innerHTML = '<span>'
        + strings[2]
        + '</span></div>';
      // ラベル描画
      const canvas = chart.ctx.canvas;
      setTimeout(() => {
        if (canvas.parentNode) {
          if (strings[2] !== "0名") canvas.parentNode.insertBefore(labelBox3, canvas.nextElementSibling);
          if (strings[1] !== "0名") canvas.parentNode.insertBefore(labelBox2, canvas.nextElementSibling);
          if (strings[0] !== "0名") canvas.parentNode.insertBefore(labelBox1, canvas.nextElementSibling);
        }
        if (numberX[0] > labelBox1.clientWidth) {
          labelBox1.style.left = ((0 + numberX[0]) / 2 - labelBox1.clientWidth / 2) / ChartConst.chartWidth * 100 + "%";
        } else {
          labelBox1.style.left = 1 + "%";
        }

        labelBox2.style.left = ((numberX[0] + numberX[1]) / 2 - labelBox2.clientWidth / 2) / ChartConst.chartWidth * 100 + "%";
        labelBox3.style.left = ((numberX[1] + numberX[2]) / 2) / ChartConst.chartWidth * 100 + "%";
        labelShown = true;
      }, (1 * 300));
    },
  }
};

export default dataLabel3StackedPlugin;