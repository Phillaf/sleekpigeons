class SleekGauge extends HTMLElement {
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: 'open' });
    this.stylesheet = document.createElement('style')
    this.shadow.appendChild(this.stylesheet);
    this.gauge = document.createElement('div')
    this.gauge.setAttribute('class', 'gauge');
    this.shadow.appendChild(this.gauge);
  };

  async connectedCallback() {
    const Module = await import(this.getAttribute('api'))
    const data = await Module.getData();
    this.stylesheet.innerHTML = this.createStyle(data);
    this.gauge.innerHTML = this.createGauge(data);
  }

  createGauge = (data) => (`
    <p>${data.gaugeTitle}: ${Math.round(data.gauge * 100)}%</p>
    <div class="mask">
      <div class="semi-circle"></div>
      <div class="semi-circle-mask"></div>
      <div class="arrow"></div>
    </div>
    <p>${data.arrowTitle}: ${Math.round(data.arrow * 100)}%</p>`
  );

  createStyle = (data) => (`
    :host {
      --outer-size: 12em;
      --inner-size: 11em;
      --arrow-thickness: 0.3em;
      --half-gauge-thickness: calc(calc(var(--outer-size) - var(--inner-size))/4);
      --rotation: ${data.gauge * 180}deg;
      --rotation-arrow: ${data.arrow * 180}deg;
    }
    .gauge{
      display: flex;
      flex-direction: column;
      width: 12em;
    }
    p {
      text-align: center;
    }
    .mask {
      position: relative;
      overflow:hidden;
    }
    .semi-circle {
      position: relative;
      width: var(--outer-size);
      height: calc(var(--outer-size) / 2);
      background: var(--light-color);
      border-radius: 50% 50% 50% 50%/100% 100% 0% 0%;
    }
    .semi-circle::before {
      content: "";
      position: absolute;
      bottom: 0;
      left: 50%;
      z-index: 2;
      width: var(--inner-size);
      height: calc(var(--inner-size) / 2);
      margin-left: calc(calc(var(--inner-size) / 2) * -1);
      background: var(--background-color);
      border-radius: 50% 50% 50% 50%/100% 100% 0% 0%;
    }
    .semi-circle-mask {
      position: absolute;
      top: 0;
      left: 0;
      width: var(--outer-size);
      height: var(--outer-size);
      background: transparent;
      transform: rotate(var(--rotation));
      transform-origin: center;
      backface-visibility: hidden;
    }
    .semi-circle-mask::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      z-index: 2;
      width: var(--outer-size);
      height: calc(var(--outer-size) / 2);
      margin: -1px 0 0 -1px;
      background: var(--shade-light-color);
      border-radius: 50% 50% 50% 50%/100% 100% 0% 0%;
    }
    .arrow {
      position: absolute;
      z-index: 3;
      bottom: 0;
      left: calc(var(--half-gauge-thickness) - calc(var(--arrow-thickness) / 2));
      width: calc(calc(var(--inner-size)/2) + var(--half-gauge-thickness));
      height: var(--arrow-thickness);
      background: var(--shade-dark-color);
      transform: rotate(var(--rotation-arrow));
      transform-origin: center right;
    }`
  );
}

customElements.define('sleek-gauge', SleekGauge);
export {SleekGauge};
