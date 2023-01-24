import React, { useEffect, useState, useRef } from "react";
import { Button, ScrollView, StyleSheet, Text, View } from "react-native";
import MapView from "react-native-map-clustering";
import { Marker } from "react-native-maps";
import { Dimensions } from 'react-native';
import { CustomMarker, Midpoint } from "./Midpoint";


import { getDistance, getPreciseDistance } from 'geolib';

const windowWidth = (Dimensions.get('window').width / 2) - 10;
const windowHeight = (Dimensions.get('window').height / 2) - 10;


export default function AddMapp() {
    const [region, setRegion] = useState();

    const refRBSheet = useRef();
    return (
        <View style={styles.container}>
            {/*Render our MapView*/}
            <MapView
                initialRegion={region}
                style={styles.map}
                showsUserLocation={true}
                zoomControlEnabled={true}
                showsMyLocationButton={true}
                onRegionChangeComplete={(r) => {
                    setRegion(r);
                }}>
            </MapView>
            <Midpoint />
            <Button title="Confirm Location" color={global.color}/>
        </View>
    );
}
//create our styling code:
const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        flex: 1, //the container will fill the whole screen.
        justifyContent: "flex-end",
        alignItems: "center",
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
    text: {
        color: 'white',
    },
    textdetail: {
        color: 'black',
        alignSelf: 'center',
        fontSize: 20,
    }
});