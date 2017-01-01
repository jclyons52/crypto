import watcherReducer from './watcherReducer';

it('adds watcher', () => {
  const initialState = {
    watchers: []
  }
  const action = {
    type: 'ADD_WATCHER',
    payload: {
      to: "USD",
      from: "BTC"
    }
  }

  const finalState = watcherReducer(initialState, action);

  expect(finalState.watchers[0].to).toBe("USD");
  expect(finalState.watchers[0].from).toBe("BTC")
})

it('removes watcher', () => {
  const initialState = {
    watchers: [
      {
        to: "USD",
        from: "BTC"
      },
      {
        to: "AUD",
        from: "BTC"
      }
    ]
  }

  const action = {
    type: 'REMOVE_WATCHER',
    payload: {
      to: "USD",
      from: "BTC"
    }
  }

  const finalState = watcherReducer(initialState, action);

  expect(finalState.watchers.length).toBe(1);
  expect(finalState.watchers[0].to).toBe("AUD")

})