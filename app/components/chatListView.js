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


import {BlurView} from 'react-native-blur';
import InvertibleScrollView from 'react-native-invertible-scroll-view';
import Button from './Button'

const testData = [...Array(100).keys()].map(i => { return {key: i, text: `test${i}`}})
const IsIOS = Platform.OS === 'ios';
const TrackInteractive = true;

export default class Chat extends Component {
  constructor(props) {
    super(props);
    this.renderRow = this.renderRow.bind(this);

    this.dataSource = new ListView.DataSource({
      rowHasChanged: (r1, r2) => {
        return r1 !== r2;
      }
    });

  }



  renderRow = (rowData) => {
    return (
      <View style={{minHeight: 50, width: 100, backgroundColor: 'blue', borderRadius: 50, marginBottom: 20, alignItems: 'center'}}>
        <Text style={{color: 'white'}}>{rowData.text}</Text>
      </View>
    )
  }

  updateDataSource = () =>  {

    const testData = [...Array(100).keys()].map(i => { return {key: i, text: `test${Math.floor(Math.random()  * 100)}`}})
    this.setState({data: testData})
  }

  render() {

    const initialInputBarHeight = 80;

    return (
        <ListView
          dataSource={this.dataSource.cloneWithRows(testData)}
          renderRow={this.renderRow}
          renderScrollComponent={props => <InvertibleScrollView {...props} testID={'list'} inverted={true}/>}
          keyboardDismissMode={TrackInteractive ? 'interactive' : 'none'}
          contentOffset={{y: -initialInputBarHeight}}
        />
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