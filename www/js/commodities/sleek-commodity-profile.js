class SleekCommodityProfile extends HTMLElement {

  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });
    this.heading = document.createElement('div');
    this.description = document.createElement('div');
    shadow.appendChild(this.heading);
    shadow.appendChild(this.description);
    shadow.appendChild(style.content.cloneNode(true));
    window.addEventListener("commodity-datasource-updated", this.update, false);
    window.addEventListener("commodity-meta-loaded", this.load, false);
  };

  update = (event) => {
    const source = event.detail.commodity.sources.find(source => source.code === event.detail.source);
    this.heading.innerHTML = `
      <h1>${event.detail.commodity.name}</h1>
      <h2>${source.name}</h2>`;
    this.description.innerHTML = `<p>loading</p>`;
  }

  load = (event) => {
    const description = event.detail.meta.description;
    this.description.innerHTML = `<p>${description}</p>`;
  }

}

const style = document.createElement('template');
style.innerHTML = `<style></style>`;

customElements.define('sleek-commodity-profile', SleekCommodityProfile);
export {SleekCommodityProfile};
