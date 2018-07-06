import React from 'react'
// import { AppRegistry } from 'react-native'
import { createStackNavigator } from 'react-navigation'

import Splash from './Components/Splash'
import Survey from './Components/Survey'

export default createStackNavigator({
  Splash: {screen: Splash},
  Survey: {screen: Survey},
})

// AppRegistry.registerComponent('Splash', () => Splash);
// AppRegistry.registerComponent('Survey', () => Survey);
