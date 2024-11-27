/**
 * 指定された URL からデータを取得し、指定された型のデータを返す非同期関数。
 * @param url - データを取得するためのエンドポイント URL。
 * @returns 指定された型のデータを含む Promise。
 */
const fetchJsonData = async <T>(url: string): Promise<T> => {
  const response = await fetch(url);
  const data: T = await response.json();
  return data;
}

export default fetchJsonData;