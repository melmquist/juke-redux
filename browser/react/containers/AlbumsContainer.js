'use strict';

// import React, { Component } from 'react';

// import initialState from '../initialState';
// import AUDIO from '../audio';

// import Sidebar from '../components/Sidebar';
// import Player from '../components/Player';

import connect from 'react-redux'
import Albums from '../components/Albums';

const mapStateToProps = function (state, ownProps) {
	return {
		albums: state.albums
	}
}

const mapDispatchToProps = function (dispatch, ownProps) {
	return {
		// note that I'm using enhanced object method notation
		loadAlbums (albums) {
			dispatch({ type: RECEIVE_ALBUMS_FROM_SERVER, albums: albums }); // hm, could we shorten this, too?
		}
	}
}

const AlbumsContainer = connect(mapStateToProps, mapDispatchToProps)(Albums);

export default AlbumsContainer;
