import Highstock from 'https://cdnjs.cloudflare.com/ajax/libs/highcharts/8.0.0/es-modules/masters/highstock.src.js';

class SleekChart extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });
    this.chart = document.createElement('div')
    this.chart.setAttribute("id", "container");
    this.chart.setAttribute("class", "chart");

    shadow.appendChild(this.chart);
    shadow.appendChild(style.content.cloneNode(true));
    window.addEventListener("commodity-data-loaded", this.load, false);
  };

  load = (event) => {
    const data = event.detail.data;

    const usdData = [];
    const gbpData = [];
    const euroData = [];

    data.forEach(element => {
      const date = new Date(element[0] + 'Z');
      const epoch = date.getTime();
      usdData.push([epoch, element[1]]);
      gbpData.push([epoch, element[3]]);
      euroData.push([epoch, element[5]]);
    });

    var seriesOptions = [
      {
        "name": "serie 1",
        "data": usdData,
      },
      {
        "name": "serie 2",
        "data": gbpData,
      },
      {
        "name": "serie 3",
        "data": euroData,
      }
    ];

    console.log(seriesOptions);

    Highstock.stockChart({

        chart: {
          renderTo: this.chart,
        },
        rangeSelector: {
            selected: 4
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
}

const style = document.createElement('template');
style.innerHTML = `
  <link rel="stylesheet" type="text/css" href="https://code.highcharts.com/css/stocktools/gui.css">
  <link rel="stylesheet" type="text/css" href="https://code.highcharts.com/css/annotations/popup.css">
  <style>
    #container {
      max-height: 800px;
      height: 75vh;
    }
  </style>`;

customElements.define('sleek-chart', SleekChart);
export {SleekChart};
