import axios from "axios";
import store from "../store";
export function fetchTickers(from, to) {
    store.dispatch((dispatch) => {
        dispatch({
            type: "LOAD_TICKER_PENDING",
            payload: {}
        })
        axios.get(`https://api.cryptonator.com/api/ticker/${from}-${to}`).then((result) => {
            dispatch({
                type: "LOAD_TICKER_FULFILLED",
                payload: result
            })
            dispatch({
                type: "UPDATE_ALERTS",
                payload: result
            })
        }).catch((err) => {
             dispatch({
                type: "LOAD_TICKER_REJECTED",
                payload: err
            })
        })
    })
}



