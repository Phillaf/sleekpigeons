(function(){
'use strict';

  class SleekStocks extends HTMLElement {

    constructor() {
      super();
      const shadow = this.attachShadow({ mode: 'open' });
      const stocks = document.createElement('ul');

      this.getStocks().then(html => {
        stocks.innerHTML = html;
        shadow.appendChild(stocks);
      });
      shadow.appendChild(style.content.cloneNode(true));
    };

    getStocks = async () => {
      const exchange = new URL(window.location.href).pathname.substring(8);
      const response = await fetch(`/api/v1/stock/symbol?exchange=${exchange}`);
      const stocks = await response.json();
      let html = "";
      stocks.forEach(stock => {
        html += this.createStock(stock);
      });
      return html;
    }

    createStock = (stock) => (
      `<a href="#">
         <li class="stock">
           <p class="stock-display-symbol">${stock.displaySymbol}</p>
           <p class="stock-description">${stock.description}</p>
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
        align-items: stretch;
      }
      .stock {
        list-style: none;
      }
      a {
        text-decoration: none;
        color: var(--dark-colof);
        border: 1px solid var(--shade-light-color);
        border-radius: var(--border-radius);
        background-color: var(--shade-light-color);
      }
      a:hover {
        background-color: var(--shade-medium-color);
        border: 1px solid var(--shade-medium-color);
      }
      .stock-display-symbol {
        display: flex;
        align-items: center;
        flex: 1 1 20%;
        padding: 0 0.5em;
        border-radius: var(--border-radius) 0 0 var(--border-radius);
        background-color: var(--background-color);
        color: var(--shade-medium-color);
        font-weight: bold;
      }
      .stock-description {
        display: flex;
        align-items: center;
        flex: 1 1 80%;
        padding: 0 1em;
        font-size: 0.8em;
        overflow: hidden;
        white-space: nowrap;
      }
    </style>`;

  customElements.define('sleek-stocks', SleekStocks);
})();


