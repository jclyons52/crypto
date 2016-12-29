import _ from "lodash"

const initialState = {
    fetching: false,
    fetched: false,
    watchers: [
        {
            to: "USD",
            from: "BTC"
        }
    ],
    latest: [],
    sorted: {},
    error: null
}

export default function (state = initialState, action) {
    switch (action.type) {
        case "LOAD_TICKER_PENDING": {
            return Object.assign({}, state, { fetching: true });
        }
        case "LOAD_TICKER_FULFILLED": {
            return addTicker(state, action);

        }
        case "LOAD_TICKER_REJECTED": {
            return Object.assign({}, state, {
                fetching: false,
                error: action.payload
            });
        }
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

function addTicker(state, action) {
    const newTicker = Object.assign({}, action.payload.data.ticker, {
        timestamp: action.payload.data.timestamp
    })
    const tickers = getTickers(state.sorted, newTicker)
    return Object.assign({}, state, {
        fetching: false,
        fetched: true,
        latest: tickers.latest,
        sorted: tickers.sorted
    })
}

function getTickers(tickers, newTicker) {
    const sorted = sortTickers(tickers, newTicker);
    const latest = uniqueTickers(sorted);
    return { latest, sorted };
}

/**
 * Sorts tickers by their base and target currencies
 */
function sortTickers(final, current) {
    const key = current.base + current.target;
    let val = final[key];
    if (val === undefined) {
        val = [];
    }
    val.push(current);
    final[key] = val;
    return final;
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