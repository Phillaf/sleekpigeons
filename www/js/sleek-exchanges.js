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
      `<a href="http://sleekpigeons.com/exchange/${exchange.code}">
         <li class="exchange">
           <p class="exchange-code">${exchange.code}</p>
           <p class="exchange-name">${exchange.name.toLowerCase()}</p>
         </li>
       </a>`
    );

  }

  const style = document.createElement('template');
  style.innerHTML = `
    <style>
      ul, li, a, h3, p {
        padding: 0;
        margin: 0;
      }
      ul {
        display: grid;
        grid-gap: 0.3em;
        grid-template-columns: repeat(auto-fill, 20em);
      }
      li {
        display: flex;
        height:100%;
        align-items: stretch;
        align-self: center;
        justify-content-center;
      }
      .exchange {
        list-style: none;
      }
      a {
        text-decoration: none;
        color: var(--dark-colof);
        border: 2px solid var(--medium-color);
        border-radius: var(--border-radius);
        background-color: var(--medium-color);
      }
      a:hover {
        background-color: var(--light-color);
        border: 2px solid var(--light-color);
      }
      .exchange-code {
        display: flex;
        align-items: center;
        justify-content: center;
        flex: 1 1 10%;
        background-color: var(--background-color);
        color: var(--medium-color);
        font-weight: bold;
      }
      .exchange-name {
        display: flex;
        align-items: center;
        padding: 0 1em;
        flex: 1 1 90%;
        font-size: 0.8em;
        color: var(--background-color);
        overflow: hidden;
        white-space: nowrap;
      }
    </style>`;

  customElements.define('sleek-exchanges', SleekExchanges);
})();

