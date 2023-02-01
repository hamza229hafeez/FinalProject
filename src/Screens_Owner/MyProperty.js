import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  View,
} from 'react-native';
import { Button, FAB } from 'react-native-paper';
import CustActivity from '../Main/acvitity';
import { useIsFocused } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/FontAwesome';
import Stars from 'react-native-stars';
import { RefreshControl } from 'react-native';



const MyProperty = ({ navigation }) => {

  
  const [loder, setloder] = useState(false);
  const [all, setall] = useState(true);
  const [condition, setcondition] = useState()
  const [selected, setselected] = useState(1)
  const isfocus = useIsFocused()

  const [refreshing, setRefreshing] = React.useState(false);
  const onRefresh = React.useCallback(async()=>{
    setRefreshing(true);
    getpropertydata()
    setRefreshing(false);
  },[refreshing])

  useEffect(() => {
    getpropertydata()
  }, [])
  let data
  async function getpropertydata() {
    try {
      setloder(true)
      let id = global.user.id
      let response = await fetch(global.dataapi + 'property/getPropertiesofOwner?id=' + id)
      data = await response.json()
      setData(data)
      setloder(false)
    }
    catch (e) { alert(e); setloder(false) }
  }
  const conditionalrenderItem = (props) => {
    let item=props.item.data
    let pic=props.item.image[0]
    if (all + (item.status == condition)) {
      return (
        <SafeAreaView style={{
          width: '48%', margin: '1%', borderRadius: 8,
          flex: 1, elevation: 2, backgroundColor: 'white', elevation: 5, padding: '2%'
        }}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('MyPropertyDetail', { item })
            }}
          >
            <View>
              <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                <Image
                  style={{ height: 150, width: '100%', borderRadius: 8, }}
                  source={pic!= null ?
                    { uri: global.apiimage + pic.uri } :
                    require("../Pictures/main.jpeg")}
                />
              </View>
              <View style={{ alignItems: 'flex-start', flex: 1, flexDirection: 'row', padding: '1%' }}>
                <View style={{ flex: 4, }}>
                  <Text style={{ fontSize: 12, fontWeight: 'bold', color: 'black', alignSelf: 'flex-end' }}>
                    <Icon name={item.subtype == 'Residential' ? 'home' : 'building-o'} size={12} /> {item.subtype}</Text>
                  <Text style={{ fontSize: 15, color: global.color }}>{item.propertytype}</Text>
                  <Text style={{ fontSize: 12, color: 'black' }}>{item.propertyname}</Text>
                  <Text style={{ fontSize: 12, marginBottom: 5, color: 'black' }}>
                  <Icon name="map-marker" color={global.color} /> {item.subarea}</Text>
                  {/* <Text style={{ fontSize: 12, color: 'black' }}>
                    <Icon name="map-marker" color={global.color} /> {item.subarea}</Text> */}

                </View>
                <View style={{ flex: 2, alignSelf: 'center', alignItems: 'center' }}>
                  <Text style={{ fontSize: 12 }}>{
                    item.status == null ? (<Text style={{ color: 'black' }}>Under Review</Text>) :
                      (item.status == '1' ? (<Text style={{ color: 'green' }}>Booked</Text>) :
                      (item.status == '2' ? (<Text style={{ color: 'green' }}>About Free</Text>) :
                        (<Text style={{ color: global.color }}>Free</Text>)))
                  }</Text>
                </View>
              </View>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 12, color: 'black' }}>{item.city}</Text>
            </View>
            <View
              style={{ flex: 1,padding:'2%' }}
            >
              <Stars
                default={item.rate==null?3:item.rate}
                count={5}
                half={true}
                disabled={true}
                starSize={50}
                fullStar={<Icon name={'star'} style={{
                  color: 'gold',
                  backgroundColor: 'transparent',
                  textShadowColor: 'black',
                  textShadowOffset: { width: 1, height: 1 },
                  textShadowRadius: 2,
                }} />}
                emptyStar={<Icon name={'star-o'} style={[{
                  color: 'gold',
                  backgroundColor: 'transparent',
                  textShadowColor: 'black',
                  textShadowOffset: { width: 1, height: 1 },
                  textShadowRadius: 2,
                }, {
                  color: 'white',
                }]} />}
                halfStar={<Icon name={'star-half'} style={{
                  color: 'gold',
                  backgroundColor: 'transparent',
                  textShadowColor: 'black',
                  textShadowOffset: { width: 1, height: 1 },
                  textShadowRadius: 2,
                }} />}
              />
            </View>
          </TouchableOpacity>
        </SafeAreaView>
      )
    }
  }

  const [DATA, setData] = useState([]);

  return (
    <SafeAreaView style={{ flex: 1 ,paddingTop:'1%',paddingRight:'1%',paddingLeft:'1%',}}>
      <View style={{
        flexDirection: 'row', backgroundColor: 'white', width: '96%',
        alignSelf: 'center', elevation: 5, borderRadius: 7, marginTop: 5
      }}>
        <TouchableOpacity
          style={[{
            height: 40,
            alignSelf: 'center',
            flex: 2,
            alignItems: 'center',
            justifyContent: 'center'
          }, selected == 1 ? {
            borderBottomWidth: 2,
            borderColor: global.color,
            borderRadius: 20,
          } : {}]}
          onPress={() => { setall(true); setselected(1) }}>
          <Text style={selected == 1 ? { fontWeight: 'bold', fontSize: 15, color: global.color } : { fontSize: 12 }}>
            <Icon name="th-large" size={selected == 1 ? 15 : 11} /> All</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[{
            height: 40,
            alignSelf: 'center',
            flex: 2,
            alignItems: 'center',
            justifyContent: 'center'
          }, selected == 2 ? {
            borderBottomWidth: 2,
            borderColor: global.color,
            borderRadius: 20,
          } : {}]}
          onPress={() => { setall(false); setcondition(1); setselected(2) }}>
          <Text style={selected == 2 ? { fontWeight: 'bold', fontSize: 15, color: global.color } : { fontSize: 12 }}>
            Book</Text>
        </TouchableOpacity>
        {/* <TouchableOpacity
          style={[{
            height: 40,
            alignSelf: 'center',
            flex: 3,
            alignItems: 'center',
            justifyContent: 'center'
          }, selected == 3 ? {
            borderBottomWidth: 2,
            borderColor: global.color,
            borderRadius: 20,
          } : {}]}
          onPress={() => { setall(false); setcondition(0); setselected(3) }}>
          <Text style={selected == 3 ? { fontWeight: 'bold', fontSize: 15, color: global.color } : { fontSize: 12 }}>
            NonBook</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[{
            height: 40,
            alignSelf: 'center',
            flex: 3,
            alignItems: 'center',
            justifyContent: 'center'
          }, selected == 4 ? {
            borderBottomWidth: 2,
            borderColor: global.color,
            borderRadius: 20,
          } : {}]}
          onPress={() => { setall(false); setcondition(null); setselected(4) }}>
          <Text style={selected == 4 ? { fontWeight: 'bold', fontSize: 15, color: global.color } : { fontSize: 12 }}>
            UnderReview</Text>
        </TouchableOpacity> */}
      </View>
      <View style={{ flex: 1 }}>
        <FlatList
          data={DATA}
          renderItem={conditionalrenderItem}
          showsVerticalScrollIndicator={false}
          keyExtractor={item => item.id}
          numColumns={2}
          contentContainerStyle={{ padding: '1%' }}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      </View>

      <CustActivity loder={loder} />
    </SafeAreaView>
  )
}
export default MyProperty;
const styles = StyleSheet.create({
  focusbutton: {
    alignSelf: 'center',
    flex: 1, borderBottomWidth: 2,
    borderColor: global.color,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
  },
  button: {
    alignSelf: 'center',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});