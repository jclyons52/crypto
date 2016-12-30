
const initialState = {
  alerts: [
    {
      base: "BTC",
      operation: "LESS_THAN",
      limit: 5,
      target: "USD",
      id: Math.random(),
      active: false,
      dismissed: false,
    }
  ]
}

export default function (state = initialState, action) {
  switch (action.type) {
    case "ADD_ALERT": {
      let alert = action.payload;
      alert.dismissed = false;
      alert.active = false;
      state.alerts.push(action.payload);
      return Object.assign({}, state);
    }
    case "REMOVE_ALERT": {
      let alerts = state.alerts.filter(alert => alert.id !== action.payload.id);
      return Object.assign({}, state, { alerts });
    }
    case "UPDATE_ALERTS": {
      let alertz = activateAlerts(state.alerts, action.payload.data.ticker);
      return Object.assign({}, state, { alerts: alertz });
    }
    default: {
      return state;
    }
  }
}

function activateAlerts(alerts, ticker) {
  const newAlerts = alerts.map((alert) => {
    if ( alertShouldActivate(alert, ticker)) {
      alert.active = true;
    }
    return alert;
  })
  return newAlerts;
}

function alertIsActive(alert, tickers) {
  if (alert.dismissed) {
    return false;
  }
  let shouldActivate = tickers.filter((ticker) => alertShouldActivate(alert, ticker));

  if (shouldActivate.length > 0) {
    return true;
  }
  return false;
}

export function alertShouldActivate(alert, ticker) {
  if (alert.dismissed) {
    return false;
  }
  if (ticker.base !== alert.base || ticker.target !== alert.target) {
    return false;
  }
  if (alert.operation === "GREATER_THAN") {
    if (ticker.price > alert.limit) {
      return true;
    }
    return false;
  }
  if (alert.operation === "LESS_THAN") {
    if (ticker.price < alert.limit) {
      return true;
    }
    return false;
  }
  return false;
}