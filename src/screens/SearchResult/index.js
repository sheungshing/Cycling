import React from "react";
import { Dimensions, View } from "react-native";

import RouteMap from "../../components/RouteMap";
import { useRoute,useNavigation } from "@react-navigation/native";


const SearchResult = () => {
    const route = useRoute();
    const navigation = useNavigation();
    const {originalPlace, destinationPlace} = route.params;

    //console.warn(route.params);
    return (
        <View style={{
            display: 'flex',
            justifyContent: 'space-between'
            
        }}>
            <RouteMap
            origin={originalPlace}
            destination={destinationPlace}/>
            {/* <View style={{
                height: Dimensions.get('window').height-100
            }}> */}
            {/* <View>
                <RouteMap 
                origin={originPlace} 
                destination={destinationPlace}
                />

            </View> */}

        </View>
    );
}

export default SearchResult;