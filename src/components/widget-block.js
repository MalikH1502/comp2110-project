import { LitElement, html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';

class WidgetBlock extends LitElement {
  static properties = {
    header: { type: String },
  }

  static styles = css`
    :host {
        display: block;
        width: 900px;
        height: 250px;
        background-color: azure;
        margin: 0px 10px 0px 10px;
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