import store from "../store";
import _ from "lodash";
import {fetchTickers} from "./tickerActions";

const throttledUpdate = _.throttle(() => updateWatchers(), 10000);

export function addWatcher(from, to) {
    const watchers = store.getState().watchers.watchers;
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
    const watchers = store.getState().watchers.watchers;
    watchers.forEach((watcher) => {
        store.dispatch(fetchTickers(watcher.from, watcher.to))
    })
}