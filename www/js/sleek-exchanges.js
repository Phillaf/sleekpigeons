(function(){
'use strict';

  class SleekExchanges extends HTMLElement {

    constructor() {
      super();
      const shadow = this.attachShadow({ mode: 'open' });
      const exchanges = document.createElement('ul');
      this.getExchanges().then(html => {
        exchanges.innerHTML = html;
        shadow.appendChild(exchanges);
      });
      shadow.appendChild(style.content.cloneNode(true));
    };

    getExchanges = async () => {
      const response = await fetch('/api/v1/stock/exchange');
      const exchanges = await response.json();
      let html = "";
      exchanges.forEach(exchange => {
        html += this.createExchange(exchange);
      });
      return html;
    }

    createExchange = (exchange) => (
      `<li class="exchange">
         <a href="/stocks/${exchange.code}" title="${exchange.name.toLowerCase()}">
           <p class="exchange-code">${exchange.code}</p>
           <p class="exchange-name">${exchange.name.toLowerCase()}</p>
         </a>
       </li>`
    );

  }

  const style = document.createElement('template');
  style.innerHTML = `
    <style>
      ul, li, a, h3, p {
        padding: 0;
        margin: 0;
        list-style: none;
      }
      ul {
        display: grid;
        grid-gap: 0.3em;
        grid-template-columns: repeat(auto-fill, minmax(15em, auto));
      }
      a {
        text-decoration: none;
        color: var(--dark-colof);
        border: 1px solid var(--shade-light-color);
        border-radius: var(--border-radius);
        background-color: var(--shade-light-color);
        display: flex;
        align-items: stretch;
      }
      a:hover {
        background-color: var(--shade-medium-color);
        border: 1px solid var(--shade-medium-color);
      }
      .exchange-code {
        display: flex;
        align-items: center;
        flex: 1 1 10%;
        padding: 0 0.5em;
        border-radius: var(--border-radius) 0 0 var(--border-radius);
        background-color: var(--background-color);
        color: var(--shade-medium-color);
        font-weight: bold;
      }
      .exchange-name {
        display: flex;
        align-items: center;
        flex: 1 1 90%;
        padding: 0 1em;
        font-size: 0.8em;
        overflow: hidden;
        white-space: nowrap;
      }
    </style>`;

  customElements.define('sleek-exchanges', SleekExchanges);
})();

