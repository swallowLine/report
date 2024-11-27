// VanJS設定
import van from 'vanjs-core'
const {a, div, h1, h2, header, img, span} = van.tags

// データ型をインポート
import type { ApiResponse } from '../types/reportApi'

// -----------------------------------------------------------------
// コンポーネント
// ----------------------------------------------------------------
export const HeaderManabi = (reportData:ApiResponse) => header({class: "l-header"},
  div({class: "l-header__inner"},
    h2(
      span(`${reportData.univName} 様`,),
      span(`まなびジャンル ${reportData.title}`,),
    ),
    h1(
      a({href: "https://liveweb.yumenavi.info/", target: "_blank", rel: "noopener noreferrer"},
        img({class: "l-header__logo", src: "/images/logo-live2024.svg", alt: "夢ナビライブ"}),
      ),
    ),
  ),
)
