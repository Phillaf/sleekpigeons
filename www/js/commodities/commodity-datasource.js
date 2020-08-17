export default class Commodities {

  constructor(datasource) {
    this.dataSource = datasource;
    this.dispatchLoaded();
    window.addEventListener("commodity-source-change", this.changeSource.bind(this), false);
  }

  getCommodity() {
    const commodityCode = new URL(window.location.href).pathname.substring(11);
    return this.dataSource.find(commodity => commodity.code === commodityCode);
  }

  getSource() {
    const searchParams = new URLSearchParams(window.location.search);
    return searchParams.get('source') ?? this.getCommodity().sources[0].code;
  }

  changeSource(event) {
    const source = event.detail;
    let searchParams = new URLSearchParams(window.location.search);
    searchParams.set("source", source);
    const newRelativePathQuery = window.location.pathname + '?' + searchParams.toString();
    window.history.pushState(null, '', newRelativePathQuery);
    this.dispatchLoaded();
  }

  dispatchLoaded() {
    window.dispatchEvent(
      new CustomEvent("commodity-datasource-loaded", {
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
  return new Commodities(datasource);
}

build();
