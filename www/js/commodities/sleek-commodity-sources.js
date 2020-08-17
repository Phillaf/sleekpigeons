class SleekCommoditySources extends HTMLElement {

  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });
    this.searchParams = new URLSearchParams(window.location.search);
    this.sources = document.createElement('div');
    this.sources.className = 'sources';
    shadow.appendChild(this.sources);
    shadow.appendChild(style.content.cloneNode(true));
    window.addEventListener("commodity-datasource-loaded", this.load, false);
  };

  load = (event) => {
    const commodity = event.detail.commodity;
    const activeSource = event.detail.source;
    this.listSources(commodity, activeSource);
  }

  listSources = (commodity, activeSource) => {
    this.sources.innerHTML = '';
    commodity.sources.forEach(source => {
      const link = this.createLink(source);
      if (source.code === activeSource) {
        link.className = "active";
      }
      this.sources.appendChild(link);
    });
  }

  createLink = (source) => {
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.set("source", source.code);
    const link = document.createElement('a');
    link.innerHTML = source.name;
    link.onclick = this.changeSource;
    link.href = window.location.pathname + '?' + searchParams.toString();
    link.setAttribute('code', source.code);
    return link;
  }

  changeSource = (event) => {
    this.dispatchEvent(
      new CustomEvent("commodity-source-change", {
        detail: event.target.getAttribute('code'),
        bubbles: true,
      })
    );
    return false;
  }
}

const style = document.createElement('template');
style.innerHTML = `
  <style>
    .sources {
      margin-top: 1em;
      grid-area: body;
      display: grid;
      grid-gap: 0.3em;
      grid-template-columns: repeat(auto-fill, minmax(15em, auto));
    }
    .sources > a {
      background-color: var(--shade-light-color);
      padding: 1em;
      border-radius: var(--border-radius);
      text-align: center;
      text-decoration:none;
      color: var(--color-dark);
    }
    .sources > a:hover {
      background-color: var(--shade-medium-color);
    }
    .sources > .active {
      background-color: var(--light-color);
    }
 </style>`;

customElements.define('sleek-commodity-sources', SleekCommoditySources);
export {SleekCommoditySources};
