import { registerables } from "chart.js";
import LibChart from "chart.js/auto";
import type { ChartConfiguration } from "chart.js/auto";

LibChart.register(...registerables);
LibChart.defaults.font.family = "Noto Sans JP";

interface ExtendedChartConfiguration extends ChartConfiguration {
  className?: string;
  width?: number;
  height?: number;
}

/**
 * A Van.js chart component that wraps the Chart.js library.
 */
export const Chart = (config: ExtendedChartConfiguration) => {
  const canvas = document.createElement('canvas');

  // 短絡評価を使用してプロパティをcanvas要素に設定
  config.className && canvas.classList.add(config.className);
  config.width && (canvas.width = config.width, canvas.style.width = `${config.width}px`);
  config.height && (canvas.height = config.height, canvas.style.height = `${config.height}px`);

  // プロパティが指定されている場合はcanvas要素に設定
  // if (config.className) { canvas.classList.add(config.className); }
  // if (config.width) { canvas.width = config.width; }
  // if (config.height) { canvas.height = config.height; }

  const chart = new LibChart(canvas, config);
  return chart.canvas;
}