const initialState = {
    fetching: false,
    fetched: false,
    tickers: [
        {
            base: "usd"
        }
    ],
    error: null
}

export default function (state = initialState, action) {
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
                tickers: [action.payload.ticker]
            }
        }
        case "LOAD_TICKER_REJECTED": {
            console.log(action.payload);
            return {
                ...state,
                fetching: false,
                error: action.payload
            }
        }
    }
}