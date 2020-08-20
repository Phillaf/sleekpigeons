import Highstock from 'https://cdnjs.cloudflare.com/ajax/libs/highcharts/8.0.0/es-modules/masters/highstock.src.js';

class SleekCommodityChart extends HTMLElement {
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

  load = async (event) => {
    const chartName = event.detail.sourceDetails.chart;
    if (!chartName) {
      this.chart.innerHTML = '';
      return;
    }
    const Chart = await import(`./charts/${chartName}.js`);
    Chart.default(this.chart, event.detail.data);
  }
}

const style = document.createElement('template');
style.innerHTML = `
  <link rel="stylesheet" type="text/css" href="https://code.highcharts.com/css/stocktools/gui.css">
  <link rel="stylesheet" type="text/css" href="https://code.highcharts.com/css/annotations/popup.css">
  <style>
    #container {
      height: 400px;
    }
  </style>`;

customElements.define('sleek-commodity-chart', SleekCommodityChart);
export {SleekCommodityChart};
