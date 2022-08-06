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
  Platform
} from 'react-native';
import Geolocation from '@react-native-community/geolocation';

import Router from './src/Navigation/Router'
import SearchResult from './src/screens/SearchResult'
// import HomeScreen from './src/screens/HomeScreen';
// import DestinationSearch from './src/screens/DestinationSearch';


navigator.geolocation = require('@react-native-community/geolocation');

const App = () => {
  // request location premission 
  const  androidPremission = async ()=>{
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: "Location Permission",
          message:
            "I Smart Cycling Partrol needs to your location" +
            "so you can take awesome cycling.",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK"
        }

      );
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(()=>{
    if(Platform.OS ==='android'){
       androidPremission();
    }else{ 
      //for IOS
      Geolocation.requestAuthorization();
    }
  }, [])

  return (
    <>
    <Router/>
    </>
  );
};



export default App;
