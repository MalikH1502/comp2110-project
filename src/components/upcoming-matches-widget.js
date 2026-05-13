
import { LitElement, html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';
import { API_KEY } from '../config.js';

const FALLBACK_MATCHES = [
  {
    utcDate: '2026-05-20T14:00:00Z',
    status: 'SCHEDULED',
    homeTeam: { name: 'Liverpool' },
    awayTeam: { name: 'Manchester City' }
  },
  {
    utcDate: '2026-05-21T16:30:00Z',
    status: 'SCHEDULED',
    homeTeam: { name: 'Chelsea' },
    awayTeam: { name: 'Arsenal' }
  },
  {
    utcDate: '2026-05-22T19:00:00Z',
    status: 'SCHEDULED',
    homeTeam: { name: 'Tottenham' },
    awayTeam: { name: 'Manchester United' }
  }
];

class UpcomingMatches extends LitElement {
  static properties = {
    matches: { type: Array },
    loading: { type: Boolean },
    errorMessage: { type: String },
    useFallback: { type: Boolean }
  }

  static styles = css`

    .widget {
      background: #1f1f1f;
      color: white;
      padding: 16px;
      border-radius: 12px;
      width: 280px;
      margin: 20px auto;
      font-family: Arial;
      box-shadow: 0 4px 10px rgba(0,0,0,0.3);
    }

    @media (max-width: 600px) {
      .widget {
        width: 98%;
        padding: 10px;
      }
    }

    h2 {
      margin-bottom: 18px;
  font-size: 24px;
  font-weight: 700;
  letter-spacing: 0.5px;
    }

    .match {
      background: #2b2b2b;
      border-left: 3px solid #4caf50;
      padding: 8px 10px;
      border-radius: 8px;
      margin-bottom: 8px;
      transition: transform 0.2s ease;
    }
      .match:hover {
  transform: translateY(-2px);
}

    .teams {
      font-size: 13px;
  font-weight: 600;
  color: #ffffff;
    }

    .date {
       margin-top: 3px;
  color: #b5b5b5;
  font-size: 11px;
    }
      .badge {
      background: #1a3d1a;
      color: #4caf50;
      font-size: 11px;
      padding: 2px 8px;
      border-radius: 6px;
    }

    .note {
      color: #b0d8ff;
      font-size: 13px;
      margin-bottom: 12px;
    }

    .loading, .error {
      color: #bbbbbb;
      font-size: 14px;
    }

  `;


  constructor() {
    super();
    this.matches = [];
    this.loading = true;
    this.errorMessage = '';
    this.useFallback = false;
  }

  connectedCallback() {
    super.connectedCallback();
    this.fetchMatches();
  }

  async fetchMatches() {
    const API_URL = 'http://localhost:8010/proxy/v4/competitions/PL/matches';


    try {
      const response = await fetch(API_URL, {
        headers: {
          'X-Auth-Token': API_KEY
        }
      });

      if (!response.ok) {
        throw new Error(`API request failed: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      const liveMatches = Array.isArray(data.matches)
  ? data.matches.filter(match => match.status === 'SCHEDULED' || match.status === 'TIMED').slice(0, 3)
  : [];

      if (liveMatches.length > 0) {
        this.matches = liveMatches;
        this.errorMessage = '';
        this.useFallback = false;
      } else {
        this.matches = [];
        this.errorMessage = 'No upcoming matches are available right now.';
      }
    } catch (error) {
      console.error(error);
      this.matches = FALLBACK_MATCHES;
      this.errorMessage = 'Live match data unavailable; showing sample match schedule.';
      this.useFallback = true;
    } finally {
      this.loading = false;
    }
  }

  render() {
    if (this.loading) {
      return html`
        <div class="widget">
          <p>Loading matches...</p>
        </div>
      `;
    }

    if (this.errorMessage && !this.matches.length) {
      return html`
        <div class="widget">
          <h2>Upcoming Matches</h2>
          <p>${this.errorMessage}</p>
        </div>
      `;
    }

    return html`
      <div class="widget">
        <h2>Upcoming Matches</h2>
        ${this.errorMessage && this.matches.length ? html`<p class="note">${this.errorMessage}</p>` : ''}
        ${this.matches.map(match => html`
          <div class="match">
            <div class="teams">
              ${match.homeTeam?.name || 'Home'} vs ${match.awayTeam?.name || 'Away'}
            </div>
            <div class="date">
              ${new Date(match.utcDate).toLocaleString()}
            </div>
          </div>
        `)}
      </div>
    `;
  }
}

customElements.define('upcoming-matches-widget', UpcomingMatches);

