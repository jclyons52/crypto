import alertReducer from './alertReducer'

it('Adds an alert', () => {
  const initialState = { alerts: [] }
  const action = {
    type: "ADD_ALERT",
    payload: {
      base: "BTC",
      operation: "LESS_THAN",
      limit: 5,
      target: "USD"
    }
  }

  const finalState = alertReducer(initialState, action);

  expect(finalState.alerts.length).toBe(1);
  expect(finalState.alerts[0].base).toBe("BTC");
  expect(finalState.alerts[0].active).toBe(false);
  expect(finalState.alerts[0].dismissed).toBe(false);
  expect(finalState.alerts[0].operation).toBe("LESS_THAN");
  expect(finalState.alerts[0].limit).toBe(5);
  expect(finalState.alerts[0].target).toBe('USD');
});

it('Removes an alert', () => {
  const initialState = {
    alerts: [
      {
        base: "BTC",
        operation: "LESS_THAN",
        limit: 5,
        target: "USD",
        id: 27,
        active: false,
        dismissed: false,
      },
      {
        base: "BTC",
        operation: "LESS_THAN",
        limit: 5,
        target: "AUD",
        id: 14,
        active: false,
        dismissed: false,
      }
    ]
  }

  const action = {
    type: "REMOVE_ALERT",
    payload: { id: 27 }
  }

  const finalState = alertReducer(initialState, action);

  expect(finalState.alerts.length).toBe(1);
  expect(finalState.alerts[0].target).toBe('AUD')

})

it('activates an alert', () => {
  const initialState = {
    alerts: [
      {
        base: "BTC",
        operation: "LESS_THAN",
        limit: 1000,
        target: "USD",
        id: Math.random(),
        active: false,
        dismissed: false,
      }
    ]
  }

  const action = {
    type: 'UPDATE_ALERTS',
    payload: {
      data: {
        ticker: {
          "base": "BTC",
          "target": "USD",
          "price": "900.00",
          "volume": "6.99712284",
          "change": "-40.61609000",
          "timestamp": 1483240983,
        }
      }
    }
  }

  const finalState = alertReducer(initialState, action);

  expect(finalState.alerts[0].active).toBe(true);
})

it('deactivates an alert', () => {
  const initialState = {
    alerts: [
      {
        base: "BTC",
        operation: "GREATER_THAN",
        limit: 1000,
        target: "USD",
        id: Math.random(),
        active: false,
        dismissed: false,
      }
    ]
  }

  const action = {
    type: 'UPDATE_ALERTS',
    payload: {
      data: {
        ticker: {
          "base": "BTC",
          "target": "USD",
          "price": "900.00",
          "volume": "6.99712284",
          "change": "-40.61609000",
          "timestamp": 1483240983,
        }
      }
    }
  }

  const finalState = alertReducer(initialState, action);

  expect(finalState.alerts[0].active).toBe(false);
})