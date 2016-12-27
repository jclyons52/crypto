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

export default function(state = initialState, action) {
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
                tickers: [
                    {
                        ...action.payload.data.ticker,
                    timestamp: action.payload.data.timestamp
                    }
                ]
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