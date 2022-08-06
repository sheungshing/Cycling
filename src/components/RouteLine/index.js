import React from "react";
import { View ,Text} from "react-native";
import { Geojson ,Marker} from "react-native-maps";

const RouteLine = (props) =>{
        const {geojson, strokeColor, onPress, isSelected,coordinate } = props;
        return(
            //'transparent' 透明顏色
            <View>
            <Geojson
                geojson={geojson}
                strokeColor={isSelected ?  strokeColor : 'transparent'}
                strokeWidth={1.8}
                onPress={onPress}
                tappable={true}
               
            >
            </Geojson>
            {isSelected && <Marker
            coordinate={coordinate}/>}
          </View>
            
           
        );
}

export default RouteLine;