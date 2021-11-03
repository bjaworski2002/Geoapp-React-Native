import React, {useEffect} from "react";
import {View} from "react-native";
import MapView from 'react-native-maps';

export default function ItemMap(props){
    useEffect(() => {
        //console.log(props.route.params.items)
    })
    return(<View style={{flex: 1}}>
        <MapView
            style={{ flex: 1 }}
            initialRegion={{
                latitude: 50.111,
                longitude: 20.111,
                latitudeDelta: 0.001,
                longitudeDelta: 0.001,
            }}
        >
            {props.route.params.items.map((e, index) => <MapView.Marker
                coordinate={{
                    latitude: e.value.latitude,
                    longitude: e.value.longitude,
                }}
                title={`${index}`}
                key={index}
                description={`timestamp: ${e.value.timestamp}`}
            />)}
        </MapView>
    </View>)
}