import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  PixelRatio,
  Platform,
  ListView,
  NativeModules
} from 'react-native';


import ChatWrapper from './ChatWrapper';
import ChatListView from './chatListView';



export default class Chat extends Component {
  constructor(props) {
    super(props);

  }




  render() {


    return (
      <ChatWrapper goBack={()=> this.props._goBack()}>

        <ChatListView/>

     </ChatWrapper>

    );

  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    paddingTop: 50,
    paddingBottom: 50,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  blurContainer: {
    backgroundColor: 'green',
    ...Platform.select({
      ios: {
        flex: 1,
      },
    }),
  },
  textInput: {
    flex: 1,
    marginLeft: 10,
    marginTop: 10,
    marginBottom: 10,
    paddingLeft: 10,
    paddingTop: 2,
    paddingBottom: 5,
    fontSize: 16,
    backgroundColor: 'white',
    borderWidth: 0.5 / PixelRatio.get(),
    borderRadius: 18,
  },
  sendButton: {
    paddingRight: 15,
    paddingLeft: 15,
  },
});

// AppRegistry.registerComponent('AwesomeProject', () => AwesomeProject);