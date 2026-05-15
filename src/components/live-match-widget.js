import { LitElement, html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';
import { API_KEY } from '../config.js';
class LiveMatchWidget extends LitElement {
    // properties dec
    static properties = {
        header: { type: String },
        matches: { type: Array },
        testing: { type: Boolean },
        loading: { type: Boolean },
        error: { type: String }
    }


    static styles = css`
        :host
        {
            display: block;
            width: 40vw;
            height: auto;
            margin: 20px auto;
            background-color: rgb(31, 31, 31);
            border-style: solid;
            border-color: rgb(223, 238, 240);
            border-radius: 12px;
            font-family:Inter;
        }

        body
        {
            font-family:Inter, sans-serif;
        
        }
        h2
        {
            margin-top: 0px;
            padding: 10px;
            border-width: 1px;
            margin-bottom: 0px;
            font-size: 24px;
            font-weight: 700;
            letter-spacing: 0.5px;
            color:white;
        }

        p
        {
            font-size: small;
            text-align: center;
            font-weight:bold;
            color:rgb(74,74,74);
        }
        
        ul
        {
            display: flex;
            justify-content: center;
            align-items: center;
            padding-left: 0;
            flex-direction: column;
            margin-top: 10px;
        }

        li
        {
            list-style-type: none;
            display: flex;
            align-items: center;
            width: auto;
            margin: 0px 0px 0px 15px;
        }

        .card
        {
            border-left: 3px solid #4caf50;
            background-color: #2b2b2b;
            margin: 0px 0px 10px 0px;
            display: flex;
            justify-content: center;
            height: auto;
            font-weight: 800;
            width: 90%;
            border-radius: 8px;
            padding-left:30px;
            transition: transform 0.2s ease;
            color: rgb(255,255,255);
        }

        .card:hover
        {
        transform: translateY(-2px);
        }


        .live-badge
        {
            display: inline-flex;
            float: right;
            align-items: center;
            gap: 6px;
            background-color: #2b2b2b;
            color: rgb(197, 71, 42);
            padding: 4px 10px;
            border-radius: 999px;
            font-size: small;
            line-height: 1;
            margin-left: 0;
            margin-bottom: 0px;
        }
    
        .live-dot 
        {
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background-color: rgb(197, 71, 42);
            animation: pulse 2s infinite;
            transform: scale(1);
        }

    @keyframes pulse {
        0% {
            transform: scale(0.95);
            box-shadow: 0 0 0 0 rgba(222, 84, 72, 0.7);
        }
        70% {
            transform: scale(1);
            box-shadow: 0 0 0 10px rgba(222, 84, 72, 0);
        }
        100% {
            transform: scale(0.95);
            box-shadow: 0 0 0 0 rgba(222, 84, 72, 0);
        }
    }
        
        .minute
        {
            margin-left: auto;
            font-size: small;
            color: #b5b5b5;
            font-style: bold;
            padding-right: 10px;
        }

        .score
        {
            color: #4caf50;
            font-weight: 700;
            margin: 15px;
            font-size: larger;
        }`;

    constructor() { //initialise object
        super();
        this.header = 'Live Matches'
        this.testing = true;
        this.matches = [];
        this.loading = true;
    }

    async getMatches() {
            try {
            // proxy to bypass CORS errors
            const PROXY = 'https://corsproxy.io/?url=';
            const BASE_URL = 'https://api.football-data.org/v4';

            const response = await fetch(
                `${PROXY}${BASE_URL}/competitions/PL/matches?status=LIVE`,
                {
                    headers: { 'X-Auth-Token': API_KEY }
                });

            if (!response.ok) {
                throw new Error(`HTTP ${response.status}`);
            }

            const data = await (response.json());
            this.matches = data.matches;
            this.loading = false;
        }

        catch (error) {
            this.error = error.message;
        }
        // If testing mode is enabled, skip the network call and use placeholder data
        if (this.testing) {
            this.matches = [
                { score: { fullTime: { home: '3', away: '2' } }, homeTeam: { shortName: 'ALP' }, awayTeam: { shortName: 'BET' }, minute: '12' },
                { score: { fullTime: { home: '3', away: '2' } }, homeTeam: { shortName: 'GMA' }, awayTeam: { shortName: 'DEL' }, minute: '78' }
            ];
        }
    }
    connectedCallback() {
        super.connectedCallback();
        this.getMatches();
    }

    // final render method
    render() {
        if (this.loading) {
            return html`
            <p> Loading matches..</p>`
        }

        if (this.error) {
            this.loading = false;
            return html`
            <p> Error: ${this.error}<p>`
        }

        // if there is a live match
        if (this.matches.length > 0) {
            return html`
            <div>
                <h2>
                    Live Match Scores
                    <span class="live-badge"><span class="live-dot"></span>Live</span>
                </h2>
                    <img src="src/resources/pleaguelogo.png" 
                        style="display: block; margin-left: auto; margin-right: auto; height: 42px; width: auto;">                </p>
                <ul>
                    ${this.matches.map((match) => html`
                            <li class = "card">
                                ${match.homeTeam?.shortName ?? 'Home'}
                                <span class = "score">
                                ${match.score?.fullTime?.home ?? 0}
                                -
                                ${match.score.fullTime.away ?? 0}
                                </span>
                                ${match.awayTeam?.shortName ?? 'Away'}
                                <span class="minute">
                                ${match.minute ?? '-'}'
                                </span>
                            </li>
                    `)}
                    </ul>
            </div>`;
        }

        else {
            return html`
                        <div>
                            <h3>No Live Matches!</h3>
                        </div>`
        }
    }


}
customElements.define('live-match-widget', LiveMatchWidget);
