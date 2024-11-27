// VanJS設定
import van from 'vanjs-core'
const {address, br, footer, span} = van.tags

// 現在の西暦を返す
const thisYear = (): number => {
  const thisYear = new Date().getFullYear()
  return thisYear;
};

// -----------------------------------------------------------------
// コンポーネント
// ----------------------------------------------------------------
export const Footer = () => footer({class: "l-footer"},
  address(
    span(
      "株式会社フロムページ Copyright(c) 2008 - "+`${thisYear()}`+" Frompage Co.,Ltd. All Rights Reserved.",
    ),
    br(),
    "大阪本社 TEL.(06)6231-5905 ／ 東京支社 TEL.(03)3214-7200 ／ 名古屋支社 TEL.(052)203-8211",
  ),
)