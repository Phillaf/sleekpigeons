class SleekDevelopment extends HTMLElement {

  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });
    this.news = document.createElement('ul');
    shadow.appendChild(this.news);
    shadow.appendChild(style.content.cloneNode(true));
  };

  async connectedCallback() {
    const symbol = new URL(window.location.href).pathname.substring(7);
    const response = await fetch(`/api/v1/major-development?symbol=${symbol}`);
    const data = await response.json();
    this.news.innerHTML = await this.getNews(data.majorDevelopment);
  }

  getNews = async (developments) => {
    let html = "";
    developments.forEach(development => {
      html += this.createArticle(development);
    });
    return html;
  }

  createArticle = (development) => (
    `<li class="development">
       <p class="datetime">${new Date(development.datetime).toLocaleDateString("en-CA")}</p>
       <p class="headline">${development.headline}</p>
       <p class="description">${this.capitalizeSentences(development.description)}</p>
     </li>`
  );

  capitalizeSentences = (description) => {
    return description.toString().toLowerCase().replace( /(^|\. *)([a-z])/g, (match, separator, char) => {
      return separator + ' ' + char.toUpperCase();
    });
  }
}

const style = document.createElement('template');
style.innerHTML = `
  <style>
    ul {
      list-style: none;
      word-break: break-word;
      margin: 0;
      padding: 0;
    }
    .datetime {
      background: var(--medium-color);
      color: var(--background-color);
      font-family: var(--font-headings);
      padding: 0.5em 1em 0.2em;
      margin: 0;
      border-radius: var(--border-radius) var(--border-radius) 0 0;
      display: inline-block;
    }
    .headline {
      background: var(--medium-color);
      color: var(--background-color);
      font-family: var(--font-headings);
      font-size: 1em;
      margin: 0;
      padding: 0.5em 1em;
      border-radius: 0 var(--border-radius) var(--border-radius) var(--border-radius);
      position: relative;
    }
    </style>`;

customElements.define('sleek-development', SleekDevelopment);
export {SleekDevelopment};
