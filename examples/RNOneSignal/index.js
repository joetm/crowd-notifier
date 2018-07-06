import React from 'react'
// import { AppRegistry } from 'react-native'
// import { createStackNavigator } from 'react-navigation'
import { Root } from "native-base"

import Splash from './Components/Splash'
import Survey from './Components/Survey'

// export default createStackNavigator({
//   Splash: {screen: Splash},
//   Survey: {screen: Survey},
// })

export default class App extends React.Component {
    state = {
        isFirstLoad: true
    }
    _retrieveSplashState = () => {
        this.setState({isFirstLoad: true})
    }
    async componentWillMount() {
        // on first load, just show a message
        // on subsequent loads, show the survey
        this._retrieveSplashState();
        // this._storeSplashState();
    }
    render () {
        return (
          <Root>
            {
              this.state.isFirstLoad ?
                <Splash />
                :
                <Survey />
            }
          </Root>
        )        
    }
}
