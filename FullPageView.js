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

var _height = Dimensions.get('window').height;
var _width = Dimensions.get('window').width;

var URL = function(id) {
    return 'https://api.500px.com/v1/photos/' + id + '?consumer_key=wB4ozJxTijCwNuggJvPGtBGCRqaZVcF6jsrzUadF&size3'
}
class FullPageView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
            url: '',
        };
    }
    componentDidMount(){
        this.fetchPhoto(this.props.image_id);
    }
    fetchPhoto(id) {
        fetch(URL(id))
            .then((response) => response.json())
            .then((responseData) => {
                this.setState({
                    loaded: true,
                    url: responseData.photo.image_url,
                });
            })
            .done();
        }
    render() {
        if (!this.state.loaded) {
            return this.renderLoadingView();
        }
        return (
            <TouchableHighlight onPress ={() => this.goToGallery()}>
                <View style = {styles.container}>
                    <Image 
                        style = {styles.image}
                        source = {{uri:this.state.url}} />
                </View>
            </TouchableHighlight>
          );
    }
    renderLoadingView() {
        return (
            <View>
                <Text style = {styles.loadingText}>
                    Big picture is being loaded... {this.image}
                </Text>
            </View>
            );
    }
    goToGallery() {
        this.props.navigator.push({
            name:'Gallery',
            id: 'gallery'
    })
    }
}

  var styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    image: {
        width: _height,
        height: _height
    },
    loadingText: {
        marginTop: 100,
        fontSize: 20,
        textAlign: 'center',
    },
})

module.exports = FullPageView;