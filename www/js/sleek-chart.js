import Highstock from 'https://cdnjs.cloudflare.com/ajax/libs/highcharts/8.0.0/es-modules/masters/highstock.src.js';

class SleekChart extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });
    this.chart = document.createElement('div')
    this.chart.setAttribute("id", "container");
    this.chart.setAttribute("class", "chart");

    console.log(Highstock);
    shadow.appendChild(this.chart);
    shadow.appendChild(style.content.cloneNode(true));
  };

  async connectedCallback() {
    const Module = await import(this.getAttribute('api'))
    const data = await Module.getData();

      var ohlc = [],
          volume = [],
          dataLength = data['c'].length,
          i = 0;

      for (i; i < dataLength; i += 1) {
          ohlc.push([
              data['t'][i] * 1000, // the date
              data['o'][i], // open
              data['h'][i], // high
              data['l'][i], // low
              data['c'][i] // close
          ]);

          volume.push([
              data['t'][i] * 1000, // the date
              data['v'][i] // the volume
          ]);
      }

      Highstock.stockChart({
          chart: {
            renderTo: this.chart,
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
          tooltip: {
              shape: 'square',
              headerShape: 'callout',
              borderWidth: 0,
              shadow: false,
              positioner: function (width, height, point) {
                  var chart = this.chart,
                      position;

                  if (point.isHeader) {
                      position = {
                          x: Math.max(
                              // Left side limit
                              chart.plotLeft,
                              Math.min(
                                  point.plotX + chart.plotLeft - width / 2,
                                  // Right side limit
                                  chart.chartWidth - width - chart.marginRight
                              )
                          ),
                          y: point.plotY
                      };
                  } else {
                      position = {
                          x: point.series.chart.plotLeft,
                          y: point.series.yAxis.top - chart.plotTop
                      };
                  }

                  return position;
              }
          },
          series: [{
              type: 'ohlc',
              id: 'ohlc',
              name: 'Stock Price',
              data: ohlc
          }, {
              type: 'column',
              id: 'volume',
              name: 'Volume',
              data: volume,
              yAxis: 1
          }],
          responsive: {
              rules: [{
                  condition: {
                      maxWidth: 800
                  },
                  chartOptions: {
                      rangeSelector: {
                          inputEnabled: false
                      }
                  }
              }]
          }
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
