'use strict';
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  ListView,
  TouchableHighlight,
} from 'react-native'

import Dimensions from 'Dimensions';

// import FullPageView module
var FullPageView = require('./FullPageView')

////////////// CONSTANTS and PARAMETERS //////////////

// setting size of pictures loaded for tumbnails. see for reference:
// https://github.com/500px/api-documentation/blob/master/basics/formats_and_terms.md#image-urls-and-image-sizes
const IMAGE_SIZE = 31

// set width and height for tumbnail pictures
var _height = (Dimensions.get('window').height)/2 - 100;
var _width = (Dimensions.get('window').width)/2-10;

////////////// HELPERS FUNCTIONS ///////////////////

// get url based on page number
var URL = function(page, imageSize = IMAGE_SIZE){
  return 'https://api.500px.com/v1/photos?feature=popular&image_size[]=' +
  	imageSize+'&consumer_key=wB4ozJxTijCwNuggJvPGtBGCRqaZVcF6jsrzUadF&page='+
  	page;
}

////////////// MAIN COMPONENT //////////////

class Gallery extends Component{
	constructor(props) {
		super(props);
		this.state = {
			dataSource: new ListView.DataSource({
				rowHasChanged: (row1, row2) => row1 !== row2,
			}),
			loaded: false, // for tracking initial load
			loadingMore: false, // for tracking load more
		};
	}
	componentDidMount(){
		this._photos = []
		this.page = 1 // set initial page that will be loaded
		this.fetchPhotos(this.page);
	}
	fetchPhotos(page) {
		fetch(URL(page))
			.then((response) => response.json())
			.then((responseData) => {
				// load new bunch of photos
				var newPhotos = responseData.photos
				// add new photos to existing list
				this._photos = this._photos.concat(newPhotos)
				// increment page for next load
				this.page +=1;
				this.setState({
					dataSource: 
						this.state.dataSource.cloneWithRows(this._photos),
					loaded: 
						true,
				});
			})
			.catch(error =>
			    this.setState({
			    	message: 'Something went wrong ' + error
			    }))
			.done();
	}
	render(){
		// while image is loading show a message
		if (!this.state.loaded) {
			return this.renderLoadingView();
		}

		return (
			<ListView 
				contentContainerStyle={styles.list}
				initialListSize={20}
				dataSource = {this.state.dataSource}
				renderRow = {this.renderPhoto.bind(this)}
				scrollRenderAheadDistance={1500}
				onEndReached = {this._onEndReached.bind(this)}
				onEndReachedThreshold = {300}
				style = {styles.listView} />
			);
	}
	_onEndReached() {
		console.log('onEndReached');

		if (this.state.loadingMore) {
			// if we already loading - do nothing
			return;
		}

		this.setState({
			loadingMore: false
		});
		// load more photos
		this.fetchPhotos(this.page);
	}
	renderLoadingView() {
		return (
			<View>
				<Text style = {styles.loadingText}>
					Photos are being loaded...
				</Text>
			</View>
			);
	}
	renderPhoto(photo) {
		return (
			// when pressed render foolscreen photo
			<TouchableHighlight onPress ={() => this.imagePressed(photo.id)}>
				<View>
					<Image 
						source = {{uri: photo.image_url[0]}}
						style = {styles.tumbnail} />
				</View>
			</TouchableHighlight>
		)
	}
	imagePressed(photoId){
		this.props.navigator.push({
			title: "FullPageView",
			id: 'fullScreen_' + photoId, // pass id of an image to navigator
  		});
	}
}   

////////////// STYLES //////////
const styles = StyleSheet.create({
	list : {
		justifyContent: 'space-around',
		flexDirection: 'row',
		flexWrap: 'wrap'
	},
	tumbnail : {
		width: _width,
		height: _height,
		margin: 3
	},
	listView: {
		flex: 2,
		paddingTop: 20,
		backgroundColor: '#F5FCFF'
	},
	loadingText: {
		marginTop: 100,
		fontSize: 20,
		textAlign: 'center',
	},
});

// export module
module.exports = Gallery;