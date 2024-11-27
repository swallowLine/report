// VanJS設定
import van from 'vanjs-core'
const {dd, div, dl, dt, img, main, p, section, span, br, h2, h3, h4, table, tbody, td, th, thead, tr, li, ul} = van.tags

// データ型をインポート
import type { QuestionApiResponse } from '../types/reportQuestion'
import type { Respondent, LabelsData, Message } from '../types/reportCommon'
import type { WordCloudAPIDatasets } from '../types/wordCloud'

// モジュールをインポート
import {
  getParam,
  renderingD3WordCloud,
} from "../modules/index";

// コンポーネントをインポート
import { TableRows, GetRatingList, renderCircle, render3Bar, render4Bar, wordsCloudsAPIDataExists } from "./common";

// -----------------------------------------------------------------
// URLから取得APIを判別する
// -----------------------------------------------------------------
const pageUrl = getParam("p"),
      pageUrl2 = getParam("h");

/**
 * レポートデータに質問に関するデータが存在するかどうかを確認する関数
 *
 * @param reportData - QuestionApiResponse型のレポートデータ
 * @returns boolean - "questionAttendance" プロパティが存在する場合は true、それ以外の場合は false
 */
const questionExists = (reportData: QuestionApiResponse): boolean => {
  if (reportData) {
    return reportData.hasOwnProperty("questionAttendance");
  }
  return false;
}

/**
 * reportData に liveMessage が存在し、その配列の長さが 0 より大きいかをチェックする関数。
 * @param reportData - QuestionApiResponse 型のデータ。
 * @returns liveMessage が存在し、長さが 0 より大きければ true を返す。そうでなければ false を返す。
 */
const liveMessageExists = (reportData: QuestionApiResponse): boolean => {
  if (reportData && reportData.liveMessage) {
    return reportData.liveMessage.length > 0 || false;
  }
  return false;
}

// ----------------------------------------------------------------
// チャート
// ---------------------------------------------------------------
const renderQuestionnaire = (
  fetchData: QuestionApiResponse,
  getRespondentData: (data: QuestionApiResponse) => Respondent[],
  getEnqueteData: (data: QuestionApiResponse) => LabelsData | undefined,
  questionText: string
) => {
  const respondentData = getRespondentData(fetchData);
  const enqueteData = getEnqueteData(fetchData)?.data ?? [];
  const enqueteSum = enqueteData.reduce(
    (accumulator, current) => (accumulator ?? 0) + (current ?? 0),
    0
  );
  const totalSum: number = enqueteSum ?? 0;
  return [
    div({ class: "-Separate print__newLine" },
      h4({ class: "l-main__ratioHeading" }, "アンケート回答者数"),
      TableRows(respondentData)
    ),
    div({ class: "-Separate print__newLine" },
      h4({ class: "l-main__ratioHeading" }, "アンケート回答結果"),
      dl({ class: "l-main__interest" },
        dt("Q."),
        dd({ class: "-Question" }, questionText)
      ),
      GetRatingList(),
      render4Bar(enqueteData),
    )
  ];
};

// -----------------------------------------------------------------
// テーブルをトグル表示+リスト表示
// -----------------------------------------------------------------
const ToggleRowsGeneric = (reportData: QuestionApiResponse, messagesKey: keyof QuestionApiResponse, headingText: string) => {
  const messages = reportData[messagesKey] as { content: string, speaker: string }[] | undefined;
  const isOpen = van.state(true);
  const handleToggle = () => isOpen.val = !isOpen.val;
  const hiddenRowStyle = () => isOpen.val ? '' : 'display: none';
  const byGradeClass = () => isOpen.val ? 'l-main__subHeading -Toggle -StateOpen' : 'l-main__subHeading -Toggle';
  return (
    section(
      h3({ className: byGradeClass, onclick: handleToggle }, headingText,
        span({ class: "-Close" }, "テキストを閉じる")
      ),
      messages && messages.map((message) => {
        return (
          ul({ class: "l-main__list", style: hiddenRowStyle },
            li(message.content,
              span(
                `（${message.speaker}）`
              )
            )
          )
        )
      })
    )
  );
};

// ----------------------------------------------------------------
// ワードクラウド
// ----------------------------------------------------------------
const wordsKougiCloud = (reportkougiWordCloudDatas: WordCloudAPIDatasets,reportData: QuestionApiResponse) => {
  const { info } = reportkougiWordCloudDatas;
  return (
    [
      section({class: "print__newLine"},
        h3({class: "l-main__subHeading -IsWordCloud"},"「夢ナビ講義動画 先生へのメッセージ」をワードクラウドで表現",),
        p({class: "wordCloudExplain"},
          "メッセージのテキストデータを視覚的に自動で表現しています。名詞、形容詞、動詞を対象に出現頻度が高い単語を選び出し、頻度が多いほど大きく表示されています。",
          br(),
          "文字の色は品詞により分けています。青色が名詞、赤色が動詞、黄緑色が形容詞を表しています。",
        ),
        renderingD3WordCloud(info),
      ),
      section(
        ToggleRowsGeneric(reportData, 'liveMessage', "夢ナビ講義動画 先生へのメッセージ")
      ),
    ]
  )
}

const wordsQuestionCloud = (reportQuestionWordCloudDatas: WordCloudAPIDatasets,reportData: QuestionApiResponse) => {
  const { info } = reportQuestionWordCloudDatas;
  return (
    [
      section({class: "print__newLine"},
        h3({class: "l-main__subHeading -IsWordCloud"},"「夢ナビ講義 研究室訪問 先生へのメッセージ」をワードクラウドで表現",),
        renderingD3WordCloud(info),
      ),
      section(
        ToggleRowsGeneric(reportData, 'questionMessage', "夢ナビ講義 研究室訪問 先生へのメッセージ")
      ),
    ]
  )
}

// -----------------------------------------------------------------
// メッセージ
// ----------------------------------------------------------------
const StudentMessage = (StudentMessageData: Message[] | null, messageTitle: string) => {
  return (
    section({class: "print__newLine"},
      h3({class: "l-main__subHeading"},messageTitle),
      ul({class: "l-main__list"},
        StudentMessageData && StudentMessageData.map((message) => {
          return (
            li(
              message.content,
              span(
                `（${message.speaker}）`
              ),
            )
          )
        })
      ),
    )
  )
}

// -----------------------------------------------------------------
// ミッションありメッセージ
// ----------------------------------------------------------------
// const StudentMissionMessage = (StudentMissionMessageData: Message[] | null, missionTitle: string | null) => {
//   return (
//     section({class: "print__newLine"},
//       h3({class: "l-main__subHeading"},"先生からのMission"),
//       div({class: "missionWrapper"},
//         img({class: "missionImage", src: "images/missionFlag.svg", alt: "Mission"}),
//         p({class: "missionTeacherFrom"},missionTitle),
//       ),
//       ul({class: "l-main__list"},
//         StudentMissionMessageData && StudentMissionMessageData.map((message) => {
//           return (
//             li(
//               message.content,
//               span(
//                 `（${message.speaker}）`
//               ),
//             )
//           )
//         })
//       ),
//     )
//   )
// }

// -----------------------------------------------------------------
// コンポーネント
// ----------------------------------------------------------------
export const MainQuestion = (
  reportData: QuestionApiResponse,
  wordsKougiCloudsAPIData: WordCloudAPIDatasets,
  wordsQuestionCloudsAPIData: WordCloudAPIDatasets
) => main({class: "l-main printFitInRangeMain"},
  section(
    h2({class: "l-main__heading"},
      span({class: "l-main__title"},
        "夢ナビ講義 研究室訪問 実施結果レポート",
      ),
      div(
        img({class: "l-main__frompage", src: "images/logo-frompage.svg", alt: "Frompage"}),
      ),
    ),
    p({class: "l-main__published"},
      `${reportData.publishDate} 発行`,
    ),
    pageUrl2
    ? 
    p({class: "l-main__thanks"},
      "この度は「夢ナビライブ」にご協力を賜り誠にありがとうございました。",
      br(),
      "先生の「夢ナビ講義動画」視聴者数",
      questionExists(reportData)
      ? span("及び「夢ナビ講義 研究室訪問」",)
      : null,
      "の参加者数とアンケートの集計結果、「先生へのメッセージ」等を報告いたします。",
      br(),
      "ご査収の程よろしくお願いいたします。",
    )
    : 
    p({class: "l-main__thanks"},
      "この度は「夢ナビライブ」にご協力を賜り誠にありがとうございました。",
      br(),
      "先生の「夢ナビ講義動画」視聴者数",
      questionExists(reportData)
      ? span("及び「夢ナビ講義 研究室訪問」",)
      : null,
      "の参加者数とアンケートの集計結果、「先生へのメッセージ」等を報告いたします。",
      br(),
      "ご査収の程よろしくお願いいたします。",
      br(),
      "なお、この報告書の「先生へのメッセージ」「参加のきっかけ」「質問」は、高校生が登録した原文をそのまま掲載しています。",
      br(),
      "メッセージの中に個人情報が含まれる場合があること、および高等学校名を表示しているため、",
      br(),
      "今回の報告書をそのまま貴学サイトなどにリンクすることはお控えください。",
      br(),
      "リンクをご希望の際は、メッセージ内の個人情報や高等学校名等を消去した別のURLを準備いたします。弊社営業担当までご連絡ください。",
    ),
    !questionExists(reportData) ? h3({class: "l-main__subHeading -Center"},"夢ナビ講義動画",): null,
    div({class: "l-main__twoColums"},
      div(
        questionExists(reportData) ? h3({class: "l-main__subHeading"},"夢ナビ講義動画",): null,
        div({class: "-Separate"},
          h4({class: "l-main__ratioHeading"},"夢ナビ講義動画 視聴者数",),
          TableRows(reportData.liveAttendance),
        ),
        renderCircle(reportData, (data) => data.liveAttendance?.[0]),
        render3Bar(reportData,(data) => data.liveGender?.[0], "視聴者 男女比"),
        questionExists(reportData) ? 
        renderQuestionnaire(reportData,data => data.liveRespondent ?? [], data => data.liveEnquete?.[0],"夢ナビ講義動画を視聴してその学問への関心は高まりましたか？")
        : null,
      ),
      div(
        questionExists(reportData) ? h3({class: "l-main__subHeading"},"夢ナビ講義 研究室訪問",): null,
        div({class: "-Separate"},
          h4({class: "l-main__ratioHeading"},"夢ナビ講義 研究室訪問 参加者数",),
          TableRows(reportData.questionAttendance),
        ),
        renderCircle(reportData, (data) => data.questionAttendance?.[0]),
        render3Bar(reportData,(data) => data.questionGender?.[0], "参加者 男女比"),
        questionExists(reportData) ? 
        renderQuestionnaire(reportData,data => data.questionRespondent ?? [], data => data.questionEnquete?.[0],"夢ナビ講義 研究室訪問に参加してその学問への関心は高まりましたか？")
        : null,
      )
    )
  ),

  liveMessageExists(reportData) && wordsCloudsAPIDataExists(wordsKougiCloudsAPIData)
  ? wordsKougiCloud(wordsKougiCloudsAPIData, reportData)
  : liveMessageExists(reportData)
  ? section(ToggleRowsGeneric(reportData, 'liveMessage', "夢ナビ講義動画 先生へのメッセージ"))
  : null,

  questionExists(reportData) && wordsCloudsAPIDataExists(wordsQuestionCloudsAPIData)
  ? wordsQuestionCloud(wordsQuestionCloudsAPIData, reportData)
  : questionExists(reportData)
  ? section(ToggleRowsGeneric(reportData, 'questionMessage', "夢ナビ講義 研究室訪問 先生へのメッセージ"))
  : null,

  questionExists(reportData)
  ? 
  [
    StudentMessage(reportData.kikkake,"夢ナビ講義 研究室訪問 参加のきっかけ"),
    StudentMessage(reportData.question,"夢ナビ講義 研究室訪問 質問")
  ]
  : null,
)
