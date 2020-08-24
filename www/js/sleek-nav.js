class SleekNav extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });
    shadow.appendChild(style.content.cloneNode(true));
    shadow.appendChild(nav.content.cloneNode(true));
  };
}

const nav = document.createElement('template');
nav.innerHTML = `
  <nav>
    <a id="logo" href="/">sleekpigeons</a>
    <ul id="navbar">
      <li><a href="/stocks/US">stocks</a></li>
      <li><a href="/commodities">commodities</a></li>
      <li><a href="/logs">logs</a></li>
      <li><a href="http://status.sleekpigeons.com/d/xdlNPjXmk/nginx">status</a></li>
      <li><a href="https://github.com/Phillaf/sleekpigeons"><i class="fab fa-github"></i></a></li>
    </ul>
  </nav>`;

const style = document.createElement('template');
style.innerHTML = `
  <link rel="stylesheet" href="//use.fontawesome.com/releases/v5.14.0/css/all.css">
  <style>
    nav {
      background-color: var(--dark-color);
      line-height: 3em;
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
    }
    #logo {
      font-weight: bold;
      font-size: 2em;
      font-family: var(--font-headings);
      text-decoration: none;
      color: var(--background-color);
      display: inline-block;
    }
    ul {
      list-style: none;
      margin: 0px;
      padding: 0px;
      display: flex;
      flex-wrap: wrap;
    }
    li {
      color: var(--background-color);
      font-family: var(--font-headings);
    }
    li > a {
      text-decoration: none;
      color: var(--background-color);
      padding: 0 1em;
      display: inline-block;
    }
    a:hover {
      background-color: var(--medium-color);
    }
  </style>`;

customElements.define('sleek-nav', SleekNav);
export {SleekNav};
