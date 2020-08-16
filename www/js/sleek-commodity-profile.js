class SleekCommodityProfile extends HTMLElement {

  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });
    this.profile = document.createElement('div');
    this.profile.setAttribute("id", "profile")
    shadow.appendChild(this.profile);
    shadow.appendChild(style.content.cloneNode(true));
  };

  async connectedCallback() {
    const code = new URL(window.location.href).pathname.substring(11);
    const response = await fetch(`/data/commodities.json`);
    const data = await response.json();
    const commodity = data.find(commodity => commodity.code === code);
    this.profile.innerHTML = await this.createProfile(commodity);
    this.profile.innerHTML += await this.listSources(commodity);
  }

  createProfile = async (commodity) => (`
    <div class="title">
      <h2>${commodity.name}</h2>
    </div>`
  );

  listSources = async (commodity) => {
    let html = `<div class="sources">`;
    commodity.sources.forEach(source => {
      html += `<div>${source.name}</div>`;
    });
    return html += `</div>`;
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
    .sources > div {
      background-color: var(--shade-light-color);
      padding: 1em;
      border-radius: var(--border-radius);
      text-align: center;
    }
    .sources > div:hover {
      background-color: var(--shade-medium-color);
    }
 </style>`;

customElements.define('sleek-commodity-profile', SleekCommodityProfile);
export {SleekCommodityProfile};

