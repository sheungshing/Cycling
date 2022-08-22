import React, {useEffect, useState, useRef} from 'react';
import {
  Alert,
  FlatList,
  View,
  Text,
  PermissionsAndroid,
  Platform,
  Button,
  StyleSheet,
  Pressable,
  Modal,
  TouchableHighlight,
} from 'react-native';
import RNLocation from 'react-native-location';
import ReactNativeForegroundService from '@supersami/rn-foreground-service';
import BackgroundTimer from 'react-native-background-timer';
import { Checkbox } from 'react-native-paper';

import Geolocation from '@react-native-community/geolocation';
const geolib = require('geolib');

import MapView, {Marker, Polyline} from 'react-native-maps';


const data = [
  { id: 1, txt: '1.佩戴安全頭盔', isChecked: false },
  { id: 2, txt: '2.穿着有反光物料及合身的衣服', isChecked: false },
  { id: 3, txt: '3.穿上個人防護裝備，例如護肘、護膝及手套', isChecked: false },
  { id: 4, txt: '4.單車須配備警告車鈴及車尾紅色反光體', isChecked: false },
  { id: 5, txt: '5.單車須配備警告車鈴及車尾紅色反光體', isChecked: false },
  
];



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

  const [modalVisible, setModalVisible] = useState(false);

  const [secondsLeft, setSecondsLeft] = useState(0);
  const [timerOn, setTimerOn] = useState(false);
  //chechbox
  const [products, setProducts] = useState(data);

  const foregroundServiceStart = () => {
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

  const handleChange = (id) => {
    let temp = products.map((product) => {
      if (id === product.id) {
        return { ...product, isChecked: !product.isChecked };
      }
      return product;
    });
    setProducts(temp);
  };

  //let selected = products.filter((product) => product.isChecked);

  const renderFlatList = (renderData) => {
    return (
      <FlatList
        data={renderData}
        renderItem={({ item }) => (
         
            <View style={styles.card}>
              <View
                style={{
                  flexDirection: 'row',
                  flex: 1,
                  //justifyContent: 'space-between',
                }}>
                <Checkbox
                status={item.isChecked ? 'checked' :'unchecked'}  
                  
                  onPress={() => {
                    handleChange(item.id);
                  }}
                />
                <Text style={styles.text} >{item.txt}</Text>
              </View>
            </View>
         
        )}
      />
    );
  };

  const checkCheckBox = ()  =>{
    let check = true;
    console.log('111')
    products.forEach((product) => {
      if(product.isChecked === false){
        check = false;
        return ;
      }
    })
    return check;
  } 


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

      <View style={styles.modalContainer}>
      <Modal  animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          // Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
          <View style={styles.modalView}>
            <View style={{width:'100%',height:'85%'}}>
            <View style={{ flex: 1 }}>{renderFlatList(products)}</View>
            </View>
            
            <TouchableHighlight
              style={{...styles.confirmButton, backgroundColor: '#2196F3'}}
              onPress={() => {
                if(checkCheckBox()){
                setModalVisible(!modalVisible);
                foregroundServiceStart();
                setProducts(data);
                setButton(true);
                }else{
                  Alert.alert('Please complete all the checkbox!!!');
                }
                
                
              }}>
              <Text style={styles.textStyle}>Confirm</Text>
            </TouchableHighlight>
          </View>
      </Modal>
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
              
              setModalVisible(true);
              // setButton(true);
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
    marginVertical: '17%',
    // borderRadius: 10,
    // padding: 5,
    // elevation: 2
  },

  modalContainer:{
    
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    position:'absolute',
   

  },
  modalView: {
    width:"80%",
    height:"70%",
    alignSelf: 'center',
    marginVertical:'42%',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: '5%',
  
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  confirmButton: {
    backgroundColor: '#F194FF',
    borderRadius: 20,
    padding: 15,
    elevation: 2,
    alignSelf:'center',
    marginTop:"10%",
   // marginHorizontal:"20%",
    marginLeft:'55%',
  
  },
  modalRow:{
  flexDirection:'row'  
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    fontSize:25,
    marginTop:"20%",
    textAlign:'left',
  },

  flatListContainer: {
    flex: 1,
    justifyContent: 'center',
   // paddingTop: Constants.statusBarHeight,
    backgroundColor: '#000',
    padding: 8,
  },
  card: {
    padding: 8,
    margin: 5,
    flexDirection: 'row',
    //justifyContent: 'space-between',
  },
  text: {
    fontSize:20,
    textAlign:'left',
    fontWeight: 'bold',
    flex: 1,
    // alignSelf:'flex-start',

  },


});

export default TrackingMap;
