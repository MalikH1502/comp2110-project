import { LitElement, html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';

class LiveMatchWidget extends LitElement{
    static properties = {
        header: {type: String},
        matches: {type: Array},
        testing: {type: Boolean},
        loading: {type: Boolean},
        error: {type:String}
    }


    static styles = css`
    :host {
        display: block;
        width: 250px;
        height: 250px;
        background-color: azure;
        border-style: solid;
        border-color: rgb(223, 238, 240);
        border-radius: 0 0 5px 5px;
    }
    h3{
        margin-top: 0px;
        padding: 10px;
        background-color: rgb(249, 250, 252);
        border-color: rgb(223, 238, 240);
        border-style: hidden hidden solid;
        border-width: 1px;
    }
        
  `;

    constructor() {
        super();
        this.header = 'Live Matches'
        this.testing = true;
        this.matches = [];
    }

    async getMatches(){
        try{
            const response = await fetch(
                "https://api.football-data.org/v4/matches?status=LIVE",
                {
                    method: 'GET'
                }
            );

            if (!response.ok){
                throw new Error(`HTTP ${response.status}`)
            }

            const data = await(response.json());
            this.matches = data.matches;
        }
        catch (error){
            console.log("Error", error);
        }
        // If testing mode is enabled, skip the network call and use placeholder data
        if (this.testing) {
            this.matches = [
                { homeTeam: { shortName: 'ALP' }, awayTeam: { shortName: 'BET' }, minute: '12' },
                { homeTeam: { shortName: 'GMA' }, awayTeam: { shortName: 'DEL' }, minute: '78' }
            ];
            return;
        }
        }
        connectedCallback(){
            super.connectedCallback();
            this.getMatches();
        }
        render(){
            if (this.matches.length >0){
            return html`
            <div>
            <h3> Live Scores</h3>
                <ul>
                    ${this.matches.map((match) => html`
                        <li>
                            ${match.homeTeam?.shortName ?? 'Home'}
                            vs
                            ${match.awayTeam?.shortName ?? 'Away'}
                            (${match.minute ?? '-'}')
                            </li>
                            `)}
                            </ul>
                            </div>
                            `;
                    }

                else{
                    return html`
                    <div>
                        <h3>
                        No Live Matches!</h3>
                        </div>`
                }}
        

    }
    customElements.define('live-match-widget', LiveMatchWidget);
