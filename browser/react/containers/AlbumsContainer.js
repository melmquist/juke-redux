'use strict';

// import React, { Component } from 'react';

// import initialState from '../initialState';
// import AUDIO from '../audio';

// import Sidebar from '../components/Sidebar';
// import Player from '../components/Player';

import { connect } from 'react-redux'
import Albums from '../components/Albums';
import { receiveAlbumsFromServer, fetchAlbumsFromServer} from '../myRedux';



const mapStateToProps = function (state) {
	return {
		albums: state.albums
	}
}

const mapDispatchToProps = function (dispatch) {
	return {
		loadAlbums: () => dispatch(fetchAlbumsFromServer())
	}
}

const AlbumsContainer = connect(mapStateToProps, mapDispatchToProps)(Albums);

export default AlbumsContainer;
