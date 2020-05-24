(function(){
'use strict';

  class SleekStockExecutive extends HTMLElement {

    constructor() {
      super();
      const shadow = this.attachShadow({ mode: 'open' });
      const table = document.createElement('table');

      this.getExecutive().then(executive => {
        let rowsHtml = "";
        executive.forEach(exec => {
          rowsHtml += this.createRow(exec);
        });
        table.innerHTML = this.createTable(rowsHtml);
        shadow.appendChild(table);
      });

      shadow.appendChild(style.content.cloneNode(true));
    };

    getExecutive = async () => {
      const symbol = new URL(window.location.href).pathname.substring(7);
      const response = await fetch(`/api/v1/stock/executive?symbol=${symbol}`);
      const data = await response.json();
      return data.executive;
    }

    createTable = (rows) => (`
      <thead>
        <tr>
          <th>Age</th>
          <th>Compensation</th>
          <th>Currency</th>
          <th>Name</th>
          <th>Position</th>
          <th>Sex</th>
          <th>Since</th>
        </tr>
        <tbody>${rows}</tbody>
      </thead>`
    );

    createRow = (executive) => (`
      <tr>
        <td>${executive.age}</td>
        <td>${executive.compensation}</td>
        <td>${executive.currency}</td>
        <td>${executive.name}</td>
        <td>${executive.position}</td>
        <td>${executive.sex}</td>
        <td>${executive.since}</td>
      </tr>
    `);
  }

  const style = document.createElement('template');
  style.innerHTML = `
    <style>
    </style>`;

  customElements.define('sleek-stock-executive', SleekStockExecutive);
})();
