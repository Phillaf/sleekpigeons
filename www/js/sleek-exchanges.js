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
           <h3>${exchange.code}</h3>
           <p>${exchange.name}</p>
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
        grid-gap: 1em;
        grid-template-columns: repeat(auto-fill, 10em);
        justify-content: center;
      }
      li {
        padding: 0.5em;
      }
      .exchange {
        list-style: none;
        word-break: break-word;
      }
      a {
        text-decoration: none;
        color: var(--dark-colof);
        border: 1px solid var(--light-color);
        border-radius: var(--border-radius);
        text-align: center;
      }
      a:hover {
        background-color: var(--hover-background-color);
      }
      h3 {
        color: var(--medium-color);
      }
      p {
        font-size: 0.8em;
        margin-top: 0.8em;
      }
    </style>`;

  customElements.define('sleek-exchanges', SleekExchanges);
})();

