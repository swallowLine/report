import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);
Chart.defaults.font.family = "Noto Sans JP";

 // Doughnut型のチャートの中心にトータル数を表示
 const chartJsPluginLongLabel = (chartContext:CanvasRenderingContext2D,totalNumber:number) => {
  let labelShown = false;
  return {
    id: 'chartJsPluginLabel',
    afterDatasetsDraw : (chart:Chart) => {
      // afterRender は何度も実行されるので、２回目以降は処理しない
      if (labelShown) {
        return;
      }
      const value = totalNumber;
      // ラベルの HTML
      const labelBox = document.createElement('div');
      labelBox.classList.add('chartLargeTotal');
      labelBox.innerHTML = '<div class="chartTotalNumber">'
        + value
        + '<span class="chartMei">名</span>'
        + '</div>';
      // ラベル描画
      const canvas = chartContext.canvas;
      canvas.parentNode.insertBefore(labelBox, canvas.nextElementSibling);
      labelShown = true;
    },
  }
};

export default chartJsPluginLongLabel;