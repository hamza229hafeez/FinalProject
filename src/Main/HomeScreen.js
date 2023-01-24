import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  View,
  StyleSheet,
  LogBox,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import CustActivity from './acvitity';
LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
import { Dimensions } from 'react-native';
import Stars from 'react-native-stars';
import { RefreshControl } from 'react-native';
import CustDD from '../API_Calling/CustDropDown';
import { CityList } from '../Screens_Owner/Data';

const windowWidth = (Dimensions.get('window').width / 2) + (Dimensions.get('window').width / 5);
const windowHeight = (Dimensions.get('window').height / 2) + (Dimensions.get('window').height / 5);

const styles = StyleSheet.create({
  myStarStyle: {
    color: 'gold',
    backgroundColor: 'transparent',
    textShadowColor: 'black',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  myEmptyStarStyle: {
    color: 'white',
  },
  main: { flex: 1, paddingTop: '2%', paddingRight: '2%', paddingLeft: '2%' },
  buttonview: {
    flexDirection: 'row', backgroundColor: 'white',
    elevation: 3, borderRadius: 7, margin: '1%'
  },
  button: {
    height: 40,
    alignSelf: 'center',
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center'
  },
  truebutton: {
    borderBottomWidth: 2,
    borderColor: global.color,
    borderRadius: 20,
  },
  butnmap: {
    backgroundColor: global.color,
    borderColor: "#eee",
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    padding: '5%'
  },
  card: {
    alignSelf: 'center', elevation: 3,
    backgroundColor: 'white', borderRadius: 10, marginLeft: '1%', width: '32%', marginVertical: 4,
    padding: '1%'
  }
});

const HomeScreen = ({ navigation }) => {

  const [loder, setloder] = useState(false);
  const [condition, setcondition] = useState()
  const [searchcity, setsearchcity] = useState('')
  const [selected, setselected] = useState(1)
  const [all, setall] = useState(true)
  const [DDcity, setDDcity] = useState(false);
  const [city, setcity] = useState();
  const [cityList, setcitylist] = useState(CityList);


  const [refreshing, setRefreshing] = React.useState(false);

  useEffect(() => {
    setcity(global.user.address)
    getpropertydata()

  }, [])
  useEffect(() => {
    getpropertydata()
  }, [city])
  let DATA;
  //fetch data from Api
  const [data, setdata] = useState([])

  const onRefresh = React.useCallback(async () => {
    
    setcity(global.user.address)
    getpropertydata()
    
  }, [refreshing])

  async function getpropertydata() {
    try {
      setRefreshing(true);
      let id = global.user.id
      let response = await fetch(global.dataapi + 'property/getProperties?id=' + id+"&City="+city)
      DATA = await response.json()     
      setdata(DATA)
      setRefreshing(false);
    }
    catch (e) { alert(e); setRefreshing(false);}
  }
  //code for render item
  const conditionalrenderItem = (props) => {
    let item=props.item.data
    let pic=props.item.image[0]
    let nrate=props.nrate
    if (all + (item.subtype == condition)) {
      if (item.subarea.toLowerCase().includes(searchcity.toLowerCase()))
        return (
          <SafeAreaView style={styles.card}>
            <TouchableOpacity
              onPress={() => {
                global.naviof.navigate('Detail', { item })
              }}
              style={{}}
            >
              {/* <View style={{height:150}}>
              <MultipleImage id={item.id}  />
              </View> */}
              <Image
                style={{ height: 120, width: '100%', borderRadius: 10, alignSelf: 'center' }}
                source={pic != null ?
                  { uri: global.apiimage + pic.uri } :
                  require("../Pictures/main.jpeg")}
              />
              <View
                style={{ flex: 1, margin: '5%' }}
              >
                <Text style={{ fontSize: 15, color: global.color }}>{item.propertytype}</Text>
                <Text style={{ fontSize: 16, fontWeight: 'bold', color: 'black' }}>{item.rent}
                  <Text style={{ fontSize: 10, }}> (PKR)</Text>
                </Text>
                
                <Text style={{ fontSize: 12, marginBottom: 5, color: 'black'}}>
                  <Icon name="map-marker" color={global.color} /> {item.subarea}</Text>
              </View>
              <View
                style={{ marginLeft: '5%' }}
              >
                {/* <Text style={{ fontSize: 15, marginBottom: 5, color: 'black', }}>
                  <Icon name="map-marker" color={global.color} size={15} />  {item.city}</Text> */}
                  
                <View
                  style={{ paddingBottom: 10,flexDirection:'row',alignItems:'center'}}
                >
                <Text
                >
                  ({nrate!=null?nrate:'0'})
                </Text>
                  <Stars
                    default={item.rate==null?3:item.rate}
                    count={5}
                    disabled={true}
                    starSize={50}
                    fullStar={<Icon name={'star'} style={[styles.myStarStyle]} />}
                    emptyStar={<Icon name={'star-o'} style={[styles.myStarStyle, styles.myEmptyStarStyle]} />}
                  />
                </View>
              </View>

            </TouchableOpacity>
          </SafeAreaView>
        )
    }
  };
  return (
    <SafeAreaView style={styles.main}>
      <View
        style={{
          flexDirection: 'row',
          backgroundColor: 'white',
          padding: '3%',
          borderRadius: 10,
          borderColor: 'grey',
          elevation: 5
        }}
      >
        <TouchableOpacity
          style={{ width: '70%', borderRightWidth: 1, borderColor: 'grey' }}
          onPress={() => navigation.navigate('Search')}
        >
          <Text
            style={{ paddingLeft: '5%' }}
          >
            Search..!
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setDDcity(true)
          }}
        >
          <Text
            style={{ paddingLeft: '5%', color: global.color }}
          >
            {city}
          </Text>
        </TouchableOpacity>
      </View>
      {
        //top button
      }
      <View style={styles.buttonview}>
        <TouchableOpacity
          style={[styles.button, selected == 1 ? styles.truebutton : {}]}
          onPress={() => { setselected(1), setall(true) }}>
          <Text style={selected == 1 ? { fontWeight: 'bold', fontSize: 15, color: global.color } : { fontSize: 12 }}>
            <Icon name="th-large" size={selected == 1 ? 15 : 12} /> All</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, selected == 2 ? styles.truebutton : {}, { flex: 3 }]}
          onPress={() => { setcondition('Residential'); setselected(2), setall(false) }}>
          <Text style={selected == 2 ? { fontWeight: 'bold', fontSize: 15, color: global.color } : { fontSize: 12 }}>
            <Icon name="home" size={selected == 2 ? 16 : 13} /> Residential</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, selected == 3 ? styles.truebutton : {}, { flex: 3 }]}
          onPress={() => { setcondition('Commercial'); setselected(3), setall(false) }}>
          <Text style={selected == 3 ? { fontWeight: 'bold', fontSize: 15, color: global.color } : { fontSize: 12 }}>
            <Icon name="building-o" size={selected == 3 ? 15 : 12} /> Commercial</Text>
        </TouchableOpacity>
      </View>
      {
        //search bar
      }
      {/* <View style={{ margin: '1%' }}>
        <Searchbar
          placeholder="Search By SubArea"
          value={searchcity}
          theme={{ colors: { primary: global.color } }}
          fontSize={12}
          style={{ borderRadius: 10, color: global.color }}
          onChangeText={text => setsearchcity(text)}
        />
      </View> */}
      {
        //flat list
      }
      <View style={{ flex: 1 }}>
        <FlatList
          data={data}
          showsVerticalScrollIndicator={false}
          renderItem={conditionalrenderItem}
          keyExtractor={item => item.data.id}
          numColumns={3}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      </View>
      {
        //on mapp button
      }
      <TouchableOpacity style={{
        position: 'absolute', top: windowHeight, left: windowWidth,

      }}
        onPress={() => {
          global.naviof.navigate('Map')
        }
        }
      >
        <View style={styles.butnmap}>
          <Text style={{
            color: 'white',
            fontSize: 15,
            padding: '1%'
          }}><Icon name={'map'} /> MAP</Text>
        </View>
      </TouchableOpacity>
      {
        // screen loader
      }
      <CustActivity loder={loder} />
      <CustDD
        open={DDcity}
        setselect={setcity}
        setopen={setDDcity}
        data={cityList}
      />
    </SafeAreaView>
  )
}


export default HomeScreen

