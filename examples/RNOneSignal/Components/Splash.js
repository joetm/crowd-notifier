/**
 * Survey Screen
 * @flow
 */

import React from 'react'
import { StyleSheet, View, Text, AppRegistry } from 'react-native'

export default SplashScreen = () => (
  <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    <Text style={styles.welcome}>
        Thanks for participating in this survey!
    </Text>
    <Text style={styles.instructions}>
        You may close this app.{'\n'}
        We will notify you in time.
    </Text>
  </View>
)

const styles = StyleSheet.create({
    scrollView: {
        backgroundColor: '#F5FCFF'
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
        marginHorizontal: 10
    }
})

AppRegistry.registerComponent('Splash', () => Splash);
