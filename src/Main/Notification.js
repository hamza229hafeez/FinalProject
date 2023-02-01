import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  View,
} from 'react-native';
import { Avatar } from 'react-native-paper';
import CustActivity from './acvitity';
import PushNotificationIOS from "@react-native-community/push-notification-ios";
import PushNotification from "react-native-push-notification";

const Notify = ({ navigation, route }) => {
  const id = route.params.id;
  console.log("id" + route.params.id);

  // useEffect = (() => {
  //   handleNotification(DATA)
  // }, [DATA])


  const renderItem = ({ item }) => (
    <SafeAreaView style={{
      flex: 1, borderRadius: 5, padding: '1%', borderColor: 'grey', borderWidth: .2, margin: '1%'
    }}>
      <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
        <View style={{ flex: 1, alignItems: 'center' }}>
          <Avatar.Image
            size={60}
            source={
              item.sender.image != null ?
                { uri: global.apiimage + item.sender.image } :
                require("../Pictures/profile.jpeg")
            }
          />
        </View>
        <View style={{ flex: 3 }}>
          <Text style={{ fontSize: 15, color: global.color }}>{item.sender.name}</Text>

          <Text style={{ fontSize: 12, color: global.color, }}>

            {item.resion == 0 ? 'Admin Approved the property' : ''}
            {item.resion == 1 ? 'Request for Property' : ''}
            {item.resion == 2 ? 'Lefting property' : ''}
            {item.resion == 3 ? 'Rent Due Date' : ''}
            {item.resion == 4 ? 'Rent Due Date Expired' : ''}
            {item.resion == 5 ? '' : ''}
          </Text>
          <Text style={{ fontSize: 12, fontWeight: 'bold' }}>{item.property.propertyname} {item.property.subarea} {item.property.city} </Text>
          <Text style={{ fontSize: 12, color: global.color, }}>{item.date}</Text>
        </View>
      </View>
    </SafeAreaView>
  );
  const [DATA, setData] = useState();
  const [loader, setloader] = useState(false);
  useEffect(() => {
    getNotifi()
  }, [])
  async function getNotifi() {
    try {
      setloader(true)
      let response = await fetch(global.dataapi + 'Notification/getNotifications?id=' + id)
      let req = await response.json()
      console.log(req);      
      setData(req)
      setloader(false)
    }
    catch (e) { alert(e); setloader(false) }
  }


  return (
    DATA != '' ? (
      <View style={{ flex: 1 }}>
        <FlatList
          data={DATA}
          showsVerticalScrollIndicator={false}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          contentContainerStyle={{ padding: '1%' }}
        />
        <CustActivity loder={loader} />
      </View>
    )
      : (<Text style={{ alignSelf: 'center' }}> No Review Found</Text>)
  )
}
export default Notify