import { LitElement, html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';

class WidgetColumn extends LitElement {

  static styles = css`
    :host {
      margin: 10px;
    }
  `;

  constructor() {
    super();
  }

  render() {
    return html`
      <div>
        <slot></slot>
      </div>
    `;
  }
}

customElements.define('widget-column', WidgetColumn);