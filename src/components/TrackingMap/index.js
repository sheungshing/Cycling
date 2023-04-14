import React, {useEffect, useRef, useState} from 'react';
import {
  Alert,
  Text,
  View,
  Button,
  Image,
  Pressable,
  StyleSheet,
  Dimensions,
  AsyncStorage,
} from 'react-native';

import MapView, {Marker, Polyline} from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import ReactNativeForegroundService from '@supersami/rn-foreground-service';
//import {transform} from '@babel/core';
// import WeatherDisplay from '../weather';
import {
  getWeather,
  dailyForecast,
  showWeather,
  getLocation,
} from 'react-native-weather-api';
import * as geolib from 'geolib';
import BackgroundTimer from 'react-native-background-timer';

//set marker of  destination
//import DestinationMarker from '../Markers/DestinationMarker';
//import MapViewDirections from 'react-native-maps-directions';

//use navigation
import {useNavigation} from '@react-navigation/native';
//import icon
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
//import data
//import toilets from '../../Assets/data/toilets';

import {DataStore} from 'aws-amplify';
//import {Toilet, BlackSpot} from '../../models';

//import AsyncStorage from '@react-native-async-storage/async-storage';
import {LogBox} from 'react-native';

import blackspots from '../../Assets/data/blackspots';

const TrackingMap = props => {
  LogBox.ignoreLogs(['new NativeEventEmitter']); // Ignore log notification by message
  LogBox.ignoreAllLogs(); //Ignore all log notifications
  const navigation = useNavigation();
  const [des, setDes] = useState(null);
  // const [Toilets, setToilets] = useState(null);
  // const [BlackSpots, setBlackSpots] = useState(null);
  // const navigation = useNavigation();
  // if(props)
  //   console.log(props);
  // useEffect(() => {
  //   // if(props)
  //     console.log(props);
  // }, [props]);
  const updateDestination = savedData => {
    console.log('success!');
    setDes(savedData);
  };

  // useEffect(() => {
  //   DataStore.query(Toilet).then(results => {
  //     setToilets(results);
  //   });
  // }, []);

  // useEffect(() => {
  //   DataStore.query(BlackSpot).then(results => {
  //     setBlackSpots(results);
  //   });
  // }, []);

  useEffect(() => {
    if (initLocation)
      console.log(initLocation.coords.latitude, initLocation.coords.longitude);
    if (des) console.log(des.name);
    return;
  }, [des]);

  //console.log(temp);
  let initialRegion = {
    latitude: 22.41707,
    longitude: 114.22714,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  const getWeatherdata = (latitude, longitude) => {
    getWeather({
      key: '91eefab72aa00afbb89bd11f60e07cbc',
      lat: latitude,
      lon: longitude,
      unit: 'metric',
    })
      .then(() => {
        let data = new showWeather();
        setWeatherData({temp: data.temp, icon: data.icon});
      })
      .catch(err => {
        console.log(err);
      });
  };

  const BSArray = blackspots;
  const checkNearBlackSpot = currentPosition => {
    for (let j = 0; j < BSArray.length; j++) {
      const point = {
        latitude: BSArray[j].latitude,
        longitude: BSArray[j].longitude,
      };
      //console.log(point);
      //console.log(currentPosition);
      const distances = geolib.getDistance(currentPosition, point);
      //console.log(BSArray[j].name);
      //console.log(BSArray);
      if (distances < 100 && BSArray[j].alerted == false) {
        //alert
        Alert.alert('Warning', `You are near ${BSArray[j].name}!`, [
          {text: 'OK'},
        ]);
        BSArray[j].alerted = true; //Alerted = true
        //console.log(BSArray);
      }
    }
  };

  const map = useRef();

  const [initalLocation, setinitalLocation] = useState();
  const [initLatLng, addLatLng] = useState([]);
  const [initLocation, updateLocation] = useState();
  const [speed, setspeed] = useState('0');
  const [distance, setDistance] = useState(0);
  const [initButton, setButton] = useState(false);
  const [initLockView, setLockView] = useState(false);
  const [altitude, setAltitude] = useState(null);
  //timer
  const [timerOn, setTimerOn] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(0);
  const [weatherData, setWeatherData] = useState(null);

  const [calories, setCalories] = useState(0);
  const [tCalories, setTCalories] = useState([]);
  const [showTCalories, setShowTCalories] = useState(0);

  //flag indicate start button pressed
  const [started, setStarted] = useState(false);
  const [pasue, setPasue] = useState(false);
  //flag indicate dashBoard button pressed
  const [DashBoardShow, setDashBoardShow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const getAltitude = async (latitude, longitude, apiKey) => {
    const url = `https://maps.googleapis.com/maps/api/elevation/json?locations=${latitude},${longitude}&key=${apiKey}`;
    const response = await fetch(url);
    const data = await response.json();

    if (data.status === 'OK') {
      const altitude = data.results[0].elevation;
      console.log('Altitude: ' + altitude);
      return altitude;
    } else {
      throw new Error(`Error getting elevation data: ${data.status}`);
    }
  };

  const foregroundServiceStart = () => {
    setStarted(true);
    setPasue(false);
    startTimer();
    ReactNativeForegroundService.start({
      id: 1,
      title: 'Foreground Service',
      message: 'you are geolocation!',
    });

    ReactNativeForegroundService.add_task(
      () => {
        Geolocation.watchPosition(
          position => {
            updateLocation(position);
            const tempPosition = {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            };
            console.log(position);
            checkNearBlackSpot(tempPosition);

            //speed
            const speedStr = position.coords.speed.toString();
            setspeed(
              speedStr.substring(0, speedStr.length - (speedStr.length - 5)),
            );
            // getAltitude(tempPosition.latitude, tempPosition.longitude, 'AIzaSyDXM1OETGAv7cr2AXBRf1RwpTiDAOhuJDQ').then(altitude => {setAltitude(Math.floor(altitude))

            const tempAltitude = getAltitude(
              tempPosition.latitude,
              tempPosition.longitude,
              'AIzaSyDXM1OETGAv7cr2AXBRf1RwpTiDAOhuJDQ',
            );
            console.log(tempAltitude);
            //setAltitude(Math.floor(tempAltitude));
            // getAltitude(tempPosition.latitude, tempPosition.longitude, 'AIzaSyDXM1OETGAv7cr2AXBRf1RwpTiDAOhuJDQ').then(altitude => {
            //   console.log(altitude)
            //   console.log('1')
            //   setAltitude(Math.floor(altitude));
            //   setIsLoading(false);
            // });
            addLatLng(initLatLng => [...initLatLng, tempPosition]);
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

  const foregroundServiceStop = command => {
    // console.log(command);

    if (command === 'stop') {
      setDes(null);
      stopTimer(command);
      Geolocation.stopObserving();
      addLatLng([]);
      setspeed('0');
      setDistance(0);
      setCalories(0);
      setTCalories([]);
      setShowTCalories(0);
      ReactNativeForegroundService.remove_all_tasks();
      ReactNativeForegroundService.stop();
      setStarted(false);
      setPasue(false);
      // update result
      uploadResult();
    }
    if (command === 'pause') {
      // console.log('pasue the tracking!');
      setPasue(true);
      stopTimer(command);
      Geolocation.stopObserving();
      ReactNativeForegroundService.remove_all_tasks();
      ReactNativeForegroundService.stop();
    }
  };

  //Timer
  const startTimer = () => {
    BackgroundTimer.runBackgroundTimer(() => {
      setSecondsLeft(secs => secs + 1);
    }, 1000);
  };
  const stopTimer = command => {
    if (command === 'stop') {
      setSecondsLeft(0);
      BackgroundTimer.stopBackgroundTimer();
    }
    if (command === 'pause') {
      BackgroundTimer.stopBackgroundTimer();
    }
  };

  //lock view
  useEffect(() => {
    if (!initLocation) {
      return;
    }
    if (initLockView) {
      console.log(initLocation);
      const trackRegion = {
        latitude: initLocation.latitude,
        longitude: initLocation.longitude,
        latitudeDelta: 0.0322,
        longitudeDelta: 0.0421,
      };
      // console.log(trackRegion);

      map.current.animateToRegion(trackRegion);
      //getWeatherdata(initLocation.coords.latitude, initLocation.coords.longitude);
      console.log(weatherData);
    }
  }, [initLocation]);

  //get current location initially
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
        updateLocation(position);
        map.current.animateToRegion(setStartRegion);
        console.log('initLocation is set ' + initLocation);
        getWeatherdata(position.coords.latitude, position.coords.longitude);
      },
      error => {
        // See error code charts below  .
        console.log(error.code, error.message);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  }, []);

  //location change
  useEffect(() => {
    if (!initLocation) {
      return;
    }
    setDistance(geolib.getPathLength(initLatLng) / 1000);

    const trackRegion = {
      latitude: initLocation.coords.latitude,
      longitude: initLocation.coords.longitude,
      latitudeDelta: 0.0121,
      longitudeDelta: 0.00821,
    };
    // console.log(trackRegion);
    if (initLockView) {
      map.current.animateToRegion(trackRegion);
    }

    console.log('done');
    getWeatherdata(initLocation.coords.latitude, initLocation.coords.longitude);
    console.log(weatherData);
  }, [initLocation]);

  //timmer change
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

  // update the result (number of routes finished) after finished
  const uploadResult = async () => {
    try {
      let tRide = await AsyncStorage.getItem('@tRide'); //number of ride
      let totalComplete = await AsyncStorage.getItem('@routeCompleted');
      let rideDetails = await AsyncStorage.getItem('@detailsRide');
      if (tRide !== null) {
        parseFloat(tRide);
        tRide = (parseFloat(tRide) + distance).toFixed(3);
      } else {
        tRide = distance;
      }

      if (totalComplete !== null) {
        totalComplete++;
      } else {
        totalComplete = 1;
      }

      let yourDate = new Date();
      const offset = yourDate.getTimezoneOffset();
      yourDate = new Date(yourDate.getTime() - offset * 60 * 1000);
      const date = yourDate.toISOString().split('T')[0];
      const time = yourDate.toISOString().split('T')[1].split('.')[0];

      if (rideDetails !== null) {
        let objects = JSON.parse(rideDetails);
        let tempDetail = {
          id: totalComplete - 1,
          dis: distance,
          spe: speed,
          cal: showTCalories,
          date: date,
          time: time,
        };

        let objectArray = objects;
        // objectArray.push(objects)
        objectArray.push(tempDetail);

        rideDetails = JSON.stringify(objectArray);
      } else {
        let object = [];
        let tempDetail = {
          id: 0,
          dis: distance,
          spe: speed,
          cal: showTCalories,
          date: date,
          time: time,
        };
        object.push(tempDetail);
        rideDetails = JSON.stringify(object);
      }

      await AsyncStorage.setItem('@tRide', tRide.toString());
      await AsyncStorage.setItem('@routeCompleted', totalComplete.toString());
      await AsyncStorage.setItem('@detailsRide', rideDetails);
    } catch (e) {
      console.log(e);
    }
  };

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
        {blackspots.map(blackspot => (
          <Marker
            coordinate={{
              latitude: blackspot.latitude,
              longitude: blackspot.longitude,
            }}
            icon={require('./alert.png')}
          />
        ))}
      </MapView>

      <View
        //id="weather container"
        style={{
          position: 'absolute',
          top: '50%',
          right: '1%',
          backgroundColor: 'rgba(0, 0, 0, 0.2)',
          opacity: 0.8,
          borderRadius: 5,
        }}>
        {weatherData && (
          <Image
            style={{width: 50, height: 50}}
            source={{uri: `${weatherData.icon}`}}
          />
        )}
        <Text>{weatherData ? Math.floor(weatherData.temp) + 'ºC' : 0}</Text>
      </View>

      <View
        style={{
          bottom: '5%',
          position: 'absolute',
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'center',
          alignSelf: 'center',
        }}>
        {(!started || pasue) && (
          <View style={{marginHorizontal: 30}}>
            <Button
              title="Start"
              onPress={() => {
                foregroundServiceStart();
              }}
            />
          </View>
        )}

        {started && !pasue && (
          <View style={{marginHorizontal: 30}}>
            <Button
              title="Pause"
              onPress={() => {
                foregroundServiceStop('pause');
              }}
            />
          </View>
        )}

        {started && (
          <View style={{marginHorizontal: 30}}>
            <Button
              title="Stop"
              onPress={() => {
                foregroundServiceStop('stop');
              }}
            />
          </View>
        )}
      </View>

      <Pressable
        style={({pressed}) => [
          {
            backgroundColor: pressed ? 'grey' : 'white',
          },
          styles.dashBoardButtonContainer,
        ]}
        onPress={() => {
          setDashBoardShow(!DashBoardShow);
        }}>
        <View>
          <AntDesign name="dashboard" size={50} color="black" />
        </View>
      </Pressable>

      {DashBoardShow && (
        <View style={styles.dashBoardContainer}>
          <View style={styles.row}>
            <View style={[styles.cell, styles.leftTop]}>
              <Text style={styles.titleText}>Speed</Text>
              <Text style={styles.dataValue}>{speed} m/s</Text>
            </View>
            <View style={[styles.cell, styles.rightTop]}>
              <Text style={styles.titleText}>Distance</Text>
              <Text style={styles.dataValue}>{distance} m</Text>
            </View>
          </View>
          <View style={styles.row}>
            <View style={[styles.cell, styles.leftBottom]}>
              <Text style={styles.titleText}>Time</Text>
              <Text style={styles.dataValue}>
                {clockify().displayHours}:{clockify().displayMins}:
                {clockify().displaySecs}
              </Text>
            </View>
            <View style={[styles.cell, styles.rightBottom]}>
              <Text style={styles.titleText}>Altitude</Text>
              {isLoading ? (
                <Text style={styles.dataValue}>Loading altitude data...</Text>
              ) : altitude ? (
                <Text style={styles.dataValue}>{altitude} m</Text>
              ) : (
                <Text style={styles.dataValue}>
                  Failed to retrieve altitude data.
                </Text>
              )}
            </View>
          </View>
        </View>
      )}

      {started &&
        (initLockView ? (
          <View style={styles.lockButton}>
            <Button
              color="red"
              title="LockView"
              onPress={() => setLockView(false)}
            />
          </View>
        ) : (
          <View style={styles.lockButton}>
            <Button title="LockView" onPress={() => setLockView(true)} />
          </View>
        ))}
    </View>
  );
};

export default TrackingMap;

const styles = StyleSheet.create({
  searchButton: {
    backgroundColor: '#fff',
    height: 60,
    width: Dimensions.get('screen').width - 100,
    borderRadius: 30,
    marginHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 100,
    marginVertical: 0,
  },
  searchButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  searchButtonContainer: {
    position: 'absolute',
    transform: [{translateX: 0}, {translateY: 0}],
    flex: 1,
  },
  dashBoardButtonContainer: {
    position: 'absolute',
    right: '1%',
    bottom: '52%',
    alignSelf: 'center',
    borderRadius: 10,
    height: 50,
    width: 50,
    padding: 5,
  },
  tracktButton: {
    position: 'absolute',
    bottom: '5%',
    width: '80%',
    borderRadius: 5,
    alignSelf: 'center',
  },
  lockButton: {
    position: 'absolute',
    top: '5%',
    left: '5%',
  },
  dashBoardContainer: {
    position: 'absolute',
    top: '10%',
    width: '90%',
    marginHorizontal: '5%',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 10,
    padding: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 10,
    borderWidth: 1,
    borderColor: '#1E1E1E',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  cell: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    alignItems: 'center', // 水平居中
    justifyContent: 'center', // 垂直居中
  },
  dataText: {
    color: '#1E1E1E',
    fontSize: 10,
    fontWeight: 'bold',
    marginBottom: 5,
    textAlign: 'center', // 文本水平居中
  },
  dataValue: {
    color: '#1E1E1E',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center', // 文本水平居中
  },
  titleText: {
    color: '#6FB1FC',
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center', // 文本水平居中
  },
});
