export default class Datasource {

  constructor(datasource) {
    this.dataSource = datasource;
    this.loadSource();
    window.addEventListener("commodity-source-change", this.loadSource.bind(this), false);
  }

  loadSource(event) {
    const source = event ? event.detail : this.getSource();
    this.setSourceUrl(source);
    this.dispatchUpdated(source);
  }

  getCommodity() {
    const commodityCode = new URL(window.location.href).pathname.substring(11);
    return this.dataSource.find(commodity => commodity.code === commodityCode);
  }

  getSource() {
    const searchParams = new URLSearchParams(window.location.search);
    return searchParams.get('source') ?? this.getCommodity().sources[0].code;
  }

  setSourceUrl(source) {
    let searchParams = new URLSearchParams(window.location.search);
    searchParams.set("source", source);
    const newRelativePathQuery = window.location.pathname + '?' + searchParams.toString();
    window.history.pushState(null, '', newRelativePathQuery);
  }

  async dispatchUpdated() {
    window.dispatchEvent(
      new CustomEvent("commodity-datasource-updated", {
        detail: {
          "commodity": this.getCommodity(),
          "source": this.getSource(),
        },
        bubbles: true,
      })
    );
  }
}

export async function build() {
  const response = await fetch(`/data/commodities.json`);
  const datasource = await response.json();
  return new Datasource(datasource);
}

build();
