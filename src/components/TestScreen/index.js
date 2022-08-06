import React , {useEffect, useState} from "react";
import { View, Text, PermissionsAndroid,Platform, Button } from "react-native";
import RNLocation from 'react-native-location'






const TestScreen = () => {

  const {press, onpress} = useState();

  const setLocatConfi =  RNLocation.configure({
    distanceFilter: 5, // Meters
    desiredAccuracy: {
      ios: "best",
      android: "balancedPowerAccuracy"
    },
    // Android only
    androidProvider: "auto",
    interval: 5000, // Milliseconds
    fastestInterval: 10000, // Milliseconds
    maxWaitTime: 5000, // Milliseconds
    // iOS Only
    activityType: "other",
    allowsBackgroundLocationUpdates: false,
    headingFilter: 1, // Degrees
    headingOrientation: "portrait",
    pausesLocationUpdatesAutomatically: false,
    showsBackgroundLocationIndicator: false,
})

const  locationSubscription = RNLocation.requestPermission({
  ios: "whenInUse",
  android: {
    detail: "fine"}
  }).then(granted =>{
    if(granted){
      RNLocation.subscribeToLocationUpdates(locations => 
        console.warn( locations));
    }
  })
  
  

  ACCESS_BACKGROUND_LOCATION





  return (
    

    <View>
      <Text> GOOD</Text>

      

      <Button 
        title="haha"
        onPress={()=>{
          locationSubscription();
        }}
        />
    </View>
  )
}

export default TestScreen;