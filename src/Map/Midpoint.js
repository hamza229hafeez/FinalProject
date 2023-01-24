import React, { useEffect, useState } from "react";
import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';


const windowWidth = (Dimensions.get('window').width / 2) - 10;
const windowHeight = (Dimensions.get('window').height / 2) - 10;

import MapView from "react-native-map-clustering";
const SelectLocation = () => {

   const [region, setRegion] = useState({
      latitude: 33.5651,
      longitude: 73.0169,
      latitudeDelta: .05,
      longitudeDelta: .05,
   });
   return (
      <View style={styles.container}>
         {/*Render our MapView*/}
         <Text>Set the Map in center toword the Icone to set the Region of your Property</Text>
         <MapView
            initialRegion={region}
            style={styles.map}
            clusterColor={'#FE6149'}
            showsUserLocation={true}
            zoomControlEnabled={true}
            showsMyLocationButton={true}
            onRegionChangeComplete={(region) => setRegion(region)}
         //specify our coordinates.
         >
            <Midpoint />
         </MapView>
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

function Midpoint() {
   return (
      <View style={{
         position: 'absolute', top: windowHeight, left: windowWidth
      }}
      >
         <View style={styless.point}>
            <CustomMarker />
         </View>
      </View>
   );
}

function CustomMarker() {

   return (
      <TouchableOpacity onPress={() => {
      }}
      >
         <View style={styless.marker}>
            <Icon name="home" color={'white'} size={25} />
         </View>
      </TouchableOpacity>

   );
}
//styles for our custom marker.
const styless = StyleSheet.create({
   point: {
      backgroundColor: "#007bff",
      borderColor: "#eee",
      borderRadius: 20,
      width: 30,
      height: 30,
      alignItems: 'center',
      alignSelf: 'center',
      justifyContent: 'center'

   },
   marker: {
      backgroundColor: global.color,
      borderColor: "#eee",
      borderRadius: 50,
      width: 40,
      height: 40,
      opacity: .8,
      alignItems: 'center',
      alignSelf: 'center',
      justifyContent: 'center'
   }
});
export { CustomMarker, Midpoint, SelectLocation };