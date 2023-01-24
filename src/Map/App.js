import React, { useEffect, useState, useRef } from "react";
import { Button, ScrollView, StyleSheet, Text, View } from "react-native";
import MapView from "react-native-map-clustering";
import { Marker } from "react-native-maps";
import { Dimensions } from 'react-native';
import { CustomMarker, Midpoint } from "./Midpoint";
import Details from "./Detail";
import CustActivity from "../Main/acvitity";
import RBSheet from "react-native-raw-bottom-sheet";

import { getDistance, getPreciseDistance } from 'geolib';
import { SafeAreaView } from "react-native";
import { TouchableOpacity } from "react-native";

export default function Map() {

   useEffect(() => {
      getpropertydata()
   }, [])

   let DATA;

   const [data, setdata] = useState([])
   const [loder, setloder] = useState(false);

   async function getpropertydata() {
      try {
         setloder(true)
         let response = await fetch('http://192.168.43.77/EMPower/api/Data/getAlldata')
         DATA = await response.json()
         setdata(DATA)
         setloder(false)
      }
      catch (e) { alert(e); setloder(false) }
   }
   //console.log(data);
   function calculateDistance(r1, r2) {
      let dis = getDistance(
         { latitude: r1.latitude, longitude: r1.longitude },
         { latitude: r2.latitude, longitude: r2.longitude },
      );
      console.log(
         `Distance\n\n${dis} Meter\nOR\n${dis / 1000} KM`
      );
      if (dis >= 1000) { getpropertydata() }
   };
   //console.log(dis);
   const [region, setRegion] = useState({
      latitude: 41.776397705078125,
      longitude: -71.41923522949219,
      latitudeDelta: .02,
      longitudeDelta: .02,
   });
   const [detail, setdetail] = useState('');

   const refRBSheet = useRef();
   return (
      <View style={styles.container}>
         {/*Render our MapView*/}
         <MapView
            initialRegion={region}
            style={styles.map}
            showsUserLocation={true}
            showsMyLocationButton={true}
            clusterColor={global.color}
            zoomControlEnabled={true}
            onRegionChangeComplete={(r) => {
               calculateDistance(region, r);
               setRegion(r);
            }}
         //specify our coordinates.
         >
            {/* <Marker
               title={'current point'}
               description={region.latitude.toString() + " " + region.longitude.toString()}
               coordinate={mylocation.cordinates}
            ></Marker> */}
            {data.map(
               (d) => {
                  let da = { latitude: d.lat, longitude: d.lon }
                  return <Marker
                     key={d.id}
                     title={d.owner}

                     description={d.addres}
                     coordinate={da}
                     onPress={() => {
                        setdetail(d);
                        refRBSheet.current.open();
                     }} ><CustomMarker /></Marker>
               }
            )}


         </MapView>
         {
            //<Midpoint />
         }
         <RBSheet
            ref={refRBSheet}

            height={300}
            closeOnDragDown={true}
            closeOnPressMask={true}
            closeOnPressBack={true}
            customStyles={{
               wrapper: {
                  backgroundColor: "transparent",

               },
               draggableIcon: {
                  backgroundColor: "#000",
                  borderRadius: 20
               },
               container: {
                  borderRadius: 30
               }
            }}>
            <ScrollView>
               <Details d={detail} />
            </ScrollView>
         </RBSheet>
         <CustActivity loder={loder} />
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
export function AddMap({ navigation, route }) {
   var lat = 0.0001;
   var long = 0.001;
   const mapRef = React.createRef();
   const [region, setRegion] = useState({
      latitude: 33.643442,
      longitude: 73.07898,
      latitudeDelta: lat,
      longitudeDelta: long,
   });

   const getUpdatedLocation = e => {
      setRegion({
         latitudeDelta: lat,
         longitudeDelt: long,
         latitude: e.nativeEvent.coordinate.latitude,
         longitude: e.nativeEvent.coordinate.longitude,
      });
      mapRef.current.animateToRegion({
         latitude: e.nativeEvent.coordinate.latitude,
         longitude: e.nativeEvent.coordinate.longitude,
         latitudeDelta: lat,
         longitudeDelta: long,
      });
   };
   return (
      <SafeAreaView style={{ flex: 1 }}>
         <MapView
            ref={mapRef}
            //provider={PROVIDER_GOOGLE}
            //mapType="hybrid"
            showsTraffic={true}
            style={{ flex: 1 }}
            initialRegion={region}
            onPress={getUpdatedLocation}>
            <Marker
               coordinate={{ latitude: region.latitude, longitude: region.longitude }}
               draggable={true}
               onDragEnd={getUpdatedLocation}
            />
         </MapView>         
            <TouchableOpacity
               style={{ alignContent: 'center', alignSelf: 'center', justifyContent: 'center' }}
               onPress={() => {
                  navigation.navigate({
                     name: 'AddProperty',
                     params: { latitude: region.latitude,longitude:region.longitude },
                   });
               }
               }
            >
               <View style={{
                  backgroundColor: global.color,
                  borderColor: "#eee",
                  borderRadius: 10,
                  alignItems: 'center',
                  justifyContent: 'center'

               }}>
                  <Text style={{
                     color: 'white',
                     fontSize: 10,
                     alignSelf: 'center',
                     textAlignVertical: 'center',
                     textAlign: 'center',
                     padding: 10,
                  }}>Save Selected Location</Text>
               </View>
            </TouchableOpacity>
      </SafeAreaView>
   );
}