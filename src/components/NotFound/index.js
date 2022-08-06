import React from "react";
import { View, Text, Image } from "react-native";

const NotFound = () => {

    return (
        <View>
                <Image 
                source={require('../../Assets/images/Not_found.png')}
                style={{
                    width:'100%',
                    height:'95%'
                }}/>
                <Text
                style={{
                    fontSize:20,
                    color:'red',
                    // justifyContent:'center',
                    // alignContent:'center',
                    // alignItems: 'center',
                    textAlign:'center',   
                }}>
                    To be continued </Text>
        </View>
    );
}

export default NotFound;