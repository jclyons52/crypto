import axios from "axios";

export function fetchTickers(from, to) {
    return {
        type: "LOAD_TICKER",
        payload: axios.get(`https://api.cryptonator.com/api/ticker/${from}-${to}`)
    }
}

