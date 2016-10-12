import initialState from './initialState.js';
import { createStore, applyMiddleware } from 'redux';
import createLogger from 'redux-logger';
import thunkMiddleware from 'redux-thunk';



const RECEIVE_ALBUMS_FROM_SERVER = 'RECEIVE_ALBUMS_FROM_SERVER';

export function receiveAlbumsFromServer(albums) {
	return {
		type: RECEIVE_ALBUMS_FROM_SERVER,
		albums: albums
	}
}

export function fetchAlbumsFromServer() {
	return dispatch => {
    fetch('/api/albums')
      .then(res => res.json())
      // use the dispatch method the thunkMiddleware gave us
      .then(albums => dispatch(receiveAlbumsFromServer(albums)))
  }
}



function reducer (state = initialState, action) {
    switch(action.type) {
        case RECEIVE_ALBUMS_FROM_SERVER:
        return Object.assign({}, state, { albums: action.albums });
        default: return state;
    }
}

const loggerMiddleware = applyMiddleware(createLogger(), thunkMiddleware)
const store = createStore(reducer, loggerMiddleware);


store.getState();
store.dispatch( { type: RECEIVE_ALBUMS_FROM_SERVER, albums: []});
store.getState();

export default store;

