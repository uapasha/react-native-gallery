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

import Dimensions from 'Dimensions';

var _height = Dimensions.get('window').height;
var _width = Dimensions.get('window').width;

class FullPageView extends Component {
    render() {
        var photo = this.props.photo;
        return (
            <View style = {styles.container}>
                <Image 
                    style = {styles.image}
                    source = {photo.image_url} />
            </View>
            )
    }
}

  var styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    image: {
        width: _height,
        height: _width
  },
})

module.exports = FullPageView;