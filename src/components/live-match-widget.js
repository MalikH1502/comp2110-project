import { LitElement, html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';

class LiveMatchWidget extends LitElement{
    static properties = {
        header: {type: String},
        matches: {type: Array},
        loading: {type: Boolean},
        error: {type:String}
    }


    static styles = css`
    :host {
        display: block;
        width: 250px;
        height: 250px;
        background-color: azure;
    }
  `;

    constructor() {
        super();
        this.header = 'Live Matches'
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
        }
        connectedCallback(){
            super.connectedCallback();
            this.getMatches();
        }
        render(){
            if (this.matches.length >0){
            return html`
            <div>
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
                        <h3>No Live Matches!</h3>
                        </div>`
                }}
        

    }
    customElements.define('live-match-widget', LiveMatchWidget);
