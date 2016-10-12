'use strict';

import React, { Component } from 'react';
import { connect } from 'react-redux'
import initialState from '../initialState';
import AUDIO from '../audio';
import Sidebar from '../components/Sidebar';
import Album from '../components/Album';
import Player from '../components/Player';
import AlbumsContainer from './AlbumsContainer';
import { 
		toggle, 
		toggleOne} from '../myRedux';


// const mod = (num, m) =>((num % m) + m) % m;

// const skip = (interval, { currentSongList, currentSong }) => {
//   let idx = currentSongList.map(song => song.id).indexOf(currentSong.id);
//   idx = mod(idx + interval, currentSongList.length);
//   const next = currentSongList[idx];
//   return [next, currentSongList];
// };

class AppContainer extends Component {

	constructor (props) {
		super(props);
		this.state = initialState;

		// this.toggle = this.toggle.bind(this);
		// this.toggleOne = this.toggleOne.bind(this);
		this.next = this.next.bind(this);
		this.prev = this.prev.bind(this);
	}

	componentDidMount () {
		// this.props.loadAlbums();
		// fetch('/api/albums/1')
		// 	.then(res => res.json())
		// 	.then(album => this.onLoad(convertAlbum(album)));

		AUDIO.addEventListener('ended', () =>
			this.next());
		AUDIO.addEventListener('timeupdate', () =>
			this.setProgress(AUDIO.currentTime / AUDIO.duration));
	}

	onLoad (album) {
		this.setState({ album });
	}

	// play () {
	// 	AUDIO.play();
	// 	this.setState({ isPlaying: true });
	// }

	// pause () {
	// 	AUDIO.pause();
	// 	this.setState({ isPlaying: false });
	// }

	// load (currentSong, currentSongList) {
	// 	AUDIO.src = currentSong.audioUrl;
	// 	AUDIO.load();
	// 	this.setState({ currentSong, currentSongList });
	// }

	// startSong (song, list) {
	// 	this.pause();
	// 	this.load(song, list);
	// 	this.play();
	// }

	// toggleOne (selectedSong, selectedSongList) {
	// 	if (selectedSong.id !== this.state.currentSong.id)
	// 		this.startSong(selectedSong, selectedSongList);
	// 	else this.toggle();
	// }

	// toggle () {
	// 	if (this.state.isPlaying) this.pause();
	// 	else this.play();
	// }

	next () {
		this.startSong(...skip(1, this.state));
	}

	prev () {
		this.startSong(...skip(-1, this.state));
	}

	seek (decimal) {
		AUDIO.currentTime = AUDIO.duration * decimal;
		this.setProgress(AUDIO.currentTime / AUDIO.duration);
	}

	setProgress (progress) {
		this.setState({ progress });
	}

	render () {
		return (
			<div id="main" className="container-fluid">
				<div className="col-xs-2">
					<Sidebar />
				</div>
				<div className="col-xs-10">
				<AlbumsContainer />
					<Album
						album={this.state.album}
						currentSong={this.props.currentSong}
						isPlaying={this.props.isPlaying}
						toggle={this.props.toggleOne}
					/>
				</div>
				<Player
					currentSong={this.props.currentSong}
					currentSongList={this.props.currentSongList}
					isPlaying={this.props.isPlaying}
					progress={this.state.progress}
					next={this.next}
					prev={this.prev}
					toggle={this.props.toggle}
					scrub={evt => this.seek(evt.nativeEvent.offsetX / evt.target.clientWidth)}
				/>
			</div>
		);
	}
}






const mapStateToProps = function (state) {
	return {
		// albums: state.albums
		isPlaying: state.isPlaying,
		currentSong: state.currentSong,
		currentSongList: state.currentSongList
	}
}

const mapDispatchToProps = function (dispatch, ownProps) {
	return {
		// loadAlbums: () => dispatch(fetchAlbumsFromServer()),
	//   play: () => dispatch(play()),
	//   pause: () => dispatch(pause()),
	//   load: (song, list) => dispatch(load(song, list)),
	//   startSong: () => dispatch(startSong()),
		toggleOne: (song, list) => dispatch(toggleOne(song, list)),
		toggle: () => dispatch(toggle())
	}
}

const newAppContainer = connect(mapStateToProps, mapDispatchToProps)(AppContainer)

export default newAppContainer

