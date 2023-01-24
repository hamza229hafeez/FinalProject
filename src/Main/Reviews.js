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

const Reviews = ({ navigation, id }) => {
  console.log(id);

  const renderItem = ({ item }) => (
    <SafeAreaView style={{
      flex: 1, borderRadius: 5,padding:'1%',borderColor:'grey',borderWidth:.2,margin:'1%'
    }}>
      <View style={{ flexDirection: 'row',justifyContent:'center',alignItems:'center'}}>
        <View style={{ flex: 1,alignItems:'center'}}>
          <Avatar.Image
            size={60}
            source={
              item.user.image != null ?
                { uri: global.apiimage + item.user.image } :
                require("../Pictures/profile.jpeg")
            }
          />
        </View>
        <View style={{ flex: 3 }}>
          <Text style={{ fontSize: 15, color: global.color }}>{item.user.name}</Text>
          <Text style={{ fontSize: 12, color: 'black' }}>{item.review.feedback}</Text>
          <Text style={{ fontSize: 12, fontWeight: 'bold' }}>{item.property.propertyname} {item.property.subarea} {item.property.city} </Text>
          <Text style={{ fontSize: 12, color: global.color, }}>{item.review.date}</Text>
        </View>
      </View>


    </SafeAreaView>
  );
  const [DATA, setData] = useState();
  const [loader, setloader] = useState(false);
  useEffect(() => {
    getReviewsofperson()
  }, [])
  async function getReviewsofperson() {
    try {
      setloader(true)
      let response = await fetch(global.dataapi + 'Review/getreviewsofperson?id=' + id)
      let req = await response.json()
      console.log(req);
      setData(req)
      setloader(false)
    }
    catch (e) { alert(e); setloader(false) }
  }
 
  return (
     DATA != '' ? (
      <View style={{flex:1}}>
        <FlatList
          data={DATA}
          showsVerticalScrollIndicator={false}
          renderItem={renderItem}
          keyExtractor={item => item.review.id}
          contentContainerStyle={{ padding: '1%' }}
        />
        <CustActivity loder={loader} />
      </View>
     )
       : (<Text style={{ alignSelf: 'center' }}> No Review Found</Text>)
  )
}
const PReviews = ({ navigation, id,oid }) => {
  const renderItem = ({ item }) => (
    <SafeAreaView style={{
      flex: 1, borderRadius: 5,padding:'1%',borderColor:'grey',borderWidth:.2,margin:'1%'
    }}>
      <View style={{ flexDirection: 'row',justifyContent:'center',alignItems:'center'}}>
        <View style={{ flex: 1,alignItems:'center'}}>
          <Avatar.Image
            size={60}
            source={
              item.user.image != null ?
                { uri: global.apiimage + item.user.image } :
                require("../Pictures/profile.jpeg")
            }
          />
        </View>
        <View style={{ flex: 3 }}>
          <Text style={{ fontSize: 15, color: global.color }}>{item.user.name}</Text>
          <Text style={{ fontSize: 12, color: 'black' }}>{item.review.review}</Text>
          <Text style={{ fontSize: 12, color: global.color, }}>{item.review.dateofleft}</Text>
        </View>
      </View>


    </SafeAreaView>
  );
  const [DATA, setData] = useState();
  const [loader, setloader] = useState(false);
  useEffect(() => {
    getReviewsofperson()
  }, [])
  async function getReviewsofperson() {
    try {
      setloader(true)
      let response = await fetch(global.dataapi + 'Review/getReviewsofProperty?id=' + id)
      let req = await response.json()
      console.log(req);
      setData(req)
      setloader(false)
    }
    catch (e) { alert(e); setloader(false) }
  }
 
  return (
     DATA != '' ? (
      <View style={{flex:1}}>
        <FlatList
          data={DATA}
          showsVerticalScrollIndicator={false}
          renderItem={renderItem}
          keyExtractor={item => item.review.id}
          contentContainerStyle={{ padding: '1%' }}
        />
        <CustActivity loder={loader} />
      </View>
     )
       : (<Text style={{ alignSelf: 'center' }}> No Review Found</Text>)
  )
}
export default Reviews
export {PReviews};