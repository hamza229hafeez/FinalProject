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
import { ScrollView } from 'react-native-gesture-handler';
import { Button } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import CustActivity from './acvitity';
import { useIsFocused } from '@react-navigation/native'
import PropertyDP from './PropertyDP';
LogBox.ignoreLogs(['VirtualizedLists should never be nested']);

const SearchScreen = ({ navigation, route,property,ok }) => {
  const dat = property
  //console.log("search view", dat);
  const [loder, setloder] = useState(false);
  const isfocus = useIsFocused()
  useEffect(() => {
    getpropertydata()
  }, [ok])
  let DATA;
  const [data, setdata] = useState()
  async function getpropertydata() {
    try {
      setloder(true)
      console.log(dat);
      let response = await fetch(global.dataapi + 'Property/searchProperty', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(dat)
      })
      DATA = await response.json()
      //console.log("DTA", DATA);
      setdata(DATA)

      setloder(false)

    } catch (e) { alert(e); setloder(false) }
  }

  const renderItem = ({ item }) => (
    <SafeAreaView style={{
      flex: 1, width: '98%', alignSelf: 'center', elevation: 5,
      backgroundColor: 'white', borderRadius: 10, margin: 3
    }}>
      <TouchableOpacity
        onPress={() => {
          global.naviof.navigate('Detail', {item: item.data })
        }
        }
      >
        <PropertyDP item={item} />
      </TouchableOpacity>
    </SafeAreaView>
  )
  return (
    data != '' ? (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{}}>
          <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={item => item.data.id}
          />
        </View>
        
      </SafeAreaView>
    ) : (
      <View>
      <Text style={{ alignSelf: 'center', justifyContent: 'center' }}>No Data Found ..!
      </Text>
      <CustActivity loder={loder} />
      </View>
    )

  )
}


export default SearchScreen;