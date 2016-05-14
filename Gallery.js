'use strict'
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  ListView,
} from 'react-native'

var URL = function(page){
  return 'https://api.500px.com/v1/photos?feature=popular&consumer_key=wB4ozJxTijCwNuggJvPGtBGCRqaZVcF6jsrzUadF&page=' + page
}
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
        };
    }
    componentDidMount(){
        this.fetchPhotos();
    }
    fetchPhotos() {
        fetch(URL(1))
            .then((response) => response.json())
            .then((responseData) => {
                this.setState({
                    dataSource: this.state.dataSource.cloneWithRows(responseData.photos),
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
                dataSource = {this.state.dataSource}
                renderRow = {this.renderPhoto}
                style = {styles.listView} />
            );
    }
    renderLoadingView() {
        return (
            <View style = {styles.container}>
                <Text>
                    Photos are being loaded...
                </Text>
            </View>
            );
    }
    renderPhoto(photo) {
        return (
            <View style = {styles.container}>
                <View style = {styles.imageContainer}>
                    <Text>
                        This is left column
                    </Text>
                    <Image 
                        source = {{uri: photo.image_url}}
                        style = {styles.tumbnail} />
                </View>
            </View>
        )
    }

    }   

var styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    imageContainer: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center',

    },
    tumbnail : {
        width: 100,
        height: 100,
    },
    listView: {
        paddingTop: 20,
        backgroundColor: '#F5FCFF',
    }
});
module.exports = Gallery;