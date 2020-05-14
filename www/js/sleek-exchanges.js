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
         <a href="${exchange.url}">
           <h3>${exchange.code}</h3>
           <p>${exchange.currency}</p>
           <p>${exchange.name}</p>
         </a>
       </li>`
    );

  }

  const style = document.createElement('template');
  style.innerHTML = `
    <style>
    </style>`;

  customElements.define('sleek-exchanges', SleekExchanges);
})();

