import { LitElement, html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';
import './components/widget-block.js';
import './components/widget-column.js';
import './components/ad-widget.js';
import './components/upcoming-matches-widget.js';

class Comp2110Dashboard extends LitElement {
  static properties = {
    header: { type: String },
    imgurl: {type: String},
    imgalttext: {type: String},
    header2: {type:String},
    headerBefore: { type: String },
    headerAfter: { type: String }
  }

  static styles = css`
    :host {
      min-height: 100vh;   
      font-size: 14pt;
      color: #1a2b42;
      max-width: 960px;
      margin: 0 auto;
      text-align: left;
      background-color: lightgoldenrodyellow;
    }
    .headerbar{
    border-bottom: solid;
    border-width: thin;
    padding: 12px 16px;
    font-family: Inter, sans-serif;
    font-size: smaller;
    background-color: rgb(15, 23, 42);
    box-sizing: border-box;
    width: 100%;
    margin: 0;
    display: flex;
    align-items: center;
    border-color: #928888;

}
.headerbar h1{
    margin: 0;
    color: white;
    font-family: Roboto;
    font-style: Italic;
}
    .hamburger{
    background: transparent;
    border: none;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    gap: 5px;
    padding: 10px;
    margin-right: 30px;
    }
    .line{
    display: inline-block;
    width: 25px;
    height: 3px;
    background-color: #ffffff;
    border-radius: 2px;
    }
    
    main {
      display: flex;
    }

    .app-footer {
      font-size: calc(12px + 0.5vmin);
      align-items: center;
    }

    .app-footer a {
      margin-left: 5px;
    }
    .headerbar img{
      width: 40px;
    }
    .header-bar .header-ball,
    .headerbar h1 .header-ball{
      width: 28px;
      vertical-align: middle;
      margin: 0 -7px;
    }
    .headerbar h1 .header2{
      color: var(--header2-color, #5a8ebe);
    }
  `;

  constructor() {
    super();
    this.header = "Futb";
    this.header2 = "Tracker";
    this.imgurl = "https://freesvg.org/img/Gerald_G_Soccer_Ball.png";
    this.imgalttext = "soccerBall";
  }

  render() {
    return html`
        <div class = "headerbar">
          <h1>
            ${this.header}
            <img class="header-ball" src="${this.imgurl}" alt="${this.imgalttext}"> l
            <span class="header2">${this.header2}</span>
          </h1>
        
        </div>
      <main>
        <widget-column>
          <widget-block header="First Widget"></widget-block>
          <widget-block header="Second Widget"></widget-block>
          <widget-block header="Third Widget"></widget-block>
        </widget-column>
      
        <div>
          <p>Placeholder for main content</p>
          <p>Change anything and everything on this page</p>
        </div>

        <widget-column>
          <ad-widget></ad-widget>
          <upcoming-matches-widget matches="${[]}" ?loading = ${true} errorMessage =""></upcoming-matches-widget>
          <widget-block header="Fourth Widget"></widget-block>
          <widget-block header="Fifth Widget"></widget-block>
        </widget-column>
      </main>

      <p class="app-footer">
        A product of the COMP2110 Web Development Collective &copy; 2026
      </p>
    `;
  }
}

customElements.define('comp2110-dashboard', Comp2110Dashboard);