class SleekCommodityProfile extends HTMLElement {

  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });
    this.profile = document.createElement('div');
    this.profile.className = "profile";
    shadow.appendChild(this.profile);
    shadow.appendChild(style.content.cloneNode(true));
    window.addEventListener("commodity-datasource-loaded", this.load, false);
  };

  load = (event) => {
    const commodity = event.detail.commodity;
    this.profile.innerHTML = this.createProfile(commodity);
  }

  createProfile = (commodity) => (`
    <div class="title">
      <h1>${commodity.name}</h1>
    </div>`
  );

}

const style = document.createElement('template');
style.innerHTML = `
  <style>
  </style>`;

customElements.define('sleek-commodity-profile', SleekCommodityProfile);
export {SleekCommodityProfile};
