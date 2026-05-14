import { LitElement, html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';
import { API_KEY } from '../config.js';
class LiveMatchWidget extends LitElement {
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
            width: 45vw;
            height: 250px;
            margin: 1vw 2.5vw 1vw .5vw;
            background-color: azure;
            border-style: solid;
            border-color: rgb(223, 238, 240);
            border-radius: 0 0 5px 5px;
        }

        h4
        {
            margin-top: 0px;
            padding: 10px;
            border-width: 1px;
            margin-bottom: 0px;
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
        }

        .card
        {
            background-color: rgb(228, 243, 252);
            margin: 0px 0px 10px 0px;
            display: flex;
            justify-content: center;
            height: 50px;
            font-weight: bold;
            width: 90%;
            border-radius: 8px;
        }

        .card li
        {
            display: flex;
            align-items: center;
            width: 100%;
            margin: 0px 0px 0px 15px;
        }

        .live-badge
        {
            display: inline-flex;
            float: right;
            align-items: center;
            gap: 6px;
            background-color: rgb(247, 233, 232);
            color: rgb(197, 71, 42);
            padding: 4px 10px;
            border-radius: 999px;
            font-size: small;
            line-height: 1;
            margin-left: x;
            margin-bottom: 0px;
        }
    
        .live-dot
        {
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background-color: rgb(197, 71, 42);
        }

        .minute
        {
            margin-left: auto;
            font-size: small;
            color: rgb(74, 74, 74);
            font-style: bold;
            padding-right: 10px;
        }

        .score
        {
            color: rgb(46, 68, 178);
            font-weight: 700;
            margin: 15px;
            font-size: larger;
        }`;

    constructor() {
        super();
        this.header = 'Live Matches'
        this.testing = true;
        this.matches = [];
    }

    async getMatches() {
        try {
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

        if (this.matches.length > 0) {
            return html`
            <div>
                <h4>
                    Live Match Scores
                    <span class="live-badge"><span class="live-dot"></span>Live</span>
                </h4>
                <p>
                    Premier League
                </p>
                <ul>
                    ${this.matches.map((match) => html`
                        <div class = "card">
                            <li>
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
                        </div>
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
