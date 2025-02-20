/**
 * URLからキーの値を取得
 *
 * @param name パラメータのキー文字列
 * @return url 対象のURL文字列（任意）
 */
const getParam = (name:string, url?:string) => {
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, "\\$&");
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
      results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}

export default getParam;