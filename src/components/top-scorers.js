import { LitElement, html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';
import { API_KEY } from '../config.js';

class TopScorers extends LitElement {

  // reactive state for this component
  // players = list from api
  // loading = show loading text
  // error = store error message if api fails
  static properties = {
    players: { type: Array },
    loading: { type: Boolean },
    error: { type: String }
  };

  constructor() {
    super();
    this.players = []; // store scorers here after fetch
    this.loading = true; // start as loading
    this.error = ""; // no error at start
  }

  // styling for the widget
  static styles = css`
    :host {
      display: block;
      width: 40vw;
      margin: 20px auto;
      background-color: rgb(31, 31, 31);
      border: solid 3px rgb(223, 238, 240);
      border-radius: 12px;
      font-family: Inter;
      color: white;
    }

    h2 {
      margin: 0;
      padding: 10px;
      font-size: 22px;
      font-weight: 700;
    }

    ul {
      padding: 0;
      margin: 10px 0;
    }

    li {
      list-style: none;
    }

    .card {
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: #2b2b2b;
      margin: 8px auto;
      padding: 10px 16px;
      width: 90%;
      border-radius: 8px;
      border-left: 3px solid #4caf50;
      transition: 0.2s;
    }
    
    .card:hover {
      transform: translateY(-2px);
    }

    .left {
      display: flex;
      gap: 10px;
      align-items: center;
    }

    .rank {
      color: #aaa;
      font-size: 12px;
      width: 20px;
    }

    .info {
      display: flex;
      flex-direction: column;
    }

    .name {
      font-weight: 600;
      font-size: 13px;
    }

    .team {
      font-size: 11px;
      color: #bbb;
    }

    .goals {
      color: #4caf50;
      font-weight: bold;
    }

    p {
      text-align: center;
      font-size: 12px;
      color: #888;
    }
  `;

  // fetch top scorers from football-data api
  async getScorers() {
    try {
      // proxy is needed to avoid cors error in browser
      const PROXY = 'https://corsproxy.io/?url=';
      const BASE_URL = 'https://api.football-data.org/v4';

      // call api for premier league scorers (limit 10)
      const response = await fetch(
        `${PROXY}${BASE_URL}/competitions/PL/scorers?limit=10`,
        {
          headers: {
            'X-Auth-Token': API_KEY // api key from config file
          }
        }
      );

      // if request fails, throw error
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      // convert response to json
      const data = await response.json();

      // store scorers into players array
      this.players = data.scorers;

      // stop loading after data arrives
      this.loading = false;

    } catch (error) {
      // if something goes wrong, save error message
      this.error = error.message;

      // also stop loading
      this.loading = false;
    }
  }

  // runs once when component is added to page
  connectedCallback() {
    super.connectedCallback();
    this.getScorers();
  }

  // render ui based on state
  render() {

    // show loading text while fetching data
    if (this.loading) {
      return html`<p>Loading Scorers...</p>`;
    }

    // show error if api fails
    if (this.error) {
      return html`<p>error: ${this.error}</p>`;
    }

    // show players list if data exists
    if (this.players.length > 0) {
      return html`
        <div>
          <h2>Top Scorers</h2>

          <ul>
            ${this.players.map((p, index) => html`

              <li class="card">

                <div class="left">

                  <!-- player ranking -->
                  <div class="rank">
                    ${index + 1}
                  </div>

                  <!-- player info -->
                  <div class="info">
                    <div class="name">${p.player.name}</div>
                    <div class="team">${p.team.name}</div>
                  </div>

                </div>

                <!-- goals scored -->
                <div class="goals">
                  ${p.goals} ⚽
                </div>

              </li>

            `)}
          </ul>
        </div>
      `;
    }

    // fallback if no data found
    return html`<p>no scorers found</p>`;
  }
}

// register custom element
customElements.define('top-scorers', TopScorers);