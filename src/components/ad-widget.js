import {LitElement, html, css} from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';
import { BASE_URL_AD_SERVER } from '../config.js';

class AdWidget extends LitElement {
  static properties = {
    adUrl: { type: String },
  }

  static styles = css`
    :host {
        display: block;
        width: 250px;
        height: 1300px;
        background-color: azure;
        position: relative;
        overflow: hidden;
        border-radius: 4px; 
        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }

    img {
        width: 100%;
        height: 100%;
        object-fit: cover; 
        display: block;
    }

    :host p {
      position: absolute;
      bottom: 0;
      right: 0;
      margin: 0;
      background: rgba(0, 0, 0, 0.5);
      width: 100%;
      text-align: right;
      padding: 4px 10px;
      box-sizing: border-box;
      z-index: 1;
      color: white;
      font-size: 0.8rem;
    }
  `;

  constructor() {
    super();
    this.adUrl = `${BASE_URL_AD_SERVER}adserver`;
  }

  render() {
    return html`
  <div>
        <img src=${this.adUrl} alt="Advertisment">
        <p>Sponsored</p>
  </div>
    `;
  }
}

customElements.define('ad-widget',  AdWidget);