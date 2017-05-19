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

import {AutoGrowingTextInput} from 'react-native-autogrow-textinput';
import {BlurView} from 'react-native-blur';
import {KeyboardAccessoryView, KeyboardUtils} from 'react-native-keyboard-input';
import InvertibleScrollView from 'react-native-invertible-scroll-view';
import './demoKeyboards';
import Button from './Button'

const testData = [...Array(100).keys()].map(i => { return {key: i, text: `test${i}`}})
const IsIOS = Platform.OS === 'ios';
const TrackInteractive = true;

export default class Chat extends Component {
  constructor(props) {
    super(props);
    this.keyboardAccessoryViewContent = this.keyboardAccessoryViewContent.bind(this);
    this.onKeyboardItemSelected = this.onKeyboardItemSelected.bind(this);
    this.resetKeyboardView = this.resetKeyboardView.bind(this);
    this.renderRow = this.renderRow.bind(this);

    this.dataSource = new ListView.DataSource({
      rowHasChanged: (r1, r2) => {
        return r1 !== r2;
      }
    });

    this.state = {
      customKeyboard: {
        component: undefined,
        initialProps: undefined,
      },
      receivedKeyboardData: undefined,
    };
  }


  onKeyboardItemSelected(keyboardId, params) {
    const receivedKeyboardData = `onItemSelected from "${keyboardId}"\nreceived params: ${JSON.stringify(params)}`;
    this.setState({receivedKeyboardData});
  }

  getToolbarButtons() {
    return [
      {
        text: 'show1',
        onPress: () => this.showKeyboardView('KeyboardView', 'FIRST - 1 (passed prop)'),
      },
      {
        text: 'show2',
        onPress: () => this.showKeyboardView('AnotherKeyboardView', 'SECOND - 2 (passed prop)'),
      },
      {
        text: 'reset',
        onPress: () => this.resetKeyboardView(),
      },
    ];
  }

  resetKeyboardView() {
    this.setState({customKeyboard: {}});
  }

  showKeyboardView(component, title) {
    this.setState({
      customKeyboard: {
        component,
        initialProps: {title},
      },
    });
  }

  keyboardAccessoryViewContent() {

    return (
      <View  style={styles.blurContainer}>
        <View style={{borderTopWidth: StyleSheet.hairlineWidth, borderColor: '#bbb'}}/>
        <View style={styles.inputContainer}>
          <AutoGrowingTextInput
            maxHeight={200}
            style={styles.textInput}
            ref={(r) => {
              this.textInputRef = r;
            }}
            placeholder={'Message'}
            underlineColorAndroid="transparent"
            onFocus={() => this.resetKeyboardView()}
          />
          <TouchableOpacity style={styles.sendButton} onPress={() => KeyboardUtils.dismiss()}>
            <Text>Action</Text>
          </TouchableOpacity>
        </View>
        <View style={{flexDirection: 'row'}}>
          {
            this.getToolbarButtons().map((button, index) =>
              <TouchableOpacity onPress={button.onPress} style={{paddingLeft: 15, paddingBottom: 10}} key={index}>
                <Text>{button.text}</Text>
              </TouchableOpacity>)
          }
        </View>
      </View>
    );
  }

  renderRow(rowData) {
    return (
      <View style={{minHeight: 50, width: 100, backgroundColor: 'blue', borderRadius: 50, marginBottom: 20, alignItems: 'center'}}>
        <Text style={{color: 'white'}}>{rowData.text}</Text>
      </View>
    )
  }

  updateDataSource() {

    const testData = [...Array(100).keys()].map(i => { return {key: i, text: `test${Math.floor(Math.random()  * 100)}`}})
    this.setState({data: testData})
  }

  render() {

    const initialInputBarHeight = 80;

    return (
      <View style={styles.container}>

        <Button
          onPress={ () => {
              this.props._goBack(),
              KeyboardUtils.dismiss()
            }}
          style={{position: 'absolute', top: 0, left: 0}}label='Go Back'
        />

        <ListView
          dataSource={this.dataSource.cloneWithRows(testData)}
          renderRow={this.renderRow}
          renderScrollComponent={props => <InvertibleScrollView {...props} testID={'list'} inverted={true}/>}
          keyboardDismissMode={TrackInteractive ? 'interactive' : 'none'}
          contentOffset={{y: -initialInputBarHeight}}
        />

        <KeyboardAccessoryView
          renderContent={this.keyboardAccessoryViewContent}
          onHeightChanged={height => this.setState({keyboardAccessoryViewHeight: height})}
          trackInteractive={TrackInteractive}
          kbInputRef={this.textInputRef}
          kbComponent={this.state.customKeyboard.component}
          kbInitialProps={this.state.customKeyboard.initialProps}
          onItemSelected={this.onKeyboardItemSelected}
          onKeyboardResigned={this.resetKeyboardView}
          iOSScrollBehavior={Platform.OS === 'ios' ? NativeModules.KeyboardTrackingViewManager.KeyboardTrackingScrollBehaviorScrollToBottomInvertedOnly : null}
          revealKeyboardInteractive
        />

      </View>
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