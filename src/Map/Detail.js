// React Native Geolocation
// https://aboutreact.com/react-native-geolocation/

// import React in our code
import React, { useState, useEffect } from 'react';
import PropertyDP from '../Main/PropertyDP'
// import all the components we are going to use
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Image,
  PermissionsAndroid,
  Platform,
  Button,
  TouchableOpacity,
} from 'react-native';

export default function Details(props) {

  const d = props.d;
  console.log('-------------------', d, "============");
  return (
    <View style={{ flex: 1, alignSelf: 'center', elevation: 5, backgroundColor: 'white', 
    borderRadius: 8, width: '100%',padding:'2%'}}>
        <TouchableOpacity
            onPress={() => {
                //global.naviof.navigate('RPropertyDetails')
            }}
        >
            <PropertyDP item={{
              propertyname:'abc',
              propertytype:'abc',
              subarea:'abc',
              city:'abc',
              rent:'abc'
            }} />
        </TouchableOpacity>
    </View>

  )
}
const styles = StyleSheet.create({
  textdetail: {
    color: 'black',
    alignSelf: 'center',
    fontSize: 20,
  }
});