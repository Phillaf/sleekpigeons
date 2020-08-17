export default class Api {

  constructor(datasource) {
    window.addEventListener("commodity-datasource-updated", this.loadSource.bind(this), false);
  }

  loadSource(event) {
    this.data = this.getData(event.detail.source);
    this.meta = this.getMeta(event.detail.source);
    this.dispatchLoaded();
  }

  async getData(source) {
    const response = await fetch(`/quandl-api/${source}/data.json`);
    const data = await response.json();
    return data['dataset'];
  }

  async getMeta(source) {
    const response = await fetch(`/quandl-api/${source}.json`);
    const data = await response.json();
    return data['dataset'];
  }

  async dispatchLoaded() {
    window.dispatchEvent(
      new CustomEvent("commodity-data-loaded", {
        detail: {
          "data": await this.data,
          "meta": await this.meta,
        },
        bubbles: true,
      })
    );
  }
}

new Api();
