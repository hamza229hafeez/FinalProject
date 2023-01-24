import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Avatar, Button } from 'react-native-paper';
import MultipleImage from '../Main/MultipuleImages'
import CustActivity from '../Main/acvitity'
import BDetail from '../Main/BasicPDetails'

export default AdminPropertyDetail = ({ navigation, route }) => {
  const [loder, setloder] = useState()
  const data = route.params.item.data
  let id = data.id;
  let ownerid = data.ownerid;
  const [dataofuser, setdataofuser] = useState('')
  useEffect(() => {
    getuserdata()
  }, [])
  async function getuserdata() {
    try {
      setloder(true)
      let response = await fetch(global.dataapi + 'user/getuserbyid?id=' + ownerid)
      let owner = await response.json()
      setdataofuser(owner)
      setloder(false)
    }
    catch (e) { alert(e); setloder(false) }
  }
  const UpdateStatus = async () => {
    try {
      setloder(true)
      await fetch(global.dataapi + "Property/UpdateStatusProperty", {
        method: 'POST',
        body: JSON.stringify({
          id: data.id,
          status: 0
        }
        ),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      }).then(response => response.json())
        .then(mydata => {
          console.log(mydata);
          setloder(false)
          navigation.goBack();
        });
    }
    catch (error) {
      setloder(false)
    }
  }
  return (
    dataofuser != '' ? (
      <SafeAreaView style={{
         flexDirection: 'column',
        backgroundColor: 'white',padding:'2%'
      }}>
        <ScrollView
        showsVerticalScrollIndicator={false}
        >
          <View >
            <MultipleImage id={id} />
            <BDetail data={data} />
            <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'black', marginLeft: '4%' }}>Listing Agent:</Text>
            <TouchableOpacity style={{ backgroundColor: 'white', padding: 5 }} onPress={() => { navigation.navigate('OtherProfile', { item: dataofuser, data: data }) }}>
              <View style={{ flexDirection: 'row', borderRadius: 20, elevation: 5, backgroundColor: 'white' }}>

                <View style={{ width: '30%' ,alignItems:'center',justifyContent:'center'}}>

                  <Avatar.Image size={60} 
                    style={{margin:'2%'}}
                    source={
                        dataofuser.image != null ?
                        { uri: global.apiImage + dataofuser.image } :
                          require("../Pictures/profile.jpeg")} />
                </View>

                <View
                  style={{ width: '70%',alignSelf:'center' }}>
                  <Text style={{ fontSize: 15, color: global.color, fontWeight: 'bold' }}>{dataofuser.name}</Text>
                  <Text style={{ fontSize: 12, fontWeight: 'bold' }}>Contact Number : {dataofuser.contact}</Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'center',flex:1,padding:'5%'}}>
            <Button mode="contained"
              color={global.color}
              style={{
                borderRadius: 20,
                elevation: 5,
                flex:1
              }}
              onPress={UpdateStatus}>
              Approve
            </Button>
            <Button mode="contained"
              color={'grey'}
              style={{
                flex:1,
                borderRadius: 20,
                elevation: 5,
              }}
              onPress={() => { navigation.goBack(); }}>
              <Text style={{ color: 'white' }}>Reject</Text>
            </Button>
          </View>
        </ScrollView>
        <CustActivity loder={loder} />
      </SafeAreaView>
    ) : (<Text>no data found</Text>)
  );
}