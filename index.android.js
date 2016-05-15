/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

'use strict';

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  Navigator,
  TouchableHighlight,
  ToolbarAndroid,
} from 'react-native';

var Gallery = require('./Gallery');

class Greeting extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to 500px Image Gallery!
        </Text>
        <View style = {styles.buttonView}>
          <TouchableHighlight 
            style = {styles.button} 
            underlayColor='#99d9f4'
            onPress ={() => this.goToGallery()}>
            <Text style = {styles.buttonText}>Want to see it! </Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
  goToGallery() {
    this.props.navigator.push({
      name:'Gallery',
      id: 'gallery'
    })
  }
  onBack(){
    if (route.id) {
        this.props.navigator.pop();
    }
  } 
}

class Navigation extends Component{ //PropertyFinderApp 
  render() {
    return (
        <Navigator
          initialRoute={{name: 'Hello!', id: 'greeting'}}
          renderScene={this.navigatorRenderScene}/>
    );
  }
  navigatorRenderScene(route, navigator) {
    switch(route.id){
      case 'greeting':
        return (<Greeting navigator = {navigator}
                          title = 'Home'/>);
      case 'gallery':
        return (<Gallery navigator = {navigator}
                          title = 'Gallery' 
                          onBack={() => {
                            if (route.index > 0) {
                              navigator.pop();
                            }
                          }} />
                );
    }
  }


}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonView: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'stretch',
    justifyContent: 'center',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    marginBottom: 120,
    marginTop: 120,
  },
  text: {
    color: 'black',
    backgroundColor: 'white',
    fontSize: 30,
    margin: 80,
  },
  buttonText: {
    fontSize: 28,
    color: 'white',
    alignSelf: 'center',
  },
  button: {
    height: 46,
    flex: 1,
    backgroundColor: '#48BBEC',
    borderColor: '#48BBEC',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
});

AppRegistry.registerComponent('ImageGallery', () => Navigation);
