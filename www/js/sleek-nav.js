(function(){
'use strict';

  class SleekNav extends HTMLElement {
    constructor() {
      super();
      const shadow = this.attachShadow({ mode: 'closed' });
      shadow.appendChild(nav.content.cloneNode(true));
      shadow.appendChild(style.content.cloneNode(true));
    };
  }

  const nav = document.createElement('template');
  nav.innerHTML = `
    <nav>
      <ul id="navbar">
        <li><a href="/">sleekpigeons</a></li>
        <li><a href="http://status.sleekpigeons.com/d/xdlNPjXmk/nginx">status</a></li>
      </ul>
    </nav>`;

  const style = document.createElement('template');
  style.innerHTML = `
    <style>
      nav {
        grid-area: navbar;
        background-color: var(--dark-color);
        height: 3em;
        display: grid;
        grid-template-columns: 1fr 5fr 1fr;
        grid-template-rows: auto;
        grid-template-areas:
          ". menu ."
        ;
      }
      nav > ul {
        grid-area: menu;
        list-style: none;
        margin: 0px;
        padding: 0 10px;
        display: flex;
        height: 100%;
        align-items: center;
      }
      nav li {
        color: var(--background-color);
        flex: 1;
        font-family: var(--font-headings);
      }
      nav li:first-child {
        font-weight: bold;
        font-size: 2em;
      }
      nav li:last-child {
        text-align: right;
      }
      nav a {
        text-decoration: none;
        color: var(--background-color);
      }
      nav a:hover {
        background-color: var(--shade-light-color);
      }
    </style>`;

  customElements.define('sleek-nav', SleekNav);
})();
