import React, { Component } from 'react'
import Home from './Home'
import Chat from './Chat'
import {
  BackAndroid,
  NavigationExperimental,
  StyleSheet,
  View,
  TouchableOpacity,
  ScrollView,
  Text
} from 'react-native'

const {
  CardStack: NavigationCardStack
} = NavigationExperimental

class NavRoot extends Component {
  constructor (props) {
    super(props)
    this._renderScene = this._renderScene.bind(this)
    this._handleBackAction = this._handleBackAction.bind(this)
    this.state ={
      show: true
    }

  }
  componentDidMount () {
    BackAndroid.addEventListener('hardwareBackPress', this._handleBackAction)
  }
  componentWillUnmount () {
    BackAndroid.removeEventListener('hardwareBackPress', this._handleBackAction)
  }
  _renderScene (props) {
     const { route } = props.scene

    if (route.key === 'home') {
      return <Home _handleNavigate={this._handleNavigate.bind(this)} />
    }
    if (route.key === 'chat') {
      return <Chat _goBack={this._handleBackAction.bind(this)} />
    }

  }
  _handleBackAction () {
    if (this.props.navigation.index === 0) {
      return false
    }
    this.props.popRoute()
    return true
  }
  _handleNavigate (action) {
    switch (action && action.type) {
      case 'push':
        this.props.pushRoute(action.route)
        return true
      case 'back':
      case 'pop':
        return this._handleBackAction()
      default:
        return false
    }
  }
  render () {

  const route = {
      type: 'push',
      route: {
        key: 'chat',
        title: 'Chat'
      }
    }

    return (
      <View style={{flex: 1}}>
      <NavigationCardStack
        navigationState={this.props.navigation}
        onNavigate={this._handleNavigate.bind(this)}
        renderScene={this._renderScene} />

        { this.state.show  &&

          <View style ={[StyleSheet.absoluteFill, styles.container]}>

            <ScrollView style={{paddingTop: 200}}>
                    <Text style={styles.text}>Scroll me</Text>
                    <Text style={styles.text}>Scroll me</Text>
                    <Text style={styles.text}>Scroll me</Text>
            </ScrollView>

            <TouchableOpacity
              style={[styles.touchable, {backgroundColor: 'red'}]}
              onPress={() => this. _handleNavigate(route)}
            >
              <Text style={styles.text}>1. Press me to mount chat</Text>
            </TouchableOpacity>


            <TouchableOpacity
              style={[styles.touchable, {backgroundColor: 'blue'}]}
              onPress={() => this.setState({show: false})}
            >
              <Text style={styles.text}>2. Press me to close overlay</Text>
            </TouchableOpacity>

          </View>

        }

      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    opacity: 0.5,
    backgroundColor: 'green',
    alignItems: 'center',
    justifyContent: 'center'
  },
  touchable: {
   height: 50,
   width: 200,
   alignItems: 'center',
   justifyContent: 'center',
   backgroundColor: 'blue',
   margin: 20,
  },
  text: {
    color: 'white',
    fontSize: 20,
  }
})

export default NavRoot
