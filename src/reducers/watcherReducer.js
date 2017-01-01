import _ from "lodash"

const initialState = {
    watchers: [
        {
            to: "USD",
            from: "BTC"
        }
    ]
}

export default function (state = initialState, action) {
    switch (action.type) {
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

    return Object.assign({}, state, { watchers });
}