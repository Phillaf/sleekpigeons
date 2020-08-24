import Highstock from 'https://cdnjs.cloudflare.com/ajax/libs/highcharts/8.0.0/es-modules/masters/highstock.src.js';

export default function (div, data) {

  const seriesData = [];

  data.forEach(element => {
    const date = new Date(element[0] + 'Z');
    const epoch = date.getTime();
    seriesData.unshift([epoch, element[1]]);
  });

  Highstock.stockChart({
      chart: {
        renderTo: div,
      },

      series: [{
        data: seriesData,
        tooltip: {
            valueDecimals: 2,
        }
      }]
  });
}

