/**
 * Thanks Screen
 * @flow
 */

import React from 'react'
import { AppRegistry, BackHandler } from 'react-native'

import {
    Container,
    Header,
    Content,
    Right,
    Left,
    Text,
    Body,
    Title
} from 'native-base'


export default class Thanks extends React.Component {

    componentDidMount() {
        // shut down app on back button press
        // might want to use this instead: https://www.npmjs.com/package/react-native-exit-app
        BackHandler.addEventListener('hardwareBackPress', function() {
          BackHandler.exitApp();
        })
    }

    render() {
        return (
          <Container>

            <Header>
              <Body>
                <Title>Self-Survey</Title>
              </Body>
            </Header>

            <Content>
              <Text style={{textAlign: 'center', margin: 16}}>
                Thanks
                {'\n'}
                Please close the app now.
              </Text>
            </Content>

          </Container>
        )
    }
}

AppRegistry.registerComponent('Thanks', () => Thanks);
