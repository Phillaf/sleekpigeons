class SleekDefinitionList extends HTMLElement {

  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });
    this.dl = document.createElement('dl');
    shadow.appendChild(this.dl);
    shadow.appendChild(style.content.cloneNode(true));
  };

  async connectedCallback() {
    const Module = await import(this.getAttribute('api'))
    const data = await Module.getData();
    for (const [key, value] of Object.entries(data)) {
      const div = document.createElement('div');
      div.innerHTML = `<dt>${key}</dt><dd>${value}</dd>`
      this.dl.appendChild(div);
    };
  }
}

const style = document.createElement('template');
style.innerHTML = `
  <style>
    dl {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      font-size: 0.7em;
      align-items: center;
    }
    dl > div {
      display: flex;
      margin: 0.2em 0;
      padding: 0.2em;
      background-color: var(--shade-light-color);
    }
    dt {
      font-weight: bold;
      width: 10em;
    }
    dd {
      width: 6em;
    }
  </style>`;

customElements.define('sleek-definition-list', SleekDefinitionList);
export {SleekDefinitionList};
