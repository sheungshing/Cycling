import React from "react";
import { View, Text, Dimensions } from "react-native";
import HomeMap from "../../components/HomeMap";
import HomeSearch from "../../components/HomeSearch";
import Message from "../../components/Message";
import Routemap from "../../components/RouteMap";


const HomeScreen = () => {
    return (
        // <View>
            <View style={{witdth:'100%',height:'100%'}}>
            <View>
                <HomeMap />
            </View >

            {/* <Message /> */}
            <View style={{position: "absolute", top:5, alignSelf:'center'}}>
            <HomeSearch  />
            </View>
            
        </View>
    );
};

export default HomeScreen;