import { LitElement, html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';
import { API_KEY } from '../config.js';

class Standings extends LitElement {

    static properties = {
        league: { type: String },
        _data: { state: true }
    }

    static styles = css`
    :host {
        display: block;
        width: 40vw;
        margin: 20px auto;
        background-color: rgb(31, 31, 31);
        border-style: solid;
        border-color: rgb(223, 238, 240);
        border-radius: 12px;
        font-family:Inter;
        color: white;
        box-shadow: 0 4px 10px rgba(0,0,0,0.3);
    }

    h2 {
        margin: 0;
        padding: 10px;
        font-size: 22px;
        font-weight: 700;
        }

    table {
        width: 100%;
        border-collapse: separate;
        border-spacing: 0 8px;
        padding: 10px;
    }

    th{
    
        padding: 8px 10px;
        font-size: 12px;
        text-align: left;
        color: #b5b5b5;
    }

     td {
        padding: 8px;
        font-size: 12px;
        vertical-align: middle;
    }
    
    tbody tr{
        background-color: #2b2b2b;
        transition: transform 0.2s ease;
    }

    tr:hover {
        transform: translateY(-2px);
        }

    tbody tr td:first-child {
        border-left: 3px solid #4caf50;
        border-top-left-radius: 8px;
        border-bottom-left-radius: 8px;
    }

    tbody tr td:last-child {
        border-top-right-radius: 8px;
        border-bottom-right-radius: 8px;
    }
    img{
        width: 20px;
        height: auto;
        vertical-align: middle;
        margin-right: 8px;
    }

    .position {
        color: #aaa;
        width: 30px;
    }

    .points {
        font-weight: bold;
        color: #4caf50;
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
            const standings = this._data?.standings[0]?.table?? [];
            return html`
            <h2>${this.league} League Standings</h2>
            <table>
            <thead>
                <tr>
                    <th>Position</th>  
                    <th>Team</th>
                    <th>Played</th>
                    <th>Won</th>
                    <th>Drawn</th>
                    <th>Lost</th>
                    <th>Points</th>
                </tr>
                </thead>

                <tbody>
                ${standings.map(team => html`
                    <tr>
                        <td class="position">${team.position}</td>
                       
                        <td>
                        <img src="${team.team.crest}" style="width: 20px; height: auto; ">
                        ${team.team.name}
                        </td>

                        <td>${team.playedGames}</td>
                        <td>${team.won}</td>
                        <td>${team.draw}</td>
                        <td>${team.lost}</td>
                        <td class="points">${team.points}</td>
                    </tr>
                `)}
                </tbody>
            </table>
            </div>
            `;
        } else {
            return html`<p>Loading...</p>`;
        }
    }
}

customElements.define('league-standings', Standings);