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
import CustActivity from '../Main/acvitity';
import { useIsFocused } from '@react-navigation/native'
import PropertyDP from '../Main/PropertyDP'
LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
import { RefreshControl } from 'react-native';

const RequestDetail = (props) => {

  const [loder, setloder] = useState(false);
  const isfocus = useIsFocused()

  useEffect(() => {
    getpropertydata()
  }, [])
  const [refreshing, setRefreshing] = React.useState(false);
  const onRefresh = React.useCallback(async()=>{
    setRefreshing(true);
    getpropertydata()
    setRefreshing(false);
  },[refreshing])

  let DATA;
  const [data, setdata] = useState([])
  async function getpropertydata() {
    try {
      setloder(true)
      let id = global.user.id
      let response = await fetch(global.api + 'Request/getTenentownRequest?id=' + id)
      DATA = await response.json()
      setdata(DATA)
      setloder(false)
    }
    catch (e) { alert(e); setloder(false) }
  }

  const conditionalrenderItem = ({ item }) => (
    <SafeAreaView style={{
      flex: 1, width: '98%', alignSelf: 'center', elevation: 5,
     backgroundColor: 'white', borderRadius: 10,padding:'2%'
   }}>
     <TouchableOpacity
       onPress={() => {
         global.naviof.navigate('Detail', { item })
       }
       }
     >
       <PropertyDP  item={item}/>
     </TouchableOpacity>
   </SafeAreaView>
      )
  return (
    <SafeAreaView style={{ flex: 1 ,padding:'2%'}}>
        <FlatList
          data={data}
          renderItem={conditionalrenderItem}
          keyExtractor={item => item.id}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />      
      <CustActivity loder={loder} />
    </SafeAreaView>
  )
}


export default RequestDetail;