import _ from "lodash"

const initialState = {
    watchers: [
        {
            to: "USD",
            from: "BTC"
        }
    ]
}

export default function (state = initialState, action) {
    switch (action.type) {
        case "ADD_WATCHER": {
            state.watchers.push(action.payload);
            return Object.assign({}, state);
        }
        case "REMOVE_WATCHER": {
            return filterWatchers(state, action);
        }
        default: {
            return state;
        }
    }
}

function filterWatchers(state, action) {
    const watchers = state.watchers.filter((watcher) => {
        return watcher.from !== action.payload.from || watcher.to !== action.payload.to;
    })
    delete state.sorted[action.payload.from + action.payload.to]
    const latest = uniqueTickers(state.sorted);
    return Object.assign({}, state, { watchers, latest });
}

/**
 * takes the newest ticker for each conversion type
 */
function uniqueTickers(tickerMap = {}) {
    let final = [];
    _.forEach(tickerMap, (val) => {
        let newest = val.reduce((newest, ticker) => {
            return ticker.timestamp > newest.timestamp ? ticker : newest
        }, { timestamp: 0 });
        final.push(newest)
    })

    return final;
}