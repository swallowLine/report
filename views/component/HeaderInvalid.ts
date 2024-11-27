// VanJS設定
import van from 'vanjs-core'
const {a, div, h1, header, img} = van.tags

// 変数
let thisYearFlagWord: string

// フォルダ構成で年度を取得してヘッダーのロゴを分岐させる
const ref = document.referrer;
// console.log(ref);
if(ref.match(/2022/)){
  thisYearFlagWord = "2022"
}else if(ref.match(/2023/)){
  thisYearFlagWord = "2023"
}else{
  thisYearFlagWord = "2024"
}

// -----------------------------------------------------------------
// コンポーネント
// ----------------------------------------------------------------
export const HeaderInvalid = () => header({class: "l-header"},
  div({class: "l-header__inner"},
    h1(
      a({href: "https://liveweb.yumenavi.info/", target: "_blank", rel: "noopener noreferrer"},
        thisYearFlagWord === "2022"
        ? img({class: "l-header__logo", src: "images/logo-live2022.svg", alt: "夢ナビライブ"})
        : thisYearFlagWord === "2023"
          ? img({class: "l-header__logo", src: "images/logo-live2023.svg", alt: "夢ナビライブ"})
          : thisYearFlagWord === "2024"
            ? img({class: "l-header__logo", src: "images/logo-live2024.svg", alt: "夢ナビライブ"})
            : null
      )
    ),
  ),
)