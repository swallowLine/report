// データ型を指定
export type WordCloudItem = {
  key: string;
  value: number;
  partOfSpeechKbn: number;
};

// 全体の JSON データの型定義
export type WordCloudAPIDatasets = {
  info: WordCloudItem[];
};

export type D3WordCloudDatasets = {
  text: string;
  value: number;
  font: string;
  style: "normal";
  weight: "normal";
  rotate: number;
  size: number;
  padding: number;
  width: number;
  height: number;
  xoff: number;
  yoff: number;
  x1: number;
  y1: number;
  x0: number;
  y0: number;
  hasText: true;
  x: number;
  y: number;
  partOfSpeechKbn: number;
};
