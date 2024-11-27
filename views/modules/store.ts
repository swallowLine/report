/**
 * APIのレスポンスを格納するためのstore
 */

// VanJS設定
import van from 'vanjs-core'

// storeの変数
export const kougiDataFetch = van.state('')
export const kougiLabelsFetch = van.state('')
// export const updateVideoId = (value: string) => (videoIdState.val = value)
export const kougiData = van.derive(() => kougiDataFetch.val)
export const kougiLabels = van.derive(() => kougiLabelsFetch.val)