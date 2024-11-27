// CSSのインポート
import './styles/app.scss'

// VanJS設定
import van from 'vanjs-core'

// データ型をインポート
import type { QuestionApiResponse } from './types/reportQuestion'

// コンポーネントのインポート
import { HeaderQuestion } from './component/HeaderQuestion'
import { MainQuestion } from './component/MainQuestion'
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
// const pageUrl = getParam("p"),
//       pageUrl2 = getParam("h")

// -----------------------------------------------------------------
// API URL変数
// ----------------------------------------------------------------
let chartDataUrl = ""
let wordCloudKougiDataUrl = ""
let wordCloudQuestionDataUrl = ""

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
chartDataUrl = "http://localhost:3100/question"
wordCloudKougiDataUrl = "http://localhost:3100/wordCloudD3_1"
wordCloudQuestionDataUrl = "http://localhost:3100/wordCloudD3_2"

// -----------------------------------------------------------------
//  データの取得と初期化
// ----------------------------------------------------------------
const App = async () => {
  const fetchData: QuestionApiResponse = await fetchJsonData<QuestionApiResponse>(chartDataUrl),
        wordsKougiCloudsAPIData: WordCloudAPIDatasets = await fetchJsonData<WordCloudAPIDatasets>(wordCloudKougiDataUrl),
        wordsQuestionCloudsAPIData: WordCloudAPIDatasets = await fetchJsonData<WordCloudAPIDatasets>(wordCloudQuestionDataUrl)
  if (fetchData) {
    van.add(document.querySelector<HTMLDivElement>('#app')!, HeaderQuestion(fetchData), MainQuestion(fetchData,wordsKougiCloudsAPIData,wordsQuestionCloudsAPIData), Notice(), Footer())
  }
}
(async () => {
  await App()
})()