(function(){
'use strict';

  class SleekNews extends HTMLElement {

    constructor() {
      super();
      const shadow = this.attachShadow({ mode: 'open' });
      const news = document.createElement('ul');
      this.getNews().then(html => {
        news.innerHTML = html;
        shadow.appendChild(news);
      });
      shadow.appendChild(style.content.cloneNode(true));
    };

    getNews = async () => {
      const response = await fetch(this.getAttribute('src'));
      const articles = await response.json();
      let html = "";
      articles.forEach(article => {
        html += this.createArticle(article);
      });
      return html;
    }

    createArticle = (article) => (
      `<li class="article">
         <a href="${article.url}">
           <img class="thumbnail" src="${article.image}"/>
           <div class="details">
             <p class="category">${article.category}</p>
             <p class="datetime">${new Date(article.datetime * 1000).toLocaleDateString("en-CA")}</p>
             <h3 class="headline">${article.headline}</h3>
             <p class="summary">${article.summary}</p>
             <p class="source">${article.source}</p>
           </div>
         </a>
       </li>`
    );

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
      a{
        color: var(--dark-colof);
        display: flex;
        flex-wrap: wrap;
        text-decoration: none;
      }
      a:hover {
        background-color: var(--shade-light-color);
      }
      .thumbnail {
        padding: 10px;
        height: auto;
        max-height: 300px;
        width: 100%;
        object-fit: cover;
        overflow: hidden;
        flex: 1 1 200px;
      }
      .details {
        padding: 10px;
        flex: 30 1 300px;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        align-items: center;
      }
      p {
        margin: 0.2em 0;
      }
      .category {
        background-color: var(--light-color);
        color: var(--background-color);
        font-family: var(--font-headings);
        line-height: 2;
        padding: 0 1em;
        border-radius: var(--border-radius);
      }
      .headline {
        background: var(--medium-color);
        color: var(--background-color);
        font-family: var(--font-headings);
        font-size: 1em;
        margin: 0;
        padding: 0.5em 1em;
        border-radius: var(--border-radius);
        flex-basis: 100%;
        position: relative;
      }
      .summary {
        max-height: 10em;
        overflow: hidden;
        flex-basis: 100%;
      }
      </style>`;

  customElements.define('sleek-news', SleekNews);
})();
