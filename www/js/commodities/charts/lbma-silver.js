import Highstock from 'https://cdnjs.cloudflare.com/ajax/libs/highcharts/8.0.0/es-modules/masters/highstock.src.js';

export default function (div, data) {

  const usdData = [];
  const gbpData = [];
  const euroData = [];

  data.forEach(element => {
    const date = new Date(element[0] + 'Z');
    const epoch = date.getTime();
    usdData.unshift([epoch, element[1]]);
    gbpData.unshift([epoch, element[2]]);
    euroData.unshift([epoch, element[3]]);
  });

  var seriesOptions = [
    {
      "name": "USD",
      "data": usdData,
    },
    {
      "name": "GBP",
      "data": gbpData,
    },
    {
      "name": "EUR",
      "data": euroData,
    }
  ];

  Highstock.stockChart({

      chart: {
        renderTo: div,
      },

      yAxis: {
          labels: {
              formatter: function () {
                  return (this.value > 0 ? ' + ' : '') + this.value + '%';
              }
          },
          plotLines: [{
              value: 0,
              width: 2,
              color: 'silver'
          }]
      },

      plotOptions: {
          series: {
              compare: 'percent',
              showInNavigator: true
          }
      },

      tooltip: {
          pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> ({point.change}%)<br/>',
          valueDecimals: 2,
          split: true
      },

      series: seriesOptions
  });
}
