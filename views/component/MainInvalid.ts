// VanJS設定
import van from 'vanjs-core'
const {div, h2, img, main, section, span} = van.tags

// -----------------------------------------------------------------
// コンポーネント
// ----------------------------------------------------------------
export const MainInvalid = () => main({class: "l-main"},
  section(
    h2({class: "l-main__heading"},
      span({class: "l-main__title"},
        "各種レポート",
      ),
      div(
        img({class: "l-main__frompage", src: "images/logo-frompage.svg", alt: "Frompage"}),
      ),
    ),
  ),
  section({class: "l-main__displayEnd"},
    div(
      span("本",),
      span("コ",),
      span("ン",),
      span("テ",),
      span("ン",),
      span("ツ",),
      span("は",),
      span("公",),
      span("開",),
      span("期",),
      span("限",),
      span("を",),
      span("過",),
      span("ぎ",),
      span("た",),
      span("た",),
      span("め",),
      span("、",),
      span("ご",),
      span("覧",),
      span("い",),
      span("た",),
      span("だ",),
      span("け",),
      span("ま",),
      span("せ",),
      span("ん",),
      span("。",),
    ),
  ),
)