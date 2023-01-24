import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  View,
  LogBox,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import CustActivity from '../Main/acvitity'
import PropertyDP from '../Main/PropertyDP'
import { useIsFocused } from '@react-navigation/native'
LogBox.ignoreLogs(['VirtualizedLists should never be nested']);

const MainPage = ({ navigation, route }) => {
  const [loder, setloder] = useState(false);
  const isfocus = useIsFocused()
  useEffect(() => {
    getpropertydata()
  }, [isfocus])
  let DATA;
  const [data, setdata] = useState([])
  async function getpropertydata() {
    try{
    setloder(true)
    let response = await fetch(global.dataapi + 'property/getPropertiesforapprove')
    DATA = await response.json()
    setdata(DATA)
    setloder(false)
  }
  catch(e){alert(e);setloder(false)}
  }

  const conditionalrenderItem = ({ item }) =>(
        <SafeAreaView style={{
          marginTop: 5, flex: 1, width: '98%', alignSelf: 'center', elevation: 5,
          backgroundColor: 'white', borderRadius: 10
        }}>
          <TouchableOpacity
            onPress={() => navigation.navigate('Approve', { item })}
          >
           <PropertyDP item={item} />
          </TouchableOpacity>
        </SafeAreaView>
      )


  return (
    <SafeAreaView style={{ flex: 1 }}>
      
        <FlatList
          data={data}
          renderItem={conditionalrenderItem}
          keyExtractor={item => item.data.id}
        />
      <CustActivity loder={loder} />
    </SafeAreaView>
  )
}


export default MainPage;