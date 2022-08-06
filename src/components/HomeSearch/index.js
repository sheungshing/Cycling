import React from "react";
import { View, Text, Pressable } from "react-native";

import AntDesign from "react-native-vector-icons/AntDesign";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Entypo from "react-native-vector-icons/Entypo";

import { useNavigation } from "@react-navigation/native";


import styles from './styles.js';

const HomeSearch = () => {
    const navigation = useNavigation();
    const goToSearch = () => {
        navigation.navigate('DestinationSearch');
    }


    return (
        // <View>
        //     {/*  Input Box */}

        //     <Text style={styles.inputText}>Where To?</Text>

        //     <View style={styles.timeContainer}>
        //         <AntDesign name={'clockcircle'} size={16} color={'#535353'} />
        //         <Text>Now</Text>
        //         <MaterialIcons name={'keyboard-arrow-down'} size={16} />
        //     </View>


        // </View>

        <View>
          
                <Pressable onPress={goToSearch} style={styles.inputBox}>
                    <Text style={styles.inputText}>Where to go? </Text>
                    <View style={styles.timeContainer}>
                        <AntDesign name={'search1'} size={16} />
                        {/* <Text>Now</Text> */}
                        {/* <MaterialIcons name={'keyboard-arrow-down'} size={16} /> */}
                    </View>
                </Pressable>
           
        </View >
    );
};

export default HomeSearch;