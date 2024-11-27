// CSSのインポート
import './styles/app.scss'

// VanJS設定
import van from 'vanjs-core'

// コンポーネントのインポート
import { HeaderInvalid } from './component/HeaderInvalid'
import { MainInvalid } from './component/MainInvalid'
import { Footer } from './component/Footer'

// 初期化
van.add(document.querySelector<HTMLDivElement>('#app')!, HeaderInvalid(), MainInvalid(), Footer())