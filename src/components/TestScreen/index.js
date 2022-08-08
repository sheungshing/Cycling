import React, {useEffect, useState} from 'react';
import {View, Text, PermissionsAndroid, Platform, Button} from 'react-native';
import RNLocation from 'react-native-location';
import ReactNativeForegroundService from '@supersami/rn-foreground-service';

//real-time loction Configuration
RNLocation.configure({
  distanceFilter: 10, // Meters
  desiredAccuracy: {
    ios: 'best',
    android: 'balancedPowerAccuracy',
  },
  // Android only
  androidProvider: 'auto',
  interval: 5000, // Milliseconds
  fastestInterval: 10000, // Milliseconds
  maxWaitTime: 5000, // Milliseconds
  // iOS Only
  activityType: 'other',
  allowsBackgroundLocationUpdates: false,
  headingFilter: 1, // Degrees
  headingOrientation: 'portrait',
  pausesLocationUpdatesAutomatically: false,
  showsBackgroundLocationIndicator: false,
});

const  checkPermi = () => {
  RNLocation.getCurrentPermission().then(currentPermission => {
    console.warn(currentPermission);
  });
}



const TestScreen = () => {
  const [initLocation, updateLocation] = useState([]);

  RNLocation.subscribeToLocationUpdates(locations => {
    
    updateLocation((initLocation) => [...initLocation, locations])
    
  })

  useEffect(()=>{
    
    if(initLocation){
      console.warn(initLocation)
    }
  },[initLocation])

  

  return (
    <View>
      <Text style={{textAlign: 'center'}}> Below </Text>

      <Button
        title="hide"
        onPress={() => {
          checkPermi();
          // ReactNativeForegroundService.start({
          //   id: 1,
          //   title: 'Foreground Service',
          //   message: 'you are online!',
          // });
        }}
      />

      <Button
        title="show"
        onPress={() => {
          ReactNativeForegroundService.stop();
          
        }}
      />
    </View>
  );
};

export default TestScreen;
