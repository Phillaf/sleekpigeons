class SleekStockProfile extends HTMLElement {

  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });
    this.profile = document.createElement('div');
    this.profile.setAttribute('class', 'profile');
    shadow.appendChild(this.profile);
    shadow.appendChild(style.content.cloneNode(true));
  };

  async connectedCallback() {
    const data = await this.getProfile();
    if (Object.keys(data).length === 0) return;
    console.log(Object.keys(data));
    this.profile.innerHTML = await this.createProfile(data);
  }

  getProfile = async () => {
    const symbol = new URL(window.location.href).pathname.substring(7);
    const response = await fetch(`/fin-api/v1/stock/profile2?symbol=${symbol}`);
    return await response.json();
  }

  createProfile = (stock) => (`
    <img src="${stock.logo}"/>
    <div class="title">
      <h2>${stock.name}</h2>
      <p>${stock.ticker}</p>
      <a href="${stock.weburl}"/>${stock.weburl.replace(/(^\w+:|^)\/\//, '').replace(/\/$/, '')}</a>
    </div>
    <dl>
      <div><dt>Country</dt><dd>${stock.country}</dd></div>
      <div><dt>Industry</dt><dd>${stock.finnhubIndustry}</dd></div>
      <div><dt>IPO</dt><dd>${stock.ipo}</dd></div>
      <div><dt>Market Capitalization</dt><dd>${stock.marketCapitalization}</dd></div>
      <div><dt>Share Outstanding</dt><dd>${stock.shareOutstanding}</dd></div>
    </dl>`
  );
}

const style = document.createElement('template');
style.innerHTML = `
  <style>
    .profile {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
    }
    img {
      height: 100px;
      width: auto;
      margin: 0 1em 0 0;
    }
    h2 {
      margin: 0;
      font-size: 2.5em;
    }
    .title > p {
      font-size: 1.5em;
      font-weight: bold;
      margin: 0;
      color: var(--shade-dark-color);
    }
    dl > div {
      display: flex;
    }
    dt {
      min-width: 10.5em;
      text-align: right;
      padding-right: 1em;
      font-weight: bold;
    }
    dd {
      justify-content: flex-start;
      min-width: 6em;
      margin: 0;
    }
  </style>`;

customElements.define('sleek-stock-profile', SleekStockProfile);
export {SleekStockProfile};
