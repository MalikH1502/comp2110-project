import { LitElement, html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';

class AdWidget extends LitElement {
  static properties = {
    currentAd: { type: Object, state: true },
    isFading: { type: Boolean, state: true }
  }

  static styles = css`
    :host {
      display: block;
      width: 250px;
      height: 1000px;
      background-color: #1a1a1a;
      position: relative;
      overflow: hidden;
      border-radius: 8px;
      box-shadow: 0 4px 6px rgba(0,0,0,0.1);
      font-family: 'Inter', sans-serif;
    }

    .ad-container {
      width: 100%;
      height: 100%;
      position: relative;
      transition: opacity 0.5s ease-in-out;
      opacity: 1;
    }

    .ad-container.fade-out {
      opacity: 0;
    }

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 0;
    }

    .overlay {
      position: absolute;
      inset: 0;
      background: linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.8) 100%);
      z-index: 1;
    }

    .ad-content {
      position: absolute;
      bottom: 40px;
      left: 0;
      width: 100%;
      padding: 20px;
      box-sizing: border-box;
      z-index: 2;
      color: white;
      text-align: center;
    }

    h3 {
      margin: 0 0 15px 0;
      font-size: 1.5rem;
      font-weight: 800;
      line-height: 1.2;
      text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
    }

    .cta-button {
      display: inline-block;
      background-color: #ffaa00;
      color: #000;
      padding: 10px 20px;
      border-radius: 20px;
      font-weight: bold;
      font-size: 0.9rem;
      text-transform: uppercase;
      box-shadow: 0 2px 4px rgba(0,0,0,0.3);
    }

    .sponsor-tag {
      position: absolute;
      bottom: 0;
      right: 0;
      margin: 0;
      background: rgba(0,0,0,0.8);
      width: 100%;
      text-align: right;
      padding: 6px 10px;
      box-sizing: border-box;
      z-index: 2;
      color: #aaa;
      font-size: 0.7rem;
      text-transform: uppercase;
      letter-spacing: 1px;
    }
  `;

  constructor() {
    super();
    this.isFading = false;

    this.adInventory = [
      { url: 'src/resources/pexels-daniel-agundiz-2159069831-35927933.jpg', headline: 'Gear Up for the New Season!', cta: 'Shop Cleats' },
      { url: 'src/resources/pexels-rdne-7188091.jpg', headline: 'Hydration for Peak Performance.', cta: 'Buy Now' },
      { url: 'src/resources/izuddin-helmi-adnan-K5ChxJaheKI-unsplash.jpg', headline: 'Global Sports News 24/7', cta: 'Read More' },
      { url: 'src/resources/amit-lahav-6I-HWjwn-hk-unsplash.jpg', headline: 'Live Odds & Match Predictions', cta: 'View Odds' },
      { url: 'src/resources/javid-naderi-xShLnB1e9KU-unsplash.jpg', headline: 'Official Club Merchandise', cta: 'Shop Kits' }
    ];

    this.currentAd = this.getRandomAd();
  }

  connectedCallback() {
    super.connectedCallback();
    this._refreshInterval = setInterval(() => this.rotateAd(), 15000);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    clearInterval(this._refreshInterval);
  }

  getRandomAd() {
    return this.adInventory[Math.floor(Math.random() * this.adInventory.length)];
  }

  rotateAd() {
    this.isFading = true;
    setTimeout(() => {
      let next = this.getRandomAd();
      while (next.url === this.currentAd.url) next = this.getRandomAd();
      this.currentAd = next;
      this.isFading = false;
    }, 500);
  }

  render() {
    return html`
      <div class="ad-container ${this.isFading ? 'fade-out' : ''}">
        <img src="${this.currentAd.url}" alt="Advertisement background">
        <div class="overlay"></div>
        <div class="ad-content">
          <h3>${this.currentAd.headline}</h3>
          <div class="cta-button">${this.currentAd.cta}</div>
        </div>
        <p class="sponsor-tag">Sponsored</p>
      </div>
    `;
  }
}

customElements.define('ad-widget', AdWidget);