import axios from "axios";

export function fetchTickers() {
    return {
        type: "LOAD_TICKER",
        payload: axios.get(`https://api.cryptonator.com/api/ticker/btc-usd`)
    }
}