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

const NotFound = () => {
  
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
    /*
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.profileHeader}>
          <View style={styles.userIconContainer}>
          <Image source={require('./user-icon.jpg')} style={styles.userIcon} />
          </View>
          <View>
            <Text style={styles.username}>John Doe</Text>
            <Text style={styles.totalHours}>Total hours hiked: 35 hours</Text>
          </View>
        </View>

        <View style={styles.activityItems}>
          <FlatList
            data={activities}
            renderItem={renderActivityItem}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        </View>

        <View style={styles.previousHike}>
          <Text style={styles.previousHikeTitle}>Previous Hikes</Text>
          <FlatList
            data={previousHikes}
            renderItem={renderPreviousHikeItem}
            showsVerticalScrollIndicator={false}
          />
        </View>

        <View style={styles.otherDetails}>
          <Text style={styles.detail}>Age: 30 years</Text>
          <Text style={styles.detail}>Gender: Male</Text>
          <Text style={styles.detail}>Nationality: American</Text>
        </View>
      </View>
    </ScrollView>*/



    <SafeAreaView style={styles.container}>
      <View style={styles.userInfoSection}>
        <View style={{flexDirection: 'row', marginTop: 15}}> 
          <Avatar.Image 
            source={{
              uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Circle-icons-bike.svg/2048px-Circle-icons-bike.svg.png',
            }}
            size={80}
          />
          <View style={{marginLeft: 20}}>
            <Title style={[styles.title, {
              marginTop:5,
              marginBottom: 5,
            }]}>{name}</Title>
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
          <Icon name="phone" color="red" size={20}/>
          <Text style={{color:"red", fontWeight: '900', marginLeft: 30}}>SOS: 2762 2055</Text>
        </View>
      </View>

      <View style={styles.infoBoxWrapper}>
          <View style={[styles.infoBox, {
            borderRightColor: '#dddddd',
            borderRightWidth: 1
          }]}>
            <Title style={{fontWeight:'bold'}}>{tRide} m</Title>
            <Caption>Total Hike</Caption>
          </View>
          <View style={styles.infoBox}>
            <Title style={{fontWeight:'bold'}}>{routeCompleted}</Title>
            <Caption>Route Completed</Caption>
          </View>
      </View>

      <View style={{flex:1}}>
        <FlatList
          ref={flatlist}
          data={hikeDetails}
          renderItem={({item}) => <ProfileScroll data={item}/>}
        />
      </View>   
    </SafeAreaView>
  );
};

export default NotFound;