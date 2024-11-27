// CSSのインポート
import './styles/app.scss'

// VanJS設定
import van from 'vanjs-core'

// データ型をインポート
import type { ApiResponse } from './types/reportApi'

// コンポーネントのインポート
import { HeaderManabi } from './component/HeaderManabi'
import { MainManabi } from './component/MainManabi'
import { Notice } from './component/Notice'
import { Footer } from './component/Footer'

// データ型をインポート
import type { WordCloudAPIDatasets } from './types/wordCloud'

// モジュールのインポート
import {
  getParam,
  fetchJsonData,
  thisYear,
  isComparisonDateAndTime,
  noDataRedirect,
} from "./modules/index"

// -----------------------------------------------------------------
// URLから取得APIを判別する
// -----------------------------------------------------------------
const pageUrl = getParam("p"),
      pageUrl2 = getParam("h")

// -----------------------------------------------------------------
// API URL変数
// ----------------------------------------------------------------
let chartDataUrl = ""
let wordCloudDataUrl = ""

// -----------------------------------------------------------------
//  本番用設定
// -----------------------------------------------------------------

// -----------------------------------------------------------------
//  テスト用設定
// -----------------------------------------------------------------

// -----------------------------------------------------------------
// ローカル用設定
// -----------------------------------------------------------------
// APIエンドポイント
chartDataUrl = "http://localhost:3100/manabi";
wordCloudDataUrl = "http://localhost:3100/wordCloudD3_5";

// -----------------------------------------------------------------
//  データの取得と初期化
// ----------------------------------------------------------------
const App = async () => {
  const fetchData: ApiResponse = await fetchJsonData<ApiResponse>(chartDataUrl),
        wordsCloudsAPIData: WordCloudAPIDatasets = await fetchJsonData<WordCloudAPIDatasets>(wordCloudDataUrl);
  if (fetchData) {
    van.add(document.querySelector<HTMLDivElement>('#app')!, HeaderManabi(fetchData), MainManabi(fetchData,wordsCloudsAPIData), Notice(), Footer())
  }
}
(async () => {
  await App()
})()