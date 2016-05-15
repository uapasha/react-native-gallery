'use strict'
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

var IMAGE_SIZE = 31
// see for reference:
// https://github.com/500px/api-documentation/blob/master/basics/formats_and_terms.md#image-urls-and-image-sizes
var URL = function(page, imageSize = IMAGE_SIZE){
  return 'https://api.500px.com/v1/photos?feature=popular&image_size[]=' + imageSize + '&consumer_key=wB4ozJxTijCwNuggJvPGtBGCRqaZVcF6jsrzUadF&page=' + page
}

var _height = Dimensions.get('window').height;
var _width = Dimensions.get('window').width;

console.log('--------------')
console.log(_height)
console.log(_width)

var FullPageView = require('./FullPageView')
//image_url
//var IMAGE1 = 'https://drscdn.500px.org/photo/153623485/q%3D50_w%3D140_h%3D140/2c344360c64819196bdc4f26c6a06523?v=3'
//var IMAGE2 = 'https://drscdn.500px.org/photo/153609757/q%3D50_w%3D140_h%3D140/0bfe3476d136eb5acdf886e85db5af42?v=3'

class Gallery extends Component{
    constructor(props) {
        super(props);
        this.state = {
            dataSource: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2,
            }),
            loaded: false,
            loadingMore: false,
        };
    }
    componentDidMount(){
        this._photos = []
        this.page = 1
        this.fetchPhotos(this.page);
    }
    fetchPhotos(page) {
        fetch(URL(page))
            .then((response) => response.json())
            .then((responseData) => {
                var newPhotos = responseData.photos
                this._photos = this._photos.concat(newPhotos)
                this.page +=1;
                this.setState({
                    dataSource: this.state.dataSource.cloneWithRows(this._photos),
                    loaded: true,
                });
            })
            .done();
    }
    render(){
        if (!this.state.loaded) {
            return this.renderLoadingView();
        }

        return (
            <ListView 
                contentContainerStyle={styles.list}
                initialListSize={20}
                pageSize={2}
                dataSource = {this.state.dataSource}
                renderRow = {this.renderPhoto}
                scrollRenderAheadDistance={1500}
                onEndReached = {this._onEndReached.bind(this)}
                style = {styles.listView} />
            );
    }
    _onEndReached() {
        console.log('onEndReached');
        if (this.state.loadingMore) {
            return;
        }

        this.setState({
            loadingMore: false
        });

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
            <TouchableHighlight onPress ={() => this.imagePressed(photo.image_url[0])}>
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
    title: "Property",
    component: PropertyView,
    passProps: {property: property}
  });
        
    }

    }   

var styles = StyleSheet.create({
    list : {
        justifyContent: 'space-around',
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    tumbnail : {
        width: _width/2-10,
        height: _height/2-100,
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
module.exports = Gallery;