import {LitElement, html, css} from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';


class Standings extends LitElement {

    static properties = {
        league: {type: String},
        _data: {state: true}
    }
    static styles = css`
    :host {
        display: block;
        width: 100%;
        height: 500px;
        padding: 1rem;
        background-color: azure;
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

    static BASE_URL = "https://api.football-data.org/v4/competitions/PL/standings";

    constructor() {
        super();
        this.league = "PL";
        this._data = undefined;
    }

    connectedCallback() {
        super.connectedCallback();
        this._fetch();
    }

//     async _fetch () {

//         try {
//         const response = await fetch(Standings.BASE_URL, {
//             headers: {
//                 'X-Auth-Token': '4288983b2fb141ac93fa54d3624888e1'
//             }
//     });
//         const data = await response.json();
//         this._data = data;
// } catch (error) {
//     console.error('Error fetching standings:', error);
// }

//     }

    _fetch () {
        fetch(Standings.BASE_URL, {
            headers: {
                'X-Auth-Token': '4288983b2fb141ac93fa54d3624888e1'
            }
        })
        .then(response => { 
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => { 
            console.log(data);
            this._data = data;
        })


        .catch(error => {
            console.error('Error fetching standings:', error);
        });
    }

    render() {
        if (this._data) {
            const standings = this._data.standings[0].table;
            return html`
            <div class ="widget"> 
            <h3>League Standings</h3>
            <table>
                <tr>
                    <th>Position</th>  
                    <th>Team</th>
                    <th>Points</th>
                </tr>
                
                ${standings.map(team => html`
                    <tr>
                        <td>${team.position}</td>
                        <td>${team.team.name}</td>
                        <td>${team.points}</td>
                    </tr>
                `)}
            </table>
            </div>
            `;
        } else{
            return html `<p>Loading...</p>`;
        }
    }
}

customElements.define('league-standings', Standings);