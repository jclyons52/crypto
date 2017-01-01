import tickerReducer from './tickerReducer';

it('sets the fetching flag', () => {
    const initialState = {
        fetching: false,
        fetched: false,
        latest: [],
        sorted: {},
        error: null
    };
    const action = {
        type: 'LOAD_TICKER_PENDING',
        payload: {}
    }

    const finalState = tickerReducer(initialState, action);

    expect(finalState.fetching).toBe(true);
})

it('adds fetched ticker', () => {
    const initialState = {
        fetching: false,
        fetched: false,
        latest: [],
        sorted: {},
        error: null
    };
    const action = {
        type: 'LOAD_TICKER_FULFILLED',
        payload: {
            data: {
                "ticker": {
                    "base": "BTC",
                    "target": "AUD",
                    "price": "1320.24301000",
                    "volume": "6.58412284",
                    "change": "0.00000000"
                },
                "timestamp": 1483245722,
                "success": true,
                "error": ""
            }
        }
    }

    const finalState = tickerReducer(initialState, action);

    expect(finalState.latest[0].timestamp).toBe(1483245722)
    expect(finalState.sorted['BTCAUD'][0].timestamp).toBe(1483245722)
})

it('reports error', () => {
    const initialState = {
        fetching: false,
        fetched: false,
        latest: [],
        sorted: {},
        error: null
    };
    const action = {
        type: 'LOAD_TICKER_REJECTED',
        payload: {
            data: {
                "success": false,
                "error": "Some stuff happened"
            }
        }
    }

    const finalState = tickerReducer(initialState, action);

    expect(finalState.error).toBe(action.payload.data.error);
})

it('removes ticker type', () => {
    const initialState = {
        fetching: false,
        fetched: false,
        latest: [
            {
                "base": "BTC",
                "target": "USD",
                "price": "900.00",
                "volume": "6.99712284",
                "change": "-40.61609000",
                "timestamp": 1483240983,
            },
            {
                "base": "BTC",
                "target": "AUD",
                "price": "900.00",
                "volume": "6.99712284",
                "change": "-40.61609000",
                "timestamp": 1483240983,
            }
        ],
        sorted: {
            "BTCAUD": [
                {
                    "base": "BTC",
                    "target": "AUD",
                    "price": "900.00",
                    "volume": "6.99712284",
                    "change": "-40.61609000",
                    "timestamp": 1483240983,
                }
            ],
            "BTCUSD": [
                {
                    "base": "BTC",
                    "target": "USD",
                    "price": "900.00",
                    "volume": "6.99712284",
                    "change": "-40.61609000",
                    "timestamp": 1483240983,
                }
            ]
        },
        error: null
    };
    const action = {
        type: 'REMOVE_TICKER_TYPE',
        payload: {
            to: 'USD',
            from: 'BTC'
        }
    }

    const finalState = tickerReducer(initialState, action);
    const keys = Object.keys(finalState.sorted);
    
    expect(finalState.latest.length).toBe(1)
    expect("BTCAUD" in finalState.sorted).toBe(true)
    expect("BTCUSD" in finalState.sorted).toBe(false)
})