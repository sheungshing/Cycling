/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect } from 'react';
import {
  StatusBar,
  PermissionsAndroid,
  Platform,
  AsyncStorage,
} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import Router from './src/Navigation/Router'

navigator.geolocation = require('@react-native-community/geolocation');

const App = () => {
  // request location premission 
  //AsyncStorage.clear();
  const androidPremission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: "Location Permission",
          message:
          "Hiking Safety requires to your location" +
          "so you can take awesome hiking.",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK"
        }

      );
    } catch (err) {
      console.log(err);
    }
  }

  const androidPremission2 = async () => {

    try {

      const backgroundgranted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_BACKGROUND_LOCATION,
        {
          title: 'Background Location Permission',
          message:
            'We need access to your location ' +
            'so you can get live quality updates.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (backgroundgranted === PermissionsAndroid.RESULTS.GRANTED) {
        
        console.log("getbackground location")
      }
    } catch (err) {
      console.log(err);
    }

  }

  useEffect(() => {
    if (Platform.OS === 'android') {
       androidPremission();
      androidPremission2();
    } else {
      //for IOS
      Geolocation.requestAuthorization();
    }
  }, [])

  return (
    <>
      <Router />
    </>
  );
};



export default App;
