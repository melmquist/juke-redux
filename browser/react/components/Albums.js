'use strict';

import React from 'react';

// export default ({ album, currentSong, isPlaying, toggle }) => (
// <div>
// 	<h3>Albums</h3>
// 	<div className="row">
// 		<div className="col-xs-4">
// 			<a className="thumbnail" href="#">
// 				<img src="http://placeholdit.imgix.net/~text?txtsize=33&txt=ALBUMoneIMAGE&w=300&h=300" />
// 				<div className="caption">
// 					<h5>
// 						<span>ALBUM ONE NAME HERE</span>
// 					</h5>
// 					<small>NUMBER OF SONGS HERE songs</small>
// 				</div>
// 			</a>
// 		</div>
// 		<div className="col-xs-4">
// 			<a className="thumbnail" href="#">
// 				<img src="http://placeholdit.imgix.net/~text?txtsize=33&txt=ALBUMtwoIMAGE&w=300&h=300" />
// 				<div className="caption">
// 					<h5>
// 						<span>ALBUM TWO NAME HERE</span>
// 					</h5>
// 					<small>NUMBER OF SONGS HERE songs</small>
// 				</div>
// 			</a>
// 		</div>
// 	</div>
// </div>
// );

// const convertSong = song => {
// 	song.audioUrl = `/api/songs/${song.id}/audio`;
// 	return song;
// };

// const convertAlbum = album => {
// 	album.imageUrl = `/api/albums/${album.id}/image`;
// 	album.songs = album.songs.map(convertSong);
// 	return album;
// };




export default class Albums extends React.Component {
	// onLoad (albums) {
    //   this.setState({ albums });
	// //   console.log("THIS.STATE", this.state);
    // }

	componentDidMount () {
		fetch('/api/albums')
			.then(res => res.json())
			.then(albums => {
				// console.log("ALBUMS ON LOAD: ");
				// this.onLoad(albums)
				this.props.loadAlbums(albums)
			});

	}

	render () {
		const albums = this.props.albums
		return (
			<div>
				<h3>Albums</h3>
				<div className="row">
				{
					albums && albums.map(album => (
					<div className="col-xs-4">
						<a className="thumbnail" href="#">
							<img src="http://placeholdit.imgix.net/~text?txtsize=33&txt=ALBUMoneIMAGE&w=300&h=300" />
							<div className="caption">
								<h5>
									<span>{album.name}</span>
								</h5>
								<small>NUMBER OF SONGS HERE songs</small>
							</div>
						</a>
					</div>
				))
				}
				</div>
			</div>
		)
	}
}
