// VanJS設定
import van from 'vanjs-core'
const {table, tbody, td, th, thead, tr, li, ul, div, h4, section, span, h3, p, br} = van.tags

import type { Nullable, Respondent, LabelsData, Message } from '../types/reportCommon'
import type { ApiResponse } from '../types/reportApi'
import type { WordCloudAPIDatasets } from '../types/wordCloud'

// モジュールをインポート
import { Chart } from "../modules/chart";
import { ChartConst } from "../data/chart.data";
import {
  renderingD3WordCloud
} from "../modules/index";
import { chartOptions } from "../options/index";
import {
  chartJsPluginLabel,
  dataLabel3StackedPlugin,
  dataLabel4StackedPlugin,
} from "../plugins/index";

// -----------------------------------------------------------------
// 汎用テーブル
// -----------------------------------------------------------------
export const TableRows = (TableData: Respondent[] | null) => {
  return (
    TableData && TableData?.map((live) => {
      return (
        table({class: "l-main__table"},
          thead(
            tr(
              th({class: "-Sum", rowspan: "2"},"合 計",),
              th({class: "-BrDown", colspan: "5"},"学年別内訳",),
            ),
            tr(
              td({class: "-BrDown"},`${live.labels?.[0] ?? ''}`),
              td({class: "-BrDown"},`${live.labels?.[1] ?? ''}`),
              td({class: "-BrDown"},`${live.labels?.[2] ?? ''}`),
              td({class: "-BrDown"},`${live.labels?.[3] ?? ''}`),
              td({class: "-BrDown"},`${live.labels?.[4] ?? ''}`),
            ),
          ),
          tbody(
            tr(
              td(`${live.total}名`),
              td(`${live.data && live.data[0]}名`),
              td(`${live.data && live.data[1]}名`),
              td(`${live.data && live.data[2]}名`),
              td(`${live.data && live.data[3]}名`),
              td(`${live.data && live.data[4]}名`),
            ),
          ),
        )
      )
    })
  )
}

// -----------------------------------------------------------------
// 評価(サイコー、スキかも、イイネ、まあまあ)テーブル
// ----------------------------------------------------------------
export const TableRatingRows = (TableData: Nullable<LabelsData[]>) => {
  return (
    TableData && TableData?.map((enquete) => {
      return (
        table({class: "l-main__tableInterest"},
          thead(
            tr(
              th({class: "-BrDown"},`${enquete.labels?.[0] ?? ''}`),
              th({class: "-BrDown"},`${enquete.labels?.[1] ?? ''}`),
              th({class: "-BrDown"},`${enquete.labels?.[2] ?? ''}`),
              th({class: "-BrDown"},`${enquete.labels?.[3] ?? ''}`),
            ),
          ),
          tbody(
            tr(
              td(`${enquete.data && enquete.data[0]}名`),
              td(`${enquete.data && enquete.data[1]}名`),
              td(`${enquete.data && enquete.data[2]}名`),
              td(`${enquete.data && enquete.data[3]}名`),
            ),
          ),
        )
      )
    })
  )
}

// -----------------------------------------------------------------
// 学年
// ----------------------------------------------------------------
const GradeList = () => {
  return (
    ul({class: "canvasCharList"},
      li("高1生"),
      li("既卒生"),
      li("高2生"),
      li("その他"),
      li("高3生"),
    )
  )
}

// -----------------------------------------------------------------
// 評価(サイコー、スキかも、イイネ、まあまあ)
// ----------------------------------------------------------------
export const GetRatingList = () => {
  return (
    ul({ class: "l-main__ratioInterest" },
      li("サイコー"),
      li("スキかも"),
      li("イイネ"),
      li("まあまあ"),
    )
  )
}

// ----------------------------------------------------------------
// チャート
// ----------------------------------------------------------------
export const renderCircle = <T>(
  fetchData: T,
  getData: (data: T) => Respondent | undefined,
) => {
  const chartData = getData(fetchData);
  const data = chartData?.data ?? [];
  const labels = chartData?.labels ?? [];
  const total = chartData?.total ?? 0;
  return (
    div({class: "canvasChartFlexWrapper -Separate"},
      div({class: "-CenterContent"},
        div({class: "canvasWrapper"},
          Chart({
            type: "doughnut",
            data: {
              datasets: [
                {
                  data,
                  backgroundColor: ChartConst.chartBackgroundColor,
                },
              ],
              labels,
            },
            options: chartOptions,
            plugins: [chartJsPluginLabel(total)],
            width: 260,
            height: 260
          })
        ),
        GradeList()
      ),
    )
  );
};

export const render3Bar = <T>(
  fetchData: T,
  getData: (data: T) => LabelsData | undefined,
  title: string
) => {
  const chartData = getData(fetchData);
  const data = chartData?.data ?? [];
  const dataTotalSum = (data ?? []).reduce(
    (accumulator, current) => (accumulator ?? 0) + (current ?? 0),
    0
  );
  const totalSum: number = dataTotalSum ?? 0;
  return (
    div({class: "-Separate"},
      h4({class: "l-main__ratioHeading"}, title),
      ul({class: "l-main__ratioSupplement"},
        li("男性"),
        li("女性"),
        li("未選択"),
      ),
      div({class: "canvasWrapper"},
        Chart({
          type: "bar",
          data: {
            labels: [""],
            datasets: ChartConst.chartBar3StackedDatasets(
              data[0] ?? 0,
              data[1] ?? 0,
              data[2] ?? 0
            ),
          },
          options: {
            indexAxis: "y",
            maintainAspectRatio: false,
            responsive: false,
            layout: {
              padding: {
                left: -10,
              },
            },
            plugins: {
              legend: {
                display: false,
              },
              tooltip: {
                enabled: false,
              },
              title: {
                display: false,
              },
            },
            scales: {
              x: {
                stacked: true,
                beginAtZero: true,
                min: 0,
                max: totalSum,
                grid: {
                  display: false,
                  drawBorder: false,
                },
                ticks: {
                  display: false,
                }, 
              },
              y: {
                stacked: true,
                beginAtZero: true,
                grid: {
                  display: false,
                  drawBorder: false,
                },
                ticks: {
                  display: false,
                },
              },
            },
            animation: false,
            events: [],
          },
          plugins: [dataLabel3StackedPlugin()],
          className: 'canvasQuestionPrint',
          width: ChartConst.chartWidth,
          height: 100,
        })
      ),
    )
  );
};

export const render4Bar = (
  enqueteData: Nullable<number>[]
) => {
  // null 値を 0 に変換
  const normalizedData = enqueteData.map(value => value ?? 0);
  const totalSum = normalizedData.reduce((accumulator, current) => accumulator + current, 0);
  
  return div({ class: "canvasWrapper" },
    Chart({
      type: "bar",
      data: {
        labels: [""],
        datasets: ChartConst.chartBar4StackedDatasets(
          normalizedData[0],
          normalizedData[1],
          normalizedData[2],
          normalizedData[3]
        ),
      },
      options: {
        indexAxis: "y",
        maintainAspectRatio: false,
        responsive: false,
        layout: {
          padding: {
            left: -10,
          },
        },
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            enabled: false,
          },
          title: {
            display: false,
          },
        },
        scales: {
          x: {
            stacked: true,
            beginAtZero: true,
            min: 0,
            max: totalSum,
            grid: {
              display: false,
              drawBorder: false,
            },
            ticks: {
              display: false,
            },
          },
          y: {
            stacked: true,
            beginAtZero: true,
            grid: {
              display: false,
              drawBorder: false,
            },
            ticks: {
              display: false,
            },
          },
        },
        animation: false,
        events: [],
      },
      plugins: [dataLabel4StackedPlugin()],
      width: ChartConst.chartWidth,
      height: 100
    })
  );
};

/**
 * ワードクラウドAPIData が存在し、その配列の長さが 0 より大きいかをチェックする関数。
 * @param wordsCloudsAPIData - WordCloudAPIDatasets 型の配列。
 * @returns 配列が存在し、長さが 0 より大きければ true を返す。そうでなければ false を返す。
 */
export const wordsCloudsAPIDataExists = (wordsCloudsAPIData: WordCloudAPIDatasets): boolean => {
  return wordsCloudsAPIData && wordsCloudsAPIData.info.length > 0;
}

/**
 * reportData に message が存在し、その配列の長さが 0 より大きいかをチェックする関数。
 * @param reportData - ApiResponse 型のデータ。
 * @returns message が存在し、長さが 0 より大きければ true を返す。そうでなければ false を返す。
 */
export const liveKikkakeExists = (reportData: ApiResponse): boolean => {
  if (reportData && reportData.kikkake) {
    return reportData.kikkake.length > 0 || false;
  }
  return false;
}

// ----------------------------------------------------------------
// ワードクラウド
// ----------------------------------------------------------------
/**
 * ワードクラウドを表示するコンポーネント
 * 
 * @param reportWordCloudDatas - ワードクラウドのデータセット
 * @param eventTitle - イベントのタイトル
 * @returns ワードクラウドを含むセクション要素
 */
export const wordsCloud = (reportWordCloudDatas: WordCloudAPIDatasets, eventTitle: string) => {
  const { info } = reportWordCloudDatas;
  return (
    [
      section({ class: "print__newLine" },
        h3({ class: "l-main__subHeading -IsWordCloud" }, `「${eventTitle} ご担当者へのメッセージ」をワードクラウドで表現`),
        p({ class: "wordCloudExplain" },
          "メッセージのテキストデータを視覚的に自動で表現しています。名詞、形容詞、動詞を対象に出現頻度が高い単語を選び出し、頻度が多いほど大きく表示されています。",
          br(),
          "文字の色は品詞により分けています。青色が名詞、赤色が動詞、黄緑色が形容詞を表しています。",
        ),
        renderingD3WordCloud(info),
      ),
    ]
  );
}

// -----------------------------------------------------------------
// メッセージ
// ----------------------------------------------------------------
export const StudentMessage = (sectionClass: string, StudentMessageData: Message[] | null, messageTitle: string) => {
  return (
    section({ class: sectionClass },
      h3({class: "l-main__subHeading"},messageTitle),
      ul({class: "l-main__list"},
        StudentMessageData && StudentMessageData.length > 0
        ? StudentMessageData.map((message) => {
          return (
            li(
              message.content,
              span(
                `（${message.speaker}）`
              ),
            )
          )
        })
        : li({ class: "-Nolist" }, "メッセージはございませんでした。")
      ),
    )
  )
}

/**
 * メッセージのリストを表示するコンポーネント
 * 
 * @param reportData - APIレスポンスデータ
 * @param messagesKey - メッセージデータが格納されているプロパティのキー
 * @param headingText - セクションの見出しテキスト
 * @returns メッセージのリストを含むセクション要素
 */
export const MessageRows = (reportData: ApiResponse, messagesKey: keyof ApiResponse, headingText: string) => {
  // 指定されたキーを使用して、メッセージデータを取得
  const messages = reportData[messagesKey] as { content: string, speaker: string }[] | undefined;
  
  return (
    section(
      h3({ class: "l-main__subHeading" }, headingText,),
      ul({ class: "l-main__list" },
        messages && messages.length > 0
          ? messages.map((message) => (
            li(
              message.content,
              span(`（${message.speaker}）`)
            )
          ))
          : li({ class: "-Nolist" }, "メッセージはございませんでした。")
        )
    )
  );
};