class SleekCommodities extends HTMLElement {

  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });
    this.commodities = document.createElement('div');
    this.commodities.setAttribute("id", "commodities")
    shadow.appendChild(this.commodities);
    shadow.appendChild(style.content.cloneNode(true));
  };

  async connectedCallback() {
    const response = await fetch(`/data/commodities.json`);
    const data = await response.json();
    this.commodities.innerHTML = await this.getCommodities(data);
  }

  getCommodities = async (commodities) => {
    let html = "";
    commodities.forEach(commodity => {
      html += `<a href="/commodity/${commodity.code}">${commodity.name}</a>`;
    });
    return html;
  }
}

const style = document.createElement('template');
style.innerHTML = `
  <style>
    #commodities {
      margin-top: 1em;
      grid-area: body;
      display: grid;
      grid-gap: 0.3em;
      grid-template-columns: repeat(auto-fill, minmax(15em, auto));
    }
    #commodities > a {
      background-color: var(--shade-light-color);
      padding: 1em;
      border-radius: var(--border-radius);
      text-align: center;
      text-decoration: none;
      color: var(--dark-color);
    }
    #commodities > a:hover {
      background-color: var(--shade-medium-color);
    }
  </style>`;

customElements.define('sleek-commodities', SleekCommodities);
export {SleekCommodities};
