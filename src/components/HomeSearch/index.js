import React from 'react';
import {View, Text, Pressable} from 'react-native';

import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';

import {useNavigation} from '@react-navigation/native';

import styles from './styles.js';

const HomeSearch = () => {
  const navigation = useNavigation();
  const goToSearch = () => {
    navigation.navigate('DestinationSearch');
  };

  return (
    // <View>

    //         <Pressable onPress={goToSearch} style={styles.inputBox}>
    //             <Text style={styles.inputText}>Where to go? </Text>
    //             <View style={styles.timeContainer}>
    //                 <AntDesign name={'search1'} size={16} />
    //                 {/* <Text>Now</Text> */}
    //                 {/* <MaterialIcons name={'keyboard-arrow-down'} size={16} /> */}
    //             </View>
    //         </Pressable>

    // </View >

    <View style={styles.searchContainer}>
      <Pressable onPress={goToSearch} style={styles.inputBox}>
        <AntDesign name={'search1'} size={20} style={styles.searchIcon} />
        <Text style={styles.inputText}>Where to go?</Text>
      </Pressable>
    </View>
  );
};

export default HomeSearch;
