// Doughnut型のチャート
const chartOptions = {
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      padding: 10,
      displayColors: false,
      bodyFont: {
        size: 14
      },
      callbacks: {
        label: (tooltipItem: any): string | string[] => {
          let label = tooltipItem.label;
          let value = tooltipItem.dataset.data[tooltipItem.dataIndex];
          return label + ': ' + value + '名';
        },
      }
    }
  },
  cutout: 60, 
  responsive: false,
};

export default chartOptions;