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
import { StyleSheet } from 'react-native';
import Stars from 'react-native-stars';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function PropertyDP(props) {
  const item = props.item.data
  const pic =props.item.image[0]
  const rate=props.item.rate
  return (
    <View 
    style={{padding:"2%",margin:'1%'}}
    >
      <Image
        style={{ height: 200, width: '100%', borderRadius: 10, marginTop: 5, alignSelf: 'center' }}
        source={pic != null ?
          { uri: global.apiimage + pic.uri } :
          require("../Pictures/main.jpeg")}
      />


      <View style={{ flexDirection: 'row', flex: 1, marginLeft: '2%' }}>
        <View style={{ marginLeft: '2%', flex: 1 }}>

          <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'black' }}>
            {item.propertyname}
            <Text style={{ fontSize: 10, color: global.color }}> ({item.propertytype})</Text>
          </Text>
          <Text style={{ fontSize: 12, color: 'black' }}><Icon name="map-marker" size={15} color={'black'} /> {item.subarea}</Text>
          <Text style={{ fontSize: 15, color: 'black' }}><Icon name="map-marker" size={15} color={'black'} /> {item.city}</Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: 18, color: global.color, alignSelf: 'center',padding:5 }}>RS : {item.rent}</Text>
          <Stars
            default={rate==null?3:rate}
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
      </View>
    </View>
  )
}