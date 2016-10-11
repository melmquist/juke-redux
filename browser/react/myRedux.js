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


console.log(store.getState());
console.log(store.dispatch( { type: RECEIVE_ALBUMS_FROM_SERVER, albums: ['fake album 1', 'fake album 2']}));
console.log(store.getState());

export default store;
