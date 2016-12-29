import store from "../store";
import _ from "lodash";
import {fetchTickers} from "./tickerActions";

let count = 4000;
const throttledUpdate = _.throttle(() => updateWatchers(), 2000);

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

export function startWatchers(delay) {

     setTimeout(throttledUpdate, count)
     if (count < 60000) {
       count = 4000 * count;
       const throttledUpdate = _.throttle(() => updateWatchers(), (count / 2));
     }
}

export function updateWatchers() {
    const watchers = store.getState().watchers.watchers;
    watchers.forEach((watcher) => {
        store.dispatch(fetchTickers(watcher.from, watcher.to))
    })
    startWatchers(watchers.length);
}