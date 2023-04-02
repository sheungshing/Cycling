import React, {useEffect, useState, useRef} from 'react';
const geolib = require('geolib');
import {
  Alert,
  AsyncStorage,
  View,
  Text,
  PermissionsAndroid,
  Platform,
  Button,
  StyleSheet,
  Pressable,
} from 'react-native';
import RNLocation from 'react-native-location';
import ReactNativeForegroundService from '@supersami/rn-foreground-service';

import Geolocation from '@react-native-community/geolocation';

import MapView, {Marker, Polyline} from 'react-native-maps';

const TrackingMap = () => {
  let initialRegion = {
    latitude: 22.41707,
    longitude: 114.22714,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  const map = useRef();

  const [initalLocation, setinitalLocation] = useState();
  const [initLatLng, addLatLng] = useState([]);
  const [initLocation, updateLocation] = useState();
  const [initButton, setButton] = useState(false);
  const [initLockView, setLockView] = useState(false);
  const [watchId, setWatchId] = useState();
  let Alerted = false;
  const BSArray = [
    {name: 'Tai Shing Stream, Shing Mun',latitude: 22.39894963177416,longitude:114.14740932339873},
    {name: 'Lion Rock Peak',latitude: 22.35232973265008,longitude:114.18703856731156},
    {name: 'Sharp Peak', latitude: 22.433357844093003, longitude: 114.36681898694634 },
    {name: 'Quadruplex Pool, Sai Kung East', latitude: 22.40273134367112, longitude: 114.36746100742158 },
    {name: 'Yin Tsz Ngam, Sai Kung East', latitude: 22.3874958, longitude: 114.3905916 },
    {name: 'Kim Chu Wan, Sai Kung East', latitude: 22.357652, longitude: 114.374810 },
    {name: 'Bride’s Pool Waterfall, Plover Cove', latitude: 22.503327918257988, longitude: 114.23921076237822 },
    {name: 'Kau Nga Ling Area, Lantau South', latitude: 22.242066994655392, longitude: 113.9173329529261 },
    {name: 'Shui Lo Cho, Lantau South', latitude: 22.231340044380264, longitude: 113.85624283490502 },
    {name: 'Lo Hon Tower, Lantau South', latitude: 22.253347790857546, longitude: 113.92329645861722 },
    {name: 'Inverted Wrist Cliff, Lantau South', latitude: 22.250452545788352, longitude: 113.91629723992438 },
    {name: 'Wong Lung Stream, Lantau North', latitude: 22.26465488102063, longitude: 113.9535242487145 },
    {name: 'Nei San Stream, Lantau North', latitude: 22.2818196527751, longitude: 113.91646473063562 },
    {name: 'Monkey Cliff, Pat Sin Leng', latitude: 22.484221804631954, longitude: 114.23491901363708 },
    {name: 'Ping Nam Stream, Pat Sin Leng', latitude: 22.513972065567152, longitude: 114.209409224866 },
    {name: 'Tai Shek Stream, Tai Mo Shan', latitude: 22.421293455981985, longitude: 114.12170725593903 },
    {name: 'Tiu Shau Ngam, Ma On Shan', latitude: 22.41624550800231, longitude: 114.24487709882355 },
    {name: 'Fei Ngo Shan, Ma On Shan', latitude: 22.338247825060193, longitude: 114.22350691452257},
  ]
  const checkNearBlackSpot = (currentPosition) => {
    for(let j=0; j<BSArray.length; j++){
      const point = {latitude: BSArray[j].latitude, longitude: BSArray[j].longitude};
      //console.log(point);
      //console.log(currentPosition);
      const distance = geolib.getDistance(currentPosition, point);
      //console.log(BSArray[j].name);
      if(distance < 100 && Alerted == false){
        //alert
        Alert.alert(
          'Warning',
          `You are near ${BSArray[j].name}!`,
          [{ text: 'OK' }]
        );
        Alerted = true;
      }
    }
  }

  const foregroundServiceStart = () => {
    Alerted = false;
    addLatLng([]);
    let watchId = Geolocation.watchPosition(
      position => {
        const tempPosition = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        };

        checkNearBlackSpot(tempPosition)
        updateLocation(tempPosition);
        addLatLng(initLatLng => [...initLatLng, tempPosition]);
        // updateLocation(previousPosition => (previousPosition,position));
      },
      error => {
        // See error code charts below.
        console.log(error.code, error.message);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
        distanceFilter: 5,
      },
    );
    setWatchId(watchId)
  };

  const foregroundServiceStop = async () => {
    Geolocation.clearWatch(watchId)
    let value = await AsyncStorage.getItem('routesId');
    if (value === null) {
      value = "0"
    }
    await AsyncStorage.setItem(value, JSON.stringify(initLatLng))
    await AsyncStorage.setItem("routesId", (parseInt(value) + 1).toString())
  };

  useEffect(() => {
    Geolocation.getCurrentPosition(
      position => {
        // console.log(position);
        const setStartRegion = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: 0.0322,
          longitudeDelta: 0.0421,
        };
        setinitalLocation(setStartRegion);
        map.current.animateToRegion(setStartRegion);
      },
      error => {
        // See error code charts below.
        console.log(error.code, error.message);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  }, []);

  useEffect(() => {
    if (!initLocation) {
      return;
    }
    if (initLockView) {
      const trackRegion = {
        latitude: initLocation.latitude,
        longitude: initLocation.longitude,
        latitudeDelta: 0.0121,
        longitudeDelta: 0.00821,
      };
      // console.log(trackRegion);
      map.current.animateToRegion(trackRegion);
    }
  }, [initLocation]);

  
  return (
    <View>
      <MapView
        ref={map}
        style={{width: '100%', height: '100%'}}
        showsUserLocation={true}
        initialRegion={initialRegion}>
        <Polyline
          coordinates={initLatLng}
          strokeColor="red" // fallback for when `strokeColors` is not supported by the map-provider
          strokeWidth={3}
        />
       
<Marker icon={require('./alert.png')} //Tai Shing Stream, Shing Mun
coordinate={{ latitude: 22.39894963177416, longitude: 114.14740932339873 }}/>
<Marker icon={require('./alert.png')} //Lion Rock Peak
coordinate={{ latitude: 22.35232973265008, longitude: 114.18703856731156 }}/>
<Marker icon={require('./alert.png')} //Sharp Peak, Sai Kung East
coordinate={{ latitude: 22.433357844093003, longitude: 114.36681898694634 }}/>
<Marker icon={require('./alert.png')} //Quadruplex Pool, Sai Kung East
coordinate={{ latitude: 22.40273134367112, longitude: 114.36746100742158 }}/>
<Marker icon={require('./alert.png')} //Yin Tsz Ngam, Sai Kung East
coordinate={{ latitude: 22.3874958, longitude: 114.3905916 }}/>
<Marker icon={require('./alert.png')} //Kim Chu Wan, Sai Kung East
coordinate={{ latitude: 22.357652, longitude: 114.374810 }}/>
<Marker icon={require('./alert.png')} //Bride’s Pool Waterfall, Plover Cove
coordinate={{ latitude: 22.503327918257988, longitude: 114.23921076237822 }}/>
<Marker icon={require('./alert.png')} //Kau Nga Ling Area, Lantau South
coordinate={{ latitude: 22.242066994655392, longitude: 113.9173329529261 }}/>
<Marker icon={require('./alert.png')} //Shui Lo Cho, Lantau South
coordinate={{ latitude: 22.231340044380264, longitude: 113.85624283490502 }}/>
<Marker icon={require('./alert.png')} //Lo Hon Tower, Lantau South
coordinate={{ latitude: 22.253347790857546, longitude: 113.92329645861722 }}/>
<Marker icon={require('./alert.png')} //Inverted Wrist Cliff, Lantau South
coordinate={{ latitude: 22.250452545788352, longitude: 113.91629723992438 }}/>
<Marker icon={require('./alert.png')} //Wong Lung Stream, Lantau North
coordinate={{ latitude: 22.26465488102063, longitude: 113.9535242487145 }}/>
<Marker icon={require('./alert.png')} //Nei San Stream, Lantau North
coordinate={{ latitude: 22.2818196527751, longitude: 113.91646473063562 }}/>
<Marker icon={require('./alert.png')} //Monkey Cliff, Pat Sin Leng
coordinate={{ latitude: 22.484221804631954, longitude: 114.23491901363708 }}/>
<Marker icon={require('./alert.png')} //Ping Nam Stream, Pat Sin Leng
coordinate={{ latitude: 22.513972065567152, longitude: 114.209409224866 }}/>
<Marker icon={require('./alert.png')} //Tai Shek Stream, Tai Mo Shan
coordinate={{ latitude: 22.421293455981985, longitude: 114.12170725593903 }}/>
<Marker icon={require('./alert.png')} //Tiu Shau Ngam, Ma On Shan
coordinate={{ latitude: 22.41624550800231, longitude: 114.24487709882355 }}/>
<Marker icon={require('./alert.png')} //Fei Ngo Shan, Ma On Shan
coordinate={{ latitude: 22.338247825060193, longitude: 114.22350691452257 }}/>


      </MapView>
      {initButton ? (
        <View style={styles.tracktButton}>
          <Button
            color="red"
            title="Stop"
            onPress={async () => {
              await foregroundServiceStop();
              setButton(false);
            }}
          />
        </View>
      ) : (
        <View style={styles.tracktButton}>
          <Button
            title="Start"
            onPress={() => {
              foregroundServiceStart();
              setButton(true);
            }}
          />
        </View>
      )}

      {initLockView ? (
        <View style={styles.lockButton}>
          <Button color='red' title="LockView" onPress={() => setLockView(false)} />
        </View>
      ) : (
        <View style={styles.lockButton}>
          <Button title="LockView" onPress={() => setLockView(true)} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tracktButton: {
    position: 'absolute',
    justifyContent: 'center',
    width: '70%',
    borderRadius: 5,
    bottom: '3%',
    alignSelf: 'center',
  },
  lockButton: {
    position: 'absolute',
    justifyContent: 'center',
    alignSelf: 'flex-start',
  },
});

export default TrackingMap;
