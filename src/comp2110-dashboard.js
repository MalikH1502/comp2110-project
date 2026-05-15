import { LitElement, html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';
import './components/widget-block.js';
import './components/widget-column.js';
import './components/ad-widget.js';
import './components/league-standings.js';
import './components/upcoming-matches-widget.js';
import './components/live-match-widget.js';
import './components/top-scorers.js';

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
      font-family: Inter;
    }
    .headerbar{
    border-bottom: solid;
    border-width: thin;
    padding: 12px 16px;
    font-family: Inter, sans-serif;
    font-size: smaller;
    background-color: rgb(31, 31, 31);
    box-sizing: border-box;
    width: 100vw;
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
      color: var(--header2-color, #4caf50);
    }
  `;

  constructor() {
    super();
    this.header = "Fútb";
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
          <live-match-widget header="Live Matches" .matches=${[]} ?testing=${true} ?loading=${true} error=""></live-match-widget>
          <league-standings league = "PL" _data = "undefined"></league-standings>
          <top-scorers></top-scorers>
        </widget-column>
      


        <widget-column>
          <ad-widget></ad-widget>
          <upcoming-matches-widget matches="${[]}" ?loading = ${true} errorMessage =""></upcoming-matches-widget>
          <widget-block header="Fourth Widget"></widget-block>
        </widget-column>
      </main>

      <p class="app-footer">
        A product of the COMP2110 Web Development Collective &copy; 2026
      </p>
    `;
  }
}

customElements.define('comp2110-dashboard', Comp2110Dashboard);