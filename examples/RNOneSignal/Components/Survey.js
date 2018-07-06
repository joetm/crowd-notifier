/**
 * Survey Screen
 * @flow
 */

import React, { Component } from 'react'
import {
    AppRegistry,
    StyleSheet,
    View,
    Switch,
    TextInput,
    Dimensions,
    KeyboardAvoidingView,
    ActivityIndicator,
    Platform,
    ScrollView
} from 'react-native'

import {
    Container,
    Header,
    Content,
    Form,
    Item,
    Input,
    ListItem,
    Icon,
    Picker,
    Button,
    CheckBox,
    Radio,
    Right,
    Left,
    Text,
    Body,
    Title
} from 'native-base'

import { Rating } from 'react-native-elements'

import OneSignal from 'react-native-onesignal'

import Thanks from './Thanks'


let imageUri = 'https://cdn-images-1.medium.com/max/300/1*7xHdCFeYfD8zrIivMiQcCQ.png'


export default class RNOneSignal extends Component {
    constructor(properties) {
        super(properties);
    }

    state = {
        gainz: true,
        answered: false,
        selectedWillingnessNow: undefined,
        selectedWillingnessFuture: undefined,
    }

    willingnessNowChange = (value) => {
        console.log('selectedWillingnessNow', value)
        this.setState({ selectedWillingnessNow: value })
    }

    willingnessFutureChange = (value) => {
        console.log('selectedWillingnessFuture', value)
        this.setState({ selectedWillingnessFuture: value })
    }

    // validateEmail(email) {
    //     var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    //     return re.test(String(email).toLowerCase());
    // }

    async componentWillMount() {

        OneSignal.setLogLevel(7, 0)

        let requiresConsent = false
       
        this.setState({
            initialOpenFromPush : "Did NOT open from push",
            activityWidth : 0,
            width: 0,
            gainzChecked: false,
            activityMargin: 0,
            buttonColor : Platform.OS == "ios" ? "#ffffff" : "#d45653",
            jsonDebugText : "",
            privacyButtonTitle : "Privacy Consent: Not Granted",
            requirePrivacyConsent : requiresConsent
        })

        OneSignal.setRequiresUserPrivacyConsent(requiresConsent)

        const ONESIGNAL_API_KEY = process.env.REACT_APP_ONESIGNAL_API_KEY
        OneSignal.init(ONESIGNAL_API_KEY, {kOSSettingsKeyAutoPrompt : true})

        var providedConsent = await OneSignal.userProvidedPrivacyConsent()

        this.setState({privacyButtonTitle : `Privacy Consent: ${providedConsent ? "Granted" : "Not Granted"}`, privacyGranted : providedConsent})

        OneSignal.setLocationShared(true)
       
        OneSignal.inFocusDisplaying(2)

        // await Expo.Font.loadAsync({
        //     'Roboto': require('native-base/Fonts/Roboto.ttf'),
        //     'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
        //     'Ionicons': require('@expo/vector-icons/fonts/Ionicons.ttf'),
     //    });

    }

    componentDidMount() {
        this.onReceived = this.onReceived.bind(this)
        this.onOpened = this.onOpened.bind(this)
        this.onIds = this.onIds.bind(this)
        // this.onEmailRegistrationChange = this.onEmailRegistrationChange.bind(this);

        // prompt for location detection on load
        OneSignal.promptLocation()

        OneSignal.addEventListener('received', this.onReceived);
        OneSignal.addEventListener('opened', this.onOpened);
        OneSignal.addEventListener('ids', this.onIds);
        // OneSignal.addEventListener('emailSubscription', this.onEmailRegistrationChange);

    }

    componentWillUnmount() {
        OneSignal.removeEventListener('received', this.onReceived);
        OneSignal.removeEventListener('opened', this.onOpened);
        OneSignal.removeEventListener('ids', this.onIds);
        // OneSignal.removeEventListener('emailSubscription', this.onEmailRegistrationChange);
    }

    // onEmailRegistrationChange(registration) {
    //     console.log("onEmailRegistrationChange: ", registration);
    // }

    onReceived(notification) {
        console.log("Notification received: ", notification);

        this.setState({jsonDebugText : "RECEIVED: \n" + JSON.stringify(notification, null, 2)})
    }

    onOpened(openResult) {
      console.log('Message: ', openResult.notification.payload.body);
      console.log('Data: ', openResult.notification.payload.additionalData);
      console.log('isActive: ', openResult.notification.isAppInFocus);
      console.log('openResult: ', openResult);

      this.setState({jsonDebugText : "OPENED: \n" + JSON.stringify(openResult.notification, null, 2)})
    }

    onIds(device) {
        console.log('Device info: ', device);
    }

    switchGainz(newState) {
        this.setState({gainz: newState});
    }

    markAnswered = () => {
        console.log('markAnswered')
        this.setState({answered: true})
    }

    ratingCompleted(rating) {
      console.log("Rating is: " + rating)
    }

    render() {

      if (this.state.answered === true) {
          return (
            <Thanks />
          )
      }

      return (
      <Container>

        <Header>
          <Body>
            <Title>Self-Survey</Title>
          </Body>
        </Header>

        <Content>

            <ScrollView style={styles.scrollView}>

                <View>

                    <KeyboardAvoidingView style={{marginTop: 0, marginBottom: 32}}>

{/*
                        <ListItem>
                          <Text>Please complete the following microtask:</Text>
                        </ListItem>

                        <ListItem>
                            <Text style={{fontWeight: 'bold', marginTop: 16, marginBottom: 0}}>
                                Gainz?
                            </Text>
                        </ListItem>

                          <ListItem
                            onClick={() => {this.switchGainz(true)}}
                          >
                            <Left>
                              <Text>Yes!</Text>
                            </Left>
                            <Right>
                              <Radio selected={this.state.gainz} />
                            </Right>
                          </ListItem>

                          <ListItem
                            onClick={() => {this.switchGainz(false)}}
                          >
                            <Left>
                              <Text>No.</Text>
                            </Left>
                            <Right>
                              <Radio selected={!this.state.gainz} />
                            </Right>
                          </ListItem>

*/}

                        <Form>

                          <ListItem>
                              <Text>What is your willingness to work on a microtask <Text style={{fontWeight: 'bold'}}>at this moment</Text>?</Text>
                          </ListItem>
                          <ListItem>
                              <Picker
                                  mode="dropdown"
                                  iosIcon={<Icon name="ios-arrow-down-outline" />}
                                  placeholder="Select your willingness"
                                  placeholderStyle={{ color: "#bfc6ea" }}
                                  placeholderIconColor="#007aff"
                                  style={{
                                    width: undefined,
                                    color: this.state.selectedWillingnessNow > 0 ? '#000000' : '#FF0000',
                                  }}
                                  selectedValue={this.state.selectedWillingnessNow}
                                  onValueChange={this.willingnessNowChange}
                              >
                                  <Picker.Item label="Select" value="0" />
                                  <Picker.Item label="1 - No way, Jose!" value="1" />
                                  <Picker.Item label="2 - So, so" value="2" />
                                  <Picker.Item label="3 - Maybe" value="3" />
                                  <Picker.Item label="4 - Yes" value="4" />
                                  <Picker.Item label="5 - Totally" value="5" />
                              </Picker>
                          </ListItem>

                          <ListItem>
                              <Text>What is your willingness to work on a microtask <Text style={{fontWeight: 'bold'}}>in 10 minutes</Text>?</Text>
                          </ListItem>

                          <ListItem>
                                <Rating
                                  type="star"
                                  fractions={0}
                                  startingValue={0}
                                  imageSize={30}
                                  onFinishRating={this.ratingCompleted}
                                  style={{ marginBottom: 0 }}
                                />
                          </ListItem>

                          <ListItem
                            last
                          >
                              <Button
                                primary
                                onPress={this.markAnswered}
                                style={{marginTop: 4, marginBottom: 0}}
                              ><Text> Submit </Text></Button>
                          </ListItem>

                        </Form>

                    </KeyboardAvoidingView>

                    <View>
                      <Button
                        light
                        onPress={() => {
                            OneSignal.getPermissionSubscriptionState((subscriptionState) => {
                                this.setState({jsonDebugText : JSON.stringify(subscriptionState, null, 2)});
                            });
                        }}
                      >
                        <Text> Print Subscription State </Text>
                      </Button>
                      {/*
                        <Button style={styles.button}
                            title="Print Subscription State"
                            color={this.state.buttonColor}
                        />
                      */}
                    </View>

                    {/*
                    <View style={styles.buttonContainer}>
                        <Button style={styles.button}
                            disabled={!this.state.requirePrivacyConsent}
                            onPress={() => {
                               this.setState({privacyGranted : !this.state.privacyGranted, privacyButtonTitle : `Privacy State: ${!this.state.privacyGranted ? "Granted" : "Not Granted"}`});
                               OneSignal.provideUserConsent(!this.state.privacyGranted);
                            }}
                            title={this.state.privacyButtonTitle}
                            color={this.state.buttonColor}
                        />
                    </View>
                    */}

                    <Text style={styles.jsonDebugLabelText}>
                        {this.state.jsonDebugText}
                    </Text>

                </View>

            </ScrollView>

        </Content>

      </Container>

        );
    }
}

const styles = StyleSheet.create({
    scrollView: {
        backgroundColor: '#F5FCFF'
    },
    jsonDebugLabelText: {
        textAlign: 'left',
        color: '#333333',
        marginBottom: 5,
        marginHorizontal: 10
    },
    buttonContainer: {
        flexDirection: 'row',
        overflow: 'hidden',
        borderRadius: 10,
        marginVertical: 10,
        marginHorizontal: 10,
        backgroundColor: "#d45653"
    },
    button: {
        color: '#000000',
        flex: 1
    },
    imageStyle: {
        height: 200,
        width: 200,
        marginTop: 20
    },
    textInput: {
        marginHorizontal: 10,
        height: 40
    }
});

AppRegistry.registerComponent('RNOneSignal', () => RNOneSignal);
