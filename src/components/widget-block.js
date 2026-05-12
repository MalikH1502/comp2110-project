import { LitElement, html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';

class WidgetBlock extends LitElement {
  static properties = {
    header: { type: String },
  }

  static styles = css`
   :host {
        display: block;
        width: 45vw;
        height: 250px;
        background-color: azure;
        border-style: solid;
        border-color: rgb(223, 238, 240);
        border-radius: 0 0 5px 5px;
        margin: 1vw 2.5vw 1vw .5vw

    }
  `;

  constructor() {
    super();
    this.header = 'Widget';
  }

  render() {
    return html`
        <h3>${this.header}</h3>
    `;
  }
}

customElements.define('widget-block', WidgetBlock);