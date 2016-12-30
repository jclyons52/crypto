import store from "../store";

export function addAlert(alert) {
  store.dispatch({
        type: "ADD_ALERT",
        payload: alert
    });
}

export function removeAlert(id) {
  store.dispatch({
    type: "REMOVE_ALERT",
    payload: { id } 
  })
}

export function updateAlerts(tickers) {
  tickers.forEach((ticker) => {
    store.dispatch({
      type: 'UPDATE_ALERTS',
      payload: {
        data: {
          ticker
        }
      }
    })
  })
}