import initialState from './initialState.js';
import { createStore } from 'redux';

const RECEIVE_ALBUMS_FROM_SERVER = 'RECEIVE_ALBUMS_FROM_SERVER';

function reducer (state = initialState, action) {
    switch(action.type) {
        case RECEIVE_ALBUMS_FROM_SERVER:
        return Object.assign({}, state, { albums: action.albums });
        default: return state;
    }
}

const store = createStore(reducer);


store.getState();
store.dispatch( { type: RECEIVE_ALBUMS_FROM_SERVER, albums: []});
store.getState();

export default store;
