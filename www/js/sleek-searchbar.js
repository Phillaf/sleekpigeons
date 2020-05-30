class SleekSearchbar extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });
    this.searchbarContainer = document.createElement('div');
    this.searchbar = document.createElement('input');
    this.searchbar.addEventListener('input', this.inputChange);
    this.searchbar.setAttribute('placeholder', '🔍 Search...');
    this.searchbarContainer.appendChild(this.searchbar);
    shadow.appendChild(this.searchbarContainer);
    shadow.appendChild(style.content.cloneNode(true));
  };

  inputChange = (event) => {
    this.dispatchEvent(
      new CustomEvent(this.getAttribute('event'), {
        detail: event.target.value,
        bubbles: true,
      })
    );
  }
}


const style = document.createElement('template');
style.innerHTML = `
  <style>
    div {
      margin: 0.2em 0;
    }
    input {
      width: 100%;
      border: 1px solid var(--shade-light-color);
      border-radius: var(--border-radius);
      box-sizing: border-box;
      line-height: 1.5em;
    }
  </style>`;

customElements.define('sleek-searchbar', SleekSearchbar);
export {SleekSearchbar};
