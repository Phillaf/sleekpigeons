export default class Api {

  constructor(datasource) {
    window.addEventListener("commodity-datasource-updated", this.loadSource.bind(this), false);
  }

  loadSource(event) {
    this.data = this.getData(event.detail.source);
    this.meta = this.getMeta(event.detail.source);
    this.sourceDetails = event.detail.sourceDetails;
    this.dispatchLoaded();
  }

  async getData(source) {
    let startDate = new Date();
    startDate.setFullYear(startDate.getFullYear() - 1);
    startDate = startDate.toISOString().substring(0, 10);
    const response = await fetch(`/quandl-api/${source}/data.json?start_date=${startDate}`);
    const data = await response.json();
    return data['dataset_data']['data'];
  }

  async getMeta(source) {
    const response = await fetch(`/quandl-api/${source}/metadata.json`);
    const data = await response.json();
    return data['dataset'];
  }

  async dispatchLoaded() {
    window.dispatchEvent(
      new CustomEvent("commodity-data-loaded", {
        detail: {
          "data": await this.data,
          "meta": await this.meta,
          "sourceDetails": this.sourceDetails,
        },
        bubbles: true,
      })
    );
  }
}

new Api();
