(function(){
'use strict';

  class SleekStockProfile extends HTMLElement {

    constructor() {
      super();
      const shadow = this.attachShadow({ mode: 'open' });
      this.symbol = new URL(window.location.href).pathname.substring(7);

      this.getProfile().then(profile => {
        shadow.appendChild(profile);
      });

      shadow.appendChild(style.content.cloneNode(true));
    };

    getProfile = async () => {
      const response = await fetch(`/api/v1/stock/profile2?symbol=${this.symbol}`);
      const data = await response.json();
      const div = document.createElement('div');
      div.innerHTML = this.createProfile(data);
      return div;
    }
    createProfile = (stock) => (`
      <dl class="profile">
        <div class="country"><dt>country</dt><dd>${stock.country}</dd></div>
        <div class="currency"><dt>Currency</dt><dd>${stock.currency}</dd></div>
        <div class="exchange"><dt>Exchange</dt><dd>${stock.exchange}</dd></div>
        <div class="finnhubIndustry"><dt>Industry</dt><dd>${stock.finnhubIndustry}</dd></div>
        <div class="ipo"><dt>IPO</dt><dd>${stock.ipo}</dd></div>
        <div class="logo"><dt>Logo</dt><dd>${stock.logo}</dd></div>
        <div class="marketCapitalization"><dt>Market Capitalization</dt><dd>${stock.marketCapitalization}</dd></div>
        <div class="name"><dt>Name</dt><dd>${stock.name}</dd></div>
        <div class="phone"><dt>Phone</dt><dd>${stock.phone}</dd></div>
        <div class="shareOutstanding"><dt>Share Outstanding</dt><dd>${stock.shareOutstanding}</dd></div>
        <div class="ticker"><dt>Ticker</dt><dd>${stock.ticker}</dd></div>
        <div class="weburl"><dt>Web Url</dt><dd>${stock.weburl}</dd></div>
      </dl>`
    );
  }

  const style = document.createElement('template');
  style.innerHTML = `
    <style>
    </style>`;

  customElements.define('sleek-stock-profile', SleekStockProfile);
})();
