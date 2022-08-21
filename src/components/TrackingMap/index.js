import React, {useEffect, useState, useRef} from 'react';
import {
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
import BackgroundTimer from 'react-native-background-timer';

import Geolocation from '@react-native-community/geolocation';
const geolib = require('geolib');

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
  const [speed, setspeed] = useState('0');
  const [distance, setDistance] = useState(0);

  const [secondsLeft, setSecondsLeft] = useState(0);
  const [timerOn, setTimerOn] = useState(false);

  const foregroundServiceStart = () => {
    ReactNativeForegroundService.start({
      id: 1,
      title: 'Foreground Service',
      message: 'you are geolocation!',
    });

    ReactNativeForegroundService.add_task(
      () => {
        Geolocation.watchPosition(
          position => {
            //console.log(position);
            const tempPosition = {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            };

            updateLocation(position);
            const speedStr = position.coords.speed.toString();
            setspeed(
              speedStr.substring(0, speedStr.length - (speedStr.length - 5)),
            );
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
      },
      {
        delay: 1500,
        onLoop: false,
        taskId: 'taskid',
        onError: e => console.log('Error logging:', e),
      },
    );
  };

  const foregroundServiceStop = () => {
    Geolocation.stopObserving();
    addLatLng([]);
    setspeed('0');
    setDistance(0);
    ReactNativeForegroundService.remove_all_tasks();
    ReactNativeForegroundService.stop();
  };

  useEffect(() => {
    //console.log(map.current.getCamera());

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

    setDistance(geolib.getPathLength(initLatLng) / 1000);

    if (initLockView && initButton) {
      const trackRegion = {
        latitude: initLocation.coords.latitude,
        longitude: initLocation.coords.longitude,
        latitudeDelta: 0.00821,
        longitudeDelta: 0.00521,
      };
      // console.log(trackRegion);
      map.current.animateToRegion(trackRegion);
    }
  }, [initLocation]);

  const startTimer = () => {
    BackgroundTimer.runBackgroundTimer(() => {
      setSecondsLeft(secs => secs+1
      );
    }, 1000);
  };

  const stopTimer =()=>{
    setSecondsLeft(0);
    BackgroundTimer.stopBackgroundTimer();
  }
  

  // Runs when timerOn value changes to start or stop timer
  useEffect(() => {
    if (timerOn) startTimer();
    else BackgroundTimer.stopBackgroundTimer();
    return () => {
      BackgroundTimer.stopBackgroundTimer();
    };
  }, [timerOn]);

  // Checks if secondsLeft = 0 and stop timer if so
  useEffect(() => {
    if (secondsLeft === 0) BackgroundTimer.stopBackgroundTimer();
  }, [secondsLeft]);

  const clockify = () => {
    let hours = Math.floor(secondsLeft / 60 / 60);
    let mins = Math.floor((secondsLeft / 60) % 60);
    let seconds = Math.floor(secondsLeft % 60);
    let displayHours = hours < 10 ? `0${hours}` : hours;
    let displayMins = mins < 10 ? `0${mins}` : mins;
    let displaySecs = seconds < 10 ? `0${seconds}` : seconds;
    return {
      displayHours,
      displayMins,
      displaySecs,
    };
  };

  return (
    <View>
      <MapView
        ref={map}
        style={{width: '100%', height: '100%'}}
        showsUserLocation={true}
        initialRegion={initialRegion}
        followsUserLocation={true}
        userLocationFastestInterval={500}
        userLocationUpdateInterval={1000}
        showsMyLocationButton={false}>
        <Polyline
          coordinates={initLatLng}
          strokeColor="red" // fallback for when `strokeColors` is not supported by the map-provider
          strokeWidth={3}
        />
      </MapView>

      <View style={styles.dashBoardContainer}>
        <View style={styles.dashBoardCol}>
          <View style={styles.dashBoardRow}>
            <Text style={styles.dataStyle}>
              Time:{'\n'}
              {clockify().displayHours}:{clockify().displayMins}:
              {clockify().displaySecs}
            </Text>
            <Text style={styles.dataStyle}>
              Speed:{'\n'}
              {speed} km/h{' '}
            </Text>
          </View>
          <View style={[styles.dashBoardRow, {paddingTop: 5}]}>
            <Text style={styles.dataStyle}>
              Distance:{'\n'}
              {distance} km{' '}
            </Text>
            <Text style={styles.dataStyle}>Weather: {}°C </Text>
          </View>
        </View>
      </View>

      {initButton ? (
        <View style={styles.tracktButton}>
          <Button
            color="red"
            title="Stop"
            onPress={() => {
              foregroundServiceStop();
              stopTimer();
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
              startTimer();
              setButton(true);
            }}
          />
        </View>
      )}

      {initLockView ? (
        <View style={styles.lockButton}>
          <Button color="red" title="Lock" onPress={() => setLockView(false)} />
        </View>
      ) : (
        <View style={styles.lockButton}>
          <Button title="Lock" onPress={() => setLockView(true)} />
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
  },
  dashBoardContainer: {
    position: 'absolute',
    width: '95%',
    height: '15%',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.75 )',
    borderRadius: 20,
    top: '1%',
    alignSelf: 'center',
  },
  dashBoardRow: {
    flexDirection: 'row',

    justifyContent: 'space-around',
  },
  dashBoardCol: {
    flexDirection: 'column',
  },
  dataStyle: {
    fontSize: 20,
    width: '40%',
  },
  tracktButton: {
    position: 'absolute',
    justifyContent: 'center',
    width: '70%',
    borderRadius: 5,
    bottom: '2%',
    alignSelf: 'center',
    // borderRadius: 20,
    // padding: 10,
    // elevation: 2,
    // backgroundColor:'blue'
  },
  lockButton: {
    position: 'absolute',
    justifyContent: 'center',
    alignSelf: 'flex-end',
    bottom: '50%',
    // borderRadius: 10,
    // padding: 5,
    // elevation: 2
  },
});

export default TrackingMap;
