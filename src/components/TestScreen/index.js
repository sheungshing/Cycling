import React, { useEffect, useState, useRef } from 'react';
import { View, Text, PermissionsAndroid, Platform, Button } from 'react-native';
import RNLocation from 'react-native-location';
import ReactNativeForegroundService from '@supersami/rn-foreground-service';

import MapView, { Marker, Polyline } from 'react-native-maps';

// real-time loction Configuration
RNLocation.configure({
  distanceFilter: 5, // Meters
  desiredAccuracy: {
    ios: 'best',
    android: 'balancedPowerAccuracy',
  },
  // Android only
  androidProvider: 'auto',
  interval: 5000, // Milliseconds
  fastestInterval: 2000, // Milliseconds
  maxWaitTime: 5000, // Milliseconds
  // iOS Only
  activityType: 'other',
  allowsBackgroundLocationUpdates: false,
  headingFilter: 1, // Degrees
  headingOrientation: 'portrait',
  pausesLocationUpdatesAutomatically: false,
  showsBackgroundLocationIndicator: false,
});







const TestScreen = () => {

  let initialRegion = {
    latitude: 22.417070,
    longitude: 114.227140,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  }

  const [initLocation, updateLocation] = useState();
  const [initLatLng, addLatLng] = useState([]);
  const [isStart, setStart] = useState(false);
  const [initRegion, setRegion] = useState(initialRegion);


  const map = useRef();
  const line = useRef();
  const prevlng = useRef();


  const checkPermi = () => {
    RNLocation.getCurrentPermission().then(currentPermission => {
      console.log(currentPermission);
    });
  }

  const foregroundServiceStart = () => {
    ReactNativeForegroundService.start({
      id: 1,
      title: 'Foreground Service',
      message: 'you are geolocation!',
    });

    ReactNativeForegroundService.add_task(
      () => {
        RNLocation.getLatestLocation({ timeout: 60000 })
          .then(latestLocation => {
            updateLocation(latestLocation);
            const lng = {
              latitude: latestLocation['latitude'],
              longitude: latestLocation['longitude'],
            }
            console.log(lng);
            addLatLng((initLatLng=> [...initLatLng, lng]))
            // addLatLng((initLatLng) => {
            //   if(initLatLng !==  lng){
            //     console.log("not  equal")
            //   }
            //   initLatLng = [...initLatLng, lng];
              
            // })
          })
      },
      {
        delay: 1000,
        onLoop: true,
        taskId: 'taskid',
        onError: (e) => console.log('Error logging:', e),
      },
    );
  }

  const foregroundServiceStop = () => {
    ReactNativeForegroundService.remove_all_tasks();
    ReactNativeForegroundService.stop();
  }

  const clearDate = () =>{
    
      addLatLng([]);
      console.log("clear data");
    
  }

//set the inital location
  useEffect(() => {
    RNLocation.getLatestLocation({ timeout: 60000 })
      .then(latestLocation => {
        console.log(latestLocation);
        const setStartRegion = {
          latitude: latestLocation.latitude,
          longitude: latestLocation.longitude,
          latitudeDelta: 0.0322,
          longitudeDelta: 0.0421,
        }
        setRegion(setStartRegion);
        map.current.animateToRegion(setStartRegion);

      }).catch(err => {
        console.log(err);
      });
  }, [])



  useEffect(() => {
    if (!initLocation) {
      console.log("none action !!!!!!!")
      return;
    }
    // console.log(initLocation['latitude','longitude']);
    const region = {
      latitude: initLocation['latitude'],
      longitude: initLocation['longitude'],
      latitudeDelta: 0.0121,
      longitudeDelta: 0.00821,
    }
    // if(initLatLng.length() >= 1 ){
    //   console.log("length > 2")
    // }
    //console.log("-------------------------------------------------------")
    //console.log(initLatLng);
    //console.log(initLocation);
    map.current.animateToRegion(region);
  }, [initLatLng])








  return (

    <View>
      <MapView
        ref={map}
        style={{ width: '100%', height: '100%' }}
        showsUserLocation={true}
        initialRegion={initialRegion}>
        <Polyline
          coordinates={initLatLng}
          strokeColor="red" // fallback for when `strokeColors` is not supported by the map-provider
          strokeWidth={3}
        />
      </MapView>
      <View
        style={{ position: 'absolute' }}>

        <Button
          title="Start"
          onPress={() => {
            checkPermi();
            foregroundServiceStart();

          }}
        />
        <Button
          title="Stop"
          onPress={() => {
            foregroundServiceStop();
            clearDate();
          }}
        />
      </View>
    </View>

  );
};

export default TestScreen;