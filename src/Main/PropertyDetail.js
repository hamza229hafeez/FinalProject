import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Avatar, Button, Modal, Provider, TextInput } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import CustActivity from './acvitity';
import MultipleImage from './MultipuleImages';
import BDetail from './BasicPDetails'
import Reviews, { PReviews } from './Reviews';
import CustDD from '../API_Calling/CustDropDown';
import { StyleSheet } from 'react-native';

export default PropertyDetail = ({ navigation, route }) => {
  const [booknow, setbooknow] = useState(false)
  const [dateofrent, setdateofrent] = useState('')
  const [offerdescription, setofferdescription] = useState()
  const [loder, setloder] = useState()
  const [value,setvalue]=useState(1)

  const [DDmethod, setDDmethod] = useState(false);
  const [method, setmethod] = useState('');
  const [methodList, setmethodlist] = useState([
    {
      label: "Monthly",
      value: "Monthly",
    },
    {
      label: "Afer 3 Month",
      value: "Afer 3 Month",
    },
    {
      label: "Afer 6 Month",
      value: "Afer 6 Month",
    },
    {
      label: "Afer 1 year",
      value: "Afer 1 year",
    }
  ]);
  function getvale() {
    if (method.includes('Monthly')){setvalue(1)}
    else if (method.includes('Afer 3 Month')){setvalue(3)}
    else if (method.includes('Afer 6 Month')){setvalue(6)}
    else if (method.includes('Afer 1 year')){setvalue(12)}
}
  const data = route.params.item
  let id = data.id;
  let ownerid = data.ownerid;
  const [dataofuser, setdataofuser] = useState('')

  useEffect(() => {
    getuserdata()
  }, [])
  useEffect(() => {
    getvale()
  }, [method])


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
  let d;
  let date = global.Cdate;
  async function setRequest() {
    console.log(global.Cdate);
    try {
      setloder(true)
      let req = {
        Tenantid: global.user.id,
        Propertyid: id,
        description: offerdescription,
        Date: date,
        Rentdate: dateofrent,
        rentmethord: value
      }
      let response = await fetch(global.dataapi + 'Request/setRequest', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(req)
      })
      d = await response.json()
      setloder(false)
      d == 1 ? (alert("Already Offered")) : (
        d == 0 ? (setbooknow(false)) : (alert(d)))
    }
    catch (e) { alert(e); setloder(false) }
  }
  return (
    dataofuser != '' ? (
      <SafeAreaView style={{
        flex: 1, flexDirection: 'column',
        backgroundColor: 'white'
        , padding: '1%'
      }}>
        <ScrollView
          showsVerticalScrollIndicator={false}
        >
          <View>
            {/* <Image
            style={{ height: 250, alignSelf: 'center', marginTop: 10, width: "90%", borderRadius: 30 }}
            source={{ uri: item.image }}
          /> */}

            <MultipleImage id={id} />
            <BDetail data={data} />
            <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'black', margin: '3%' }}>Listing Agent:</Text>
            <TouchableOpacity style={{
              backgroundColor: 'white', borderRadius: 10, backgroundColor: 'white', borderWidth: 1, borderColor: '#E7E7E7',
              width: '95%', alignSelf: 'center'
            }}
              onPress={() => { navigation.navigate('OtherProfile', { item: dataofuser, data: data }) }}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>

                <View style={{ margin: '3%', flex: 2, alignItems: 'flex-start', justifyContent: 'center' }}>

                  <Avatar.Image size={60} source={
                    dataofuser.image ?
                      { uri: global.apiimage + dataofuser.image } :
                      require("../Pictures/profile.jpeg")
                  } />
                </View>
                <View
                  style={{ flex: 5 }}>
                  <Text style={{ fontSize: 15, color: global.color, fontWeight: 'bold' }}>{dataofuser.name}</Text>
                  <Text style={{ fontSize: 12, fontWeight: 'bold' }}>Contact Number : {dataofuser.contact}</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Icon name="angle-right" size={20} color={global.color} />
                </View>
              </View>
            </TouchableOpacity>
            <Button mode="contained"
              color={global.color}
              style={{
                width: "50%", elevation: 5,
                justifyContent: 'center',
                borderRadius: 8,
                alignSelf: 'center',
                margin: '2%'
              }}
              onPress={() => { setbooknow(true) }}>
              <Icon name="book" size={18} color={'white'} /> Book Now
            </Button>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'black', marginLeft: '3%' }}>Reviews:</Text>
            <PReviews id={id} oid={ownerid} />
          </View>
        </ScrollView>
        <Modal style={{}} visible={booknow}>
          <View
            style={{ backgroundColor: 'white', width: '90%', height: 400, borderRadius: 20, alignSelf: 'center' }}
          >
            <Text style={{ fontSize: 22, fontWeight: 'bold', alignSelf: 'center', marginTop: 20 }}>Send Request</Text>

            <View
            >
              <TextInput
                label="Date of Rent Pay"
                value={dateofrent}
                style={{ width: "90%", alignSelf: 'center', elevation: 5, marginTop: "3%" }}
                activeUnderlineColor={global.color}
                onChangeText={text => setdateofrent(text)}
              />
            </View>
            <View

            >
              <TextInput
                label="Description"
                value={offerdescription}
                style={{ width: "90%", alignSelf: 'center', elevation: 5, marginTop: "3%" }}
                activeUnderlineColor={global.color}
                multiline={true}
                onChangeText={text => setofferdescription(text)}
              />
            </View>
            <View
              style={{ paddingHorizontal: '5%' }}
            >
              <Text style={styles.heading}>Set payment method</Text>
              <TouchableOpacity
                style={styles.ddview}
                onPress={() => {
                  setDDmethod(true)
                }}
              >
                <Text style={styles.inerview}>{method}</Text>
              </TouchableOpacity>
              <CustDD
                open={DDmethod}
                setselect={setmethod}
                setopen={setDDmethod}
                data={methodList}
              />
            </View>
            <View
              style={{ flex: 1, flexDirection: 'row', alignSelf: 'center', marginTop: '5%' }}
            >
              <View style={{ flex: 1 }}>
                <Button mode="contained"
                  color={global.color}
                  style={{ alignSelf: 'center', elevation: 5 }}
                  onPress={() => {
                    (value!=''&& dateofrent!='')?
                    (alert(value),setRequest()):
                    alert('select fisrts')
                  }}>
                  <Icon name="send" size={18} color={'white'} /> Send
                </Button>
              </View>

              <View style={{ flex: 1 }}>
                <Button mode="contained"
                  color={'grey'}
                  style={{ alignSelf: 'center', elevation: 5, width: '80%' }}
                  onPress={() => {
                    setbooknow(false)
                  }}>
                  <Text style={{ color: 'white' }}>
                    <Icon name="ban" size={18} color={'white'} /> Cancel</Text>
                </Button>
              </View>
            </View>
          </View>
        </Modal>
        <CustActivity loder={loder} />
      </SafeAreaView>
    ) : (<CustActivity loder={loder} />)
  );
}
const styles = StyleSheet.create({
  heading: { fontSize: 12, fontWeight: 'bold', margin: '2%', color: 'black' },
  ddview: {
    width: '100%'
    , padding: '5%', backgroundColor: '#E7E7E7',
    borderBottomWidth: 1,
    borderBottomColor: global.color
  },
  inerview: { fontSize: 12, fontWeight: 'bold', color: global.color }
});