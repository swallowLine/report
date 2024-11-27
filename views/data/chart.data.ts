export namespace ChartConst{
  /**
   * ドーナツ型のチャートの背景色設定
   */
  export const chartBackgroundColor:string[] = ["#5298cb","#4baf8a","#eaa63c","#dc5370","#c5c5c5"];

  /**
  * 横棒グラフの幅
  */
  export const chartWidth:number = 540;

  /**
  * 横棒グラフの幅の比率
  */
  export const chartWidthRatio:number = 5.4;
 
  // -----------------------------------------------------------------
  // ワードクラウド用設定
  // -----------------------------------------------------------------
  /**
  * ワードクラウドの色設定
  */
  export const colorChartArray:string[] = ["rgb(69,171,221)", "rgba(78,188,148)", "rgba(252,87,144)"];
 
  /**
  * チャートホバーの色
  */
  export const chartHoverColor:string = "rgb(0,72,49)";
 
  // -----------------------------------------------------------------
  //  data > datasets
  // -----------------------------------------------------------------
  /**
  * 積み上げ(3つ)横棒グラフ
  */
  export const chartBar3StackedDatasets = (data1:number,data2:number,data3:number) => {
    return [
      {
        label: "男性",
        data: [data1],
        backgroundColor: "#5298cb",
        borderColor: "#FFFFFF",
        borderWidth: 1,
      },
      {
        label: "女性",
        data: [data2],
        backgroundColor: "#dc5370",
        borderColor: "#FFFFFF",
        borderWidth: 1,
      },
      {
        label: "未選択",
        data: [data3],
        backgroundColor: "#c5c5c5",
        borderColor: "#FFFFFF",
        borderWidth: 1,
      }
    ];
  };
  /**
  * 積み上げ(4つ)横棒グラフ
  */
  export const chartBar4StackedDatasets = (data1:number,data2:number,data3:number,data4:number) => {
    return [
      {
        label: "サイコー",
        data: [data1],
        backgroundColor: "#dc5370",
        borderColor: "#FFFFFF",
        borderWidth: 1
      },
      {
        label: "スキかも",
        data: [data2],
        backgroundColor: "#eaa63c",
        borderColor: "#FFFFFF",
        borderWidth: 1
      },
      {
        label: "イイネ",
        data: [data3],
        backgroundColor: "#5298cb",
        borderColor: "#FFFFFF",
        borderWidth: 1
      },
      {
        label: "まあまあ",
        data: [data4],
        backgroundColor: "#c5c5c5",
        borderColor: "#FFFFFF",
        borderWidth: 1
      }
    ]
  }
}
