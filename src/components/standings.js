import { LitElement, html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';

const API_KEY = '4288983b2fb141ac93fa54d3624888e1';
class Standings extends LitElement {

    static properties = {
        league: { type: String },
        _data: { state: true }
    }

    static styles = css`
    :host {
        display: block;
        padding: 1rem;
    }

    
    :host p {
        position: relative;
        top: -50px;
        text-align: right;
        padding-right: 10px;
        z-index: 0;
        color: white;
    }
        
    table {
        width: 100%;
        border-collapse: collapse;
        }
    th, td {
        border: 1px solid #ccc;
        padding: 8px;
        text-align: left;
        }
    `;

    constructor() {
        super();
        this.league = "PL";
        this._data = undefined;
    }

    connectedCallback() {
        super.connectedCallback();
        this._fetch();
    }

    async _fetch() {

        try {
            const PROXY = "https://corsproxy.io/?url=";
            const BASE_URL = "https://api.football-data.org/v4/competitions/PL/standings";

            const response = await fetch(`${PROXY}${BASE_URL}`, {
                headers: { 'X-Auth-Token': API_KEY }
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            this._data = data;
        } catch (error) {
            console.error('Error fetching standings:', error);
        }

    }


    render() {
        if (this._data) {
            const standings = this._data.standings[0].table;
            return html`
            <div class ="widget"> 
            <h3>Premier League Standings</h3>
            <table>
                <tr>
                    <th>Position</th>  
                    <th>Team</th>
                    <th>Played</th>
                    <th>Won</th>
                    <th>Drawn</th>
                    <th>Lost</th>
                    <th>Points</th>
                </tr>
                
                ${standings.map(team => html`
                    <tr>
                        <td>${team.position}</td>
                        <td>${team.team.name}
                        <img src="${team.team.crest}" style="width: 20px; height: auto; ">
                        </td>
                        <td>${team.playedGames}</td>
                        <td>${team.won}</td>
                        <td>${team.draw}</td>
                        <td>${team.lost}</td>
                        <td>${team.points}</td>
                    </tr>
                `)}
            </table>
            </div>
            `;
        } else {
            return html`<p>Loading...</p>`;
        }
    }
}

customElements.define('league-standings', Standings);