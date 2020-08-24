import Highstock from 'https://cdnjs.cloudflare.com/ajax/libs/highcharts/8.0.0/es-modules/masters/highstock.src.js';

export default function (div, data) {

  const ohlc = [];
  const volume = [];

  data.forEach(element => {
    const date = new Date(element[0] + 'Z');
    const epoch = date.getTime();
    ohlc.unshift([
      epoch,
      element[1],
      element[2],
      element[3],
      element[4],
    ]);
    volume.unshift([
      epoch,
      element[7],
    ]);
  });

  Highstock.stockChart({

      chart: {
        renderTo: div,
      },

      yAxis: [{
        labels: {
          align: 'left'
        },
        height: '80%',
        resize: {
          enabled: true
        }
      }, {
        labels: {
          align: 'left'
        },
        top: '80%',
        height: '20%',
        offset: 0
      }],

      series: [{
        type: 'ohlc',
        id: 'ohlc',
        name: 'price',
        data: ohlc
      }, {
        type: 'column',
        id: 'volume',
        name: 'volume',
        data: volume,
        yAxis: 1
      }],
  });
}

