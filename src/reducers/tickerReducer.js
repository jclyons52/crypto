const initialState = {
    fetching: false,
    fetched: false,
    tickers: [
        {
            "base": "BTC", "target": "USD", "price": "443.7807865468", "volume": "31720.1493969300", "change": "0.3766203596"
        }
    ],
    error: null
}

export default function (state = initialState, action) {
    console.log(action);
    switch (action.type) {
        case "LOAD_TICKER_PENDING": {
            return {
               ...state,
                fetching: true
            }
        }
        case "LOAD_TICKER_FULFILLED": {

            return {
                ...state,
                fetching: false,
                fetched: true,
                tickers: getTickers(state, action)
            }
        }
        case "LOAD_TICKER_REJECTED": {
            return {
                ...state,
                fetching: false,
                error: action.payload
            }
        }
        default: {
            return state;
        }
    }
}

function getTickers(state, action) {
    const newTicker = {
        ...action.payload.data.ticker,
        timestamp: action.payload.data.timestamp
    }
    let tickers = state.tickers.filter((ticker) => {
         return ticker.base !== newTicker.base || ticker.target !== newTicker.target
    })

    tickers.push(newTicker);
    return tickers;
}