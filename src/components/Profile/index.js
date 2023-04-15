import React, {useEffect, useRef, useState} from 'react';
import { AsyncStorage, SafeAreaView, View, Image, FlatList, ScrollView} from "react-native";
//import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from "./styles";
import ProfileScroll from '../ProfileScroll';
import { useIsFocused } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  Avatar,
  Title,
  Caption,
  Text,
  TouchableRipple,
} from 'react-native-paper';

const Profile = () => {
  
  const flatlist = useRef();
  const isFocused = useIsFocused();
  const [name, setName] = useState('');
  const [nickname,setNickname] = useState('');
  const [city, setCity] = useState(''); 
  const [country, setCountry] = useState(''); 
  const [tRide,setTRide] = useState('');
  const [routeCompleted, setRouteCompleted] = useState(''); 
  const [hikeDetails,setHikeDetails] = useState([])
  
  //Reading the User Info from the AsyncStorage
  const getName = async () => {
    try{
      const value = await AsyncStorage.getItem('@name');
      if(value !== null)
        setName(value);
      else
        setName('user');
    }catch(e){}
  } 
  const getNickname = async () => {
    try{
      const value = await AsyncStorage.getItem('@nickname');
      if(value !== null)
        setNickname(value);
      else
        setNickname('nickname');
    } catch (e) {}
  }
  const getCountry = async () => {
    try{
      const value = await AsyncStorage.getItem('@country');
      if(value !== null)
        setCountry(value);
      else
        setCountry('China');
    } catch (e) {}
  }
  const getCity = async () => {
    try{
      const value = await AsyncStorage.getItem('@city');
      if(value !== null)
        setCity(value);
      else
        setCity('Hong Kong');
    } catch (e) {}
  }
  const getTRide = async () => {
    try{
      const value = await AsyncStorage.getItem('@tRide');
      if(value !== null)
        setTRide(value);
      else
        setTRide('0');
    } catch (e) {}
  }
  const getRouteCompleted = async () => {
    try{
      const value = await AsyncStorage.getItem('@routeCompleted');
      if(value !== null)
        setRouteCompleted(value);
      else
        setRouteCompleted('0');
    } catch (e) {}
  }

  const getHikeDetails = async () =>{
    try{
      const value = await AsyncStorage.getItem('@detailsRide');
      if(value !== null){
        
        let detail = JSON.parse(value)
        setHikeDetails(detail)
      
      }else{
        setHikeDetails([])
      }
    }catch(e){
      console.log(e)
    }
  }

  const clear = async () =>{
    const keys = ['@routeCompleted', '@detailsRide','@tRide']
      try {
          await AsyncStorage.multiRemove(keys);
          return true;
      }
      catch(exception) {
          return false;
      }
  }

  const refresh = ()=>{
    getName();
    getNickname();
    getCity();
    getCountry();
    getTRide();
    getRouteCompleted();
    getHikeDetails()
  };

  useEffect(() => {
    refresh();
    //console.log('line153: '+typeof hikeDetails)
  },[isFocused]);
  return (

    <SafeAreaView style={styles.container}>
  <View style={styles.userInfoSection}>
    <View style={{flexDirection: 'row', marginTop: 15}}> 
      <Avatar.Image 
        source={{uri: 'https://media.istockphoto.com/id/1203591390/vector/hiking-icon-vector-isolated-on-white.jpg?s=612x612&w=0&k=20&c=3SaYU_Yi1P2eLFO9i_SyKuu0OxymIi6GXfVjegFPv_E='}}
        size={80}
      />
      <View style={{marginLeft: 20}}>
        <Title style={[styles.title, {marginTop:5, marginBottom: 5}]}>{name}</Title>
        <Caption style={styles.nickname}>{nickname}</Caption>
      </View>
    </View>
  </View>

  <View style={styles.userInfoSection}>
    <View style={styles.row}>
      <Icon name="map-marker-radius" color="black" size={20}/>
      <Text style={{color:"black", fontWeight: '900', marginLeft: 30}}>{city}, {country}</Text>
    </View>
    <View style={styles.row}>
      <Icon name="phone" color="black" size={20}/>
      <Text style={{color:"lightblue", fontWeight: '900', marginLeft: 30}}>1234 5678</Text>
    </View>
  </View>

  <View style={styles.infoBoxWrapper}>
    <View style={[styles.infoBox, {borderRightColor: '#dddddd', borderRightWidth: 1}]}>
    <Title style={{fontWeight:'bold'}}>{tRide} km</Title>
      <Caption>Total Hike</Caption>
    </View>
    <View style={styles.infoBox}>
      <Title style={{fontWeight:'bold'}}>{routeCompleted}</Title>
      <Caption>Route Completed</Caption>
    </View>
  </View>


  <View style={{flex: 1}}>
    <FlatList
      ref={flatlist}
      data={hikeDetails}
      renderItem={({item}) => <ProfileScroll data={item}/>}
    />
  </View>

</SafeAreaView>
  );
};

export default Profile;