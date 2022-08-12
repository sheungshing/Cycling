import React from "react";
import { Dimensions, View } from "react-native";
import RouteMap from "../../components/RouteMap";
import { useRoute,useNavigation } from "@react-navigation/native";


const SearchResult = () => {
    const route =useRoute();
    const navigation = useNavigation();
    const {originPlace, destinationPlace} = route.params;
    console.log(originPlace);

    //console.warn(route.params);
    return (
        <View style={{
            display: 'flex',
            justifyContent: 'space-between'
        }}>
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