import _ from "lodash"

const initialState = {
    fetching: false,
    fetched: false,
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
                error: action.payload.data.error
            });
        }
        case "REMOVE_TICKER_TYPE": {
            delete state.sorted[action.payload.from + action.payload.to]
            const latest = uniqueTickers(state.sorted);
            return Object.assign({}, state, { latest });
        }
        default: {
            return state;
        }
    }
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