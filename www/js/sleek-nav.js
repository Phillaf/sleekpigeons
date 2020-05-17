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
      <a id="logo" href="/">sleekpigeons</a></li>
      <ul id="navbar">
        <li><a href="/logs">logs</a></li>
        <li><a href="http://status.sleekpigeons.com/d/xdlNPjXmk/nginx">status</a></li>
      </ul>
    </nav>`;

  const style = document.createElement('template');
  style.innerHTML = `
    <style>
      nav {
        background-color: var(--dark-color);
        height: 3em;
        display: flex;
      }
      #logo {
        font-weight: bold;
        font-size: 2em;
        font-family: var(--font-headings);
        text-decoration: none;
        color: var(--background-color);
        flex: 1;
      }
      ul {
        list-style: none;
        margin: 0px;
        flex: 1;
        display: flex;
        justify-content: flex-end;
      }
      li {
        color: var(--background-color);
        font-family: var(--font-headings);
        flex: auto;
        display: flex;
      }
      li > a {
        text-decoration: none;
        color: var(--background-color);
        flex: 1;
        text-align: center;
        line-height: 3em;
      }
      a:hover {
        background-color: var(--medium-color);
      }
    </style>`;

  customElements.define('sleek-nav', SleekNav);
})();
