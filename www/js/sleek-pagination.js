class SleekPagination extends HTMLElement {
  constructor() {
    super();
    this.searchParams = new URLSearchParams(window.location.search);
    const shadow = this.attachShadow({ mode: 'open' });
    this.links = document.createElement('p');
    shadow.appendChild(this.links);
    shadow.appendChild(style.content.cloneNode(true));
    window.addEventListener(this.getAttribute('pagination-event') + "-init", this.init, false);
  };

  init = (event) => {
    this.pageCount = event.detail;
    const page = this.searchParams.get('page') ?? 1;
    this.createPages(page);
  }

  createPages = (current) => {
    const indexes = [1, +current-2, +current-1, +current, +current+1, +current+2, +this.pageCount];
    const clamped = indexes.map(x => {
      return Math.min(Math.max(x, 1), this.pageCount)
    });
    const numbers = [...new Set(clamped)];
    return this.numbersToLinks(numbers, current);
  }

  numbersToLinks = (numbers, current) => {
    this.links.innerHTML = '';
    numbers.forEach(page => {
      const child = page == current ? this.createSpan(page) : this.createLink(page);
      this.links.appendChild(child);
    });
  }

  changePage = (event) => {
    const page = event.target.innerHTML;
    this.searchParams.set("page", page);
    const newRelativePathQuery = window.location.pathname + '?' + this.searchParams.toString();
    window.history.pushState(null, '', newRelativePathQuery);
    this.createPages(page);
    this.dispatchPageChange(page);
    return false;
  }

  dispatchPageChange = (page) => {
    this.dispatchEvent(
      new CustomEvent(this.getAttribute('event') + "-page-change", {
        detail: +page,
        bubbles: true,
      })
    );
  }

  createLink = (page) => {
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.set("page", page);
    const link = document.createElement('a');
    link.innerHTML = page;
    link.onclick = this.changePage;
    link.href = window.location.pathname + '?' + searchParams.toString();
    return link;
  }

  createSpan = (page) => {
    const span = document.createElement('span');
    span.innerHTML = page;
    return span;
  }
}

const style = document.createElement('template');
style.innerHTML = `
  <style>
    a, span {
      padding: 0.5em;
      margin: 0.5em;
      text-decoration: none;
      background-color: var(--dark-color);
      color: var(--background-color);
      border-radius: var(--border-radius);
    }
    span {
      background-color: var(--medium-color);
    }
    p {
      text-align: center;
    }
  </style>`;

customElements.define('sleek-pagination', SleekPagination);
export {SleekPagination};
