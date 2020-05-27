(function(){
'use strict';

  class SleekSearchbar extends HTMLElement {
    constructor() {
      super();
      const shadow = this.attachShadow({ mode: 'open' });
      this.searchbar = document.createElement('input');
      this.searchbar.addEventListener('input', this.inputChange);
      shadow.appendChild(this.searchbar);
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
    </style>`;
  customElements.define('sleek-searchbar', SleekSearchbar);
})();


