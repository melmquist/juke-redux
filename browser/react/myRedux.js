import initialState from './initialState.js';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import createLogger from 'redux-logger';
import thunkMiddleware from 'redux-thunk';



const RECEIVE_ALBUMS_FROM_SERVER = 'RECEIVE_ALBUMS_FROM_SERVER';

const START_PLAYING = 'START_PLAYING';
const STOP_PLAYING = 'STOP_PLAYING';
const SET_CURRENT_SONG = 'SET_CURRENT_SONG';

// const LOAD_SONG = 'LOAD_SONG';
// const START_SONG = 'START_SONG';
// const TOGGLE_ONE = 'TOGGLE_ONE';
// const TOGGLE = 'TOGGLE';

export function startPlaying(){
	return {
		type: START_PLAYING,
		// isPlaying: true
	}
}

export function stopPlaying(){
	return {
		type: STOP_PLAYING,
		// isPlaying: false
	}
}

export function setCurrentSong(currentSong, currentSongList){
	return {
		type: SET_CURRENT_SONG,
		currentSong,
		currentSongList
	}
}




const isPlaying = (state = false, action) => {
	switch (action.type) {
		case START_PLAYING: return true;
		case STOP_PLAYING: return false;
		default: return state;
	}
}

const currentSong = (state = {}, action) => {
	switch (action.type) {
		case SET_CURRENT_SONG: return action.currentSong;
		default: return state;
	}
};

const currentSongList = (state = [], action ) => {
	switch (action.type) {
		case SET_CURRENT_SONG: return action.currentSongList;
		default: return state;
	}
};


const rootReducer = combineReducers({
	albums,
	isPlaying,
	currentSong,
	currentSongList
});


function albums (state = initialState, action) {
    switch(action.type) {
        case RECEIVE_ALBUMS_FROM_SERVER:
        	return Object.assign({}, state, { albums: action.albums });
		// case START_PLAYING:
		// 	return Object.assign({}, state, { isPlaying: true });
		// case STOP_PLAYING:
		// 	return Object.assign({}, state, { isPlaying: false });
		// case SET_CURRENT_SONG:
		// 	return Object.assign({}, state, { currentSong, currentSongList });
        default: return state;
    }
}





export function receiveAlbumsFromServer(albums) {
	return {
		type: RECEIVE_ALBUMS_FROM_SERVER,
		albums: albums
	}
}

// export function fetchAlbumsFromServer() {
// 	return dispatch => {
//     fetch('/api/albums')
//       .then(res => res.json())
//       // use the dispatch method the thunkMiddleware gave us
//       .then(albums => dispatch(receiveAlbumsFromServer(albums)))
//   }
// }


//HELPER FUNCS FOR Below
const convertSong = song => {
	song.audioUrl = `/api/songs/${song.id}/audio`;
	return song;
};

const convertAlbum = album => {
	album.imageUrl = `/api/albums/${album.id}/image`;
	album.songs = album.songs.map(convertSong);
	return album;
};

export const receiveAlbumsAsync = () => dispatch => {
	return fetch('/api/albums')
	.then(res => res.json())
	.then(albums => dispatch(receiveAlbumsFromServer(convertAlbum(albums))));
}





export function play(){
	return dispatch => {
		AUDIO.play();
		dispatch(startPlaying());
	}
}

export const pause = () => dispatch => {
	AUDIO.pause();
	dispatch(stopPlaying());
}

export const load = (currentSong, currentSongList) => dispatch => {
	AUDIO.src = currentSong.audioUrl;
	AUDIO.load();
	dispatch(setCurrentSong(currentSong, currentSongList));
};

export const startSong = (song, list) => dispatch => {
	dispatch(pause());
	dispatch(load(song, list));
	dispatch(play());
}

export const toggle = () => (dispatch, getState) => {
	const { isPlaying } = getState();
	if (isPlaying) dispatch(pause());
	else dispatch(play());
}

export const toggleOne = (selectedSong, selectedSongList) => (dispatch, getState) => {
	const { currentSong } = getState();
	if (selectedSong.id !== currentSong.id){
		dispatch(startSong(selectedSong, selectedSongList));
	} else {
		dispatch(toggle());
	}
}





const loggerMiddleware = applyMiddleware(createLogger(), thunkMiddleware)
const store = createStore(rootReducer, loggerMiddleware);


store.getState();
store.dispatch( { type: RECEIVE_ALBUMS_FROM_SERVER, albums: []});
store.getState();

export default store;
