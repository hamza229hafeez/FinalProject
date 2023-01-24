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
import CustActivity from '../Main/acvitity';

const History = ({ navigation,route}) => {
   let pid=route.params.pid

    const renderItem = ({ item }) =>{ 
        let pic=item.user.image
        return(

        <TouchableOpacity style={{
            flex: 1, backgroundColor: 'white', borderRadius: 10, elevation: 5, padding: '1%',margin:'1%'
        }}
        onPress={()=>{
            navigation.navigate('BDORT',{tid:item.history.id})
        }}

        >
            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                <View style={{ flex: 2, alignItems: 'center' }}>
                    <Avatar.Image
                        size={60}
                        source={
                            pic != null ?
                                { uri: global.apiimage + pic } :
                                require("../Pictures/profile.jpeg")
                        }
                    />
                </View>
                <View style={{ flex: 2 }}>
                    <Text style={{ fontSize: 15, color: global.color }}>{item.user.name}</Text>
                    <Text style={{ fontSize: 12, }}>{item.user.contact}</Text>
                </View>
                <View style={{flex:4}}>
                    <Text style={{ fontSize: 12, }}>Join Date : {item.history.dateofjoin}</Text>
                    <Text style={{ fontSize: 12, }}>Left Date : {item.history.dateofleft}</Text>
                </View>
            </View>


        </TouchableOpacity>
    )}
    const [DATA, setData] = useState();
    const [loader, setloader] = useState(false);    
      useEffect(() => {
        getHistoryofproperty()
      }, [])
      async function getHistoryofproperty() {
        try {
          setloader(true)
          let response = await fetch(global.dataapi + 'Tenant/getHistoryofproperty?id=' + pid)
          let req = await response.json()
          setData(req)
          console.log('inner data', req);
          setloader(false)
        }
        catch (e) { alert(e); setloader(false) }
      }
    //   async function getReviewsofProperty() {
    //     try {
    //       setloader(true)
    //       let response = await fetch(global.api + 'Review/getReviewsofProperty?id='+id+'&oid='+oid)
    //       let req = await response.json()
    //       setData(req)
    //       console.log('inner data', req);
    //       setloader(false)
    //     }
    //     catch (e) { alert(e); setloader(false) }
    //   }
    return (
        DATA != '' ? (
            <View style={{ flex: 1 }}>
                <FlatList
                    data={DATA}
                    showsVerticalScrollIndicator={false}
                    renderItem={renderItem}
                    keyExtractor={item => item.history.id}
                    contentContainerStyle={{ padding: '1%' }}
                    style={{padding:'1%'}}
                />
            </View>
        )
            : (
            <View>
            <Text style={{ alignSelf: 'center' }}> No Review Found</Text>
            <CustActivity loder={loader} />
            </View>
            )
    )
}
export default History;