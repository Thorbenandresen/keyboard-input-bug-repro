import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  ScrollView
} from 'react-native'
import Button from './Button'



const route = {
  type: 'push',
  route: {
    key: 'chat',
    title: 'Chat'
  }
}



const Home = ({_handleNavigate}) => (
  <View style={styles.container}>
    <Text style={styles.title}>Home</Text>
    <Button onPress={() => _handleNavigate(route)} label='Go To Chat' />
        <ScrollView style={{paddingTop: 200}}>
            <Text style={styles.text}>Scroll me</Text>
            <Text style={styles.text}>Scroll me</Text>
            <Text style={styles.text}>Scroll me</Text>
          </ScrollView>
  </View>
)

const styles = StyleSheet.create({
  title: {
    marginBottom: 20,
    fontSize: 22,
    textAlign: 'center'
  },
  container: {
    paddingTop: 60
  },
    text: {
    color: 'white',
    fontSize: 20,
  }
})

export default Home
