import axios from "axios";
import store from "../store";
import _ from "lodash";

const throttledUpdate = _.throttle(() => updateWatchers(), 10000);

export function fetchTickers(from, to) {
    return {
        type: "LOAD_TICKER",
        payload: axios.get(`https://api.cryptonator.com/api/ticker/${from}-${to}`)
    }
}

export function addWatcher(from, to) {
    const watchers = store.getState().tickers.watchers;
    const duplicates = watchers.filter(watcher => watcher.from === from && watcher.to === to).length;
    if (duplicates > 0) {
        return;
    }
    store.dispatch(fetchTickers(from, to));
    store.dispatch({
        type: "ADD_WATCHER",
        payload: { from, to }
    });
}

export function removeWatcher(from, to) {
    return {
        type: "REMOVE_WATCHER",
        payload: { from, to }
    }
}

export function startWatchers() {
     setTimeout(throttledUpdate, 11000)
}

export function updateWatchers() {
    const watchers = store.getState().tickers.watchers;
    watchers.forEach((watcher) => {
        store.dispatch(fetchTickers(watcher.from, watcher.to))
    })
}