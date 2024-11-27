// VanJS設定
import van from 'vanjs-core'
const {dd, div, dl, dt, img, main, p, section, span, br, h2, h3, h4} = van.tags

// データ型をインポート
import type { ApiResponse } from '../types/reportApi'
import type { WordCloudAPIDatasets } from '../types/wordCloud'

// モジュールをインポート
import {
  getParam,
} from "../modules/index";
// コンポーネントをインポート
import { 
  TableRows, TableRatingRows, renderCircle, render3Bar, render4Bar, 
  GetRatingList, wordsCloudsAPIDataExists, liveKikkakeExists, 
  wordsCloud,StudentMessage, MessageRows 
} from "./common";

// -----------------------------------------------------------------
// URLから取得APIを判別する
// -----------------------------------------------------------------
const pageUrl = getParam("p"),
      pageUrl2 = getParam("h");

// -----------------------------------------------------------------
// コンポーネント
// ----------------------------------------------------------------
export const MainOnline = (
  reportData: ApiResponse,
  wordsCloudsAPIData: WordCloudAPIDatasets,
) => main({class: "l-main printFitInRangeMain"},
  section(
    h2({class: "l-main__heading"},
      span({class: "l-main__title"},
        "大学別説明会 実施結果レポート",
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
      "貴学の「大学別説明会」の参加者数とアンケートの集計結果、「ご担当者へのメッセージ」等を報告いたします",
      br(),
      "ご査収の程よろしくお願いいたします。",
    )
    : 
    p({class: "l-main__thanks"},
      "この度は「夢ナビライブ」にご協力を賜り誠にありがとうございました。",
      br(),
      "貴学の「オンライン説明会」の参加者数とアンケートの集計結果、「ご担当者へのメッセージ」等を報告いたします。",
      br(),
      "ご査収の程よろしくお願いいたします。",
      br(),
      "なお、この報告書の「ご担当者へのメッセージ」「参加のきっかけ」「質問」は、高校生が登録した原文をそのまま掲載しています。",
      br(),
      "メッセージの中に個人情報が含まれる場合があること、および高等学校名を表示しているため、今回の報告書をそのまま貴学サイトなどにリンクすることは",
      br(),
      "お控えください。",
      br(),
      "リンクをご希望の際は、メッセージ内の個人情報や高等学校名等を消去した別のURLを準備いたします。弊社営業担当までご連絡ください。",
    ),
    h3({class: "l-main__subHeading -Center"},"大学別説明会",),
    div({class: "l-main__twoColums printInsideFirefoxOnly"},
      div(
        div({class: "-Separate"},
          h4({class: "l-main__ratioHeading"},"大学別説明会 参加者数",),
          TableRows(reportData.attendance),
        ),
        renderCircle(reportData, (data) => data.attendance?.[0]),
        render3Bar(reportData,(data) => data.gender?.[0], "参加者 男女比"),
      ),
      div(
        div({class: "-Separate"},
          h4({class: "l-main__ratioHeading"},"アンケート回答者数",),
          TableRows(reportData.respondent),
        ),
        div({class: "-Separate"},
          h4({class: "l-main__ratioHeading"},"アンケート回答結果",),
          dl({ class: "l-main__interest" },
            dt("Q."),
            dd({ class: "-Question" }, "大学別説明会に参加して、関心は高まりましたか？")
          ),
          TableRatingRows(reportData.enquete),
          GetRatingList(),
          reportData.enquete?.[0]?.data ? render4Bar(reportData.enquete[0].data) : null,
        ),
      )
    )
  ),

  wordsCloudsAPIDataExists(wordsCloudsAPIData)
  ? wordsCloud(wordsCloudsAPIData, "大学別説明会")
  : null,

  section(
    MessageRows(reportData, 'message', "大学別説明会 ご担当者へのメッセージ")
  ),

  liveKikkakeExists(reportData)
  ? StudentMessage("print__newLine",reportData.kikkake,"大学別説明会 参加のきっかけ")
  : null,

  StudentMessage("print__newLine",reportData.question,"大学別説明会 質問")
)
