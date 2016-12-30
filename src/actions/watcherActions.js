import store from "../store";
import _ from "lodash";
import {fetchTickers} from "./tickerActions";

let count = 65000;
let throttledUpdate = _.throttle(() => updateWatchers(), 60000);

export function addWatcher(from, to) {
    const watchers = store.getState().watchers.watchers;
    const duplicates = watchers.filter(watcher => watcher.from === from && watcher.to === to).length;
    if (duplicates > 0) {
        return;
    }
    fetchTickers(from, to);
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

export function startWatchers(delay) {
     setTimeout(throttledUpdate, count)
}

export function updateWatchers() {
    const state = store.getState();
    const watchers = state.watchers.watchers;
    watchers.forEach((watcher) => {
        fetchTickers(watcher.from, watcher.to)
    })
    startWatchers(watchers.length);
}