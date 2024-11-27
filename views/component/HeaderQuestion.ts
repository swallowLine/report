// VanJS設定
import van from 'vanjs-core'
const {a, div, h1, h2, header, img, span} = van.tags

// データ型をインポート
import type { QuestionApiResponse } from '../types/reportQuestion'

// 夢ナビ講義 研究室訪問 存在チェック
const questionExists = (reportData: QuestionApiResponse) => {
  if (reportData) {
    return reportData.hasOwnProperty("questionAttendance");
  }
}

// -----------------------------------------------------------------
// コンポーネント
// ----------------------------------------------------------------
export const HeaderQuestion = (reportData:QuestionApiResponse) => header({class: "l-header"},
  div({class: "l-header__inner"},
    questionExists(reportData)
    ? 
    h2(
      span(`${reportData.univName}`,),
      span(`${reportData.profName} 先生`,),
      span(`${reportData.title}`,),
    )
    : 
    h2(
      span(`${reportData.univName}　${reportData.profName} 先生`,),
      span(`${reportData.title}`,),
    ),
    h1(
      a({href: "https://liveweb.yumenavi.info/", target: "_blank", rel: "noopener noreferrer"},
        img({class: "l-header__logo", src: "/images/logo-live2024.svg", alt: "夢ナビライブ"}),
      ),
    ),
  ),
)
