import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  View,
  StyleSheet
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Avatar, Button, Modal, TextInput } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import CustActivity from '../Main/acvitity';
import MultipleImage from '../Main/MultipuleImages';
import BDetail from '../Main/BasicPDetails';
import Reviews, { PReviews } from '../Main/Reviews';
import Stars from 'react-native-stars'
import CustDD from '../API_Calling/CustDropDown';


export default RPropertyDetail = ({ navigation, route }) => {
  console.log('okkkkkkkkkkkk', route.params.item);

  var month = new Date().getMonth() + 1;
  const [feedbackProperty, setfeedbackproperty] = useState()
  const [feedbackOwner, setfeedbackOwner] = useState()
  const [rateowner, setrateowner] = useState()
  const [rateproperty, setrateproperty] = useState()
  const [feedbackmodel, setfeedbackmodel] = useState(false)
  const [loder, setloder] = useState()

  const [leftaftermonth, setleftaftermonth] = useState('')
  const [DDmethod, setDDmethod] = useState(false);
  const [methodList, setmethodlist] = useState([
    {
      label: "1",
      value: "1",
    },
    {
      label: "2",
      value: "2",
    },
    {
      label: "3",
      value: "3",
    },
    {
      label: "4",
      value: "4",
    },
    {
      label: "5",
      value: "5",
    },
    {
      label: "6",
      value: "6",
    }
  ]);

  const data = route.params.item.data
  const bdetail = route.params.item.tanent
  let id = data.id;
  let ownerid = data.ownerid;
  const [dataofuser, setdataofuser] = useState('')
  //const [bdetail, setbdetail] = useState('')
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
  const leftProperty = async () => {
    try {
      setloder(true)
      await fetch(global.dataapi + 'Tenant/setTenentLeftProperty',
        {
          method: 'POST',
          body: JSON.stringify({
            id: bdetail.id,
            propertyid: data.id,
            rate: rateproperty,
            review: feedbackProperty,
            leftaftermonth: leftaftermonth = '' ? 1 : leftaftermonth,
            leftrequestmonth: month
          }
          ),
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          }
        }
      ).then(response => response.json())
        .then(d => {
          fetch(global.dataapi + 'Review/setReviewofperson',
            {
              method: 'POST',
              body: JSON.stringify({
                sender: global.user.id,
                receiver: dataofuser.id,
                propertyid: data.id,
                date: global.Cdate,
                rate: rateowner,
                feedback: feedbackOwner
              }
              ),
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
              }
            }
          ).then(response => response.json())
            .then(d => {
              alert("left", d)
              setloder(false)
            })
        })
    }
    catch (error) {
      setloder(false)
      alert("Post submission failed");

    }
  }
  if (bdetail.ownerleft == 1) {
    alert('Left Property')
  }

  return (
    dataofuser != '' ? (
      <SafeAreaView style={{
        flex: 1, flexDirection: 'column',
        backgroundColor: 'white'
      }}>
        <ScrollView style={{}}>
          <View style={{ flex: 2 }}>
            {/* <Image
            style={{ height: 250, alignSelf: 'center', marginTop: 10, width: "90%", borderRadius: 30 }}
            source={{ uri: item.image }}
          /> */}

            <MultipleImage id={id} />

            <BDetail data={data} />

            <View style={{ marginLeft: '3%' }}>
              <Text style={{ fontSize: 15, fontWeight: 'bold', color: 'black' }}>Owner:</Text>
            </View>
            <TouchableOpacity style={{ backgroundColor: 'white', padding: 5 }} onPress={() => { navigation.navigate('OtherProfile', { item: dataofuser, data: data }) }}>
              <View style={{ flex: 1, flexDirection: 'row', borderRadius: 10, elevation: 10, backgroundColor: 'white', alignSelf: 'center' }}>

                <View style={{ flex: 2, alignItems: 'center', justifyContent: 'center', margin: '2%' }}>

                  <Avatar.Image size={60} source={{ uri: global.apiimage + dataofuser.image }} />
                </View>

                <View
                  style={{
                    flex: 3,
                    justifyContent: 'center'
                  }}>
                  <Text style={{ fontSize: 18, color: global.color, fontWeight: 'bold' }}>{dataofuser.name}</Text>
                  <Text style={{ fontSize: 15, fontWeight: 'bold' }}>Contact: {dataofuser.contact}</Text>
                </View>
                <View
                  style={{
                    flex: 2,
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >

                </View>
              </View>
            </TouchableOpacity>
            <View style={{ flexDirection: 'row', justifyContent: 'center', paddingHorizontal: '10%', marginBottom: 5, marginTop: 10 }}>
              <Button mode="contained"
                color={global.color}
                style={{
                  borderRadius: 8,
                  elevation: 5,

                  flex: 1,
                  margin: '2%',
                }}
                onPress={() => {
                  global.naviof.navigate('BDORT',{tid:bdetail.id})

                }}>
                <Text style={{ color: 'white', fontSize: 10 }}>Details</Text>
              </Button>
              <Button mode="contained"
                color={'grey'}
                disabled={bdetail.tenantleft == 1}
                style={{

                  borderRadius: 8,
                  elevation: 10,

                  flex: 1,
                  margin: '2%',
                }}
                onPress={() => { setfeedbackmodel(true) }}>
                <Text style={{ color: 'white', fontSize: 10 }}>Left</Text>
              </Button>
            </View>
          </View>
          <View style={{ flex: 1, marginTop: 10 }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'black', marginLeft: 10 }}>Reviews:</Text>
            <PReviews id={id} oid={ownerid} />
          </View>
        </ScrollView>
        <Modal visible={feedbackmodel} style={{
          backgroundColor: 'white',
          height: 600, borderRadius: 20, width: '90%', marginLeft: '5%'
          , padding: '7%'
        }}>
          <ScrollView
            showsVerticalScrollIndicator={false}
          >
            <View
              style={{
                flexDirection: 'column'
              }}
            >
              <View
                style={{ paddingHorizontal: '3%' }}
              >
                <Text style={styles.heading}>Left After Month</Text>
                <TouchableOpacity
                  style={styles.ddview}
                  onPress={() => {
                    setDDmethod(true)
                  }}
                >
                  <Text style={styles.inerview}>{leftaftermonth}</Text>
                </TouchableOpacity>
                <CustDD
                  open={DDmethod}
                  setselect={setleftaftermonth}
                  setopen={setDDmethod}
                  data={methodList}
                />
              </View>
              <Text
                style={{ fontSize: 20, fontWeight: 'bold', color: global.color, alignSelf: 'center' }}
              >FeedBack To Property</Text>
              <TextInput
                label="Feedback"
                value={feedbackProperty}
                style={{ width: "96%", alignSelf: 'center', marginTop: "2%", elevation: 5 }}
                activeUnderlineColor={global.color}
                onChangeText={text => setfeedbackproperty(text)}
                multiline={true}
              />
              <View
                style={{ flex: 1, alignContent: 'center', alignItems: 'center', alignSelf: 'center', justifyContent: 'center' }}
              >
                <Text style={{ fontSize: 20, fontWeight: 'bold', color: global.color, }}>Rate the Property</Text>
                <View
                  style={{ paddingTop: '5%' }}
                >
                  <Stars
                    default={2.5}
                    starSize={60}
                    spacing={8}
                    count={5}
                    update={setrateproperty}
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
                  />
                </View>
              </View>
              <View
                style={{ borderBottomWidth: 1, margin: '10%', borderColor: 'grey' }}
              ></View>
              <Text
                style={{ fontSize: 20, fontWeight: 'bold', color: global.color, alignSelf: 'center' }}
              >FeedBack To Owner</Text>
              <TextInput
                label="Feedback"
                value={feedbackOwner}
                style={{ width: "96%", alignSelf: 'center', marginTop: "2%", elevation: 5 }}
                activeUnderlineColor={global.color}
                onChangeText={text => setfeedbackOwner(text)}
                multiline={true}
              />
              <View
                style={{ flex: 1, alignContent: 'center', alignItems: 'center', alignSelf: 'center', justifyContent: 'center' }}
              >
                <Text style={{ fontSize: 20, fontWeight: 'bold', color: global.color, }}>Rate the Owner</Text>
                <View
                  style={{ paddingTop: '5%' }}
                >
                  <Stars
                    default={2.5}
                    starSize={60}
                    spacing={8}
                    count={5}
                    update={setrateowner}
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
                  />
                </View>
              </View>
              <View style={{ flexDirection: 'row', justifyContent: 'center', padding: '10%' }}>
                <Button mode="contained"
                  color={global.color}
                  style={{
                    flex: 1,
                    margin: '2%',
                    borderRadius: 8,
                    elevation: 10,
                  }}
                  onPress={() => {

                    leftProperty()
                  }}>
                  <Text style={{ color: 'white', fontSize: 10 }}>send</Text>
                </Button>
                <Button mode="contained"
                  color={'grey'}
                  style={{

                    borderRadius: 8,
                    elevation: 10,
                    flex: 1,
                    margin: '2%',
                  }}
                  onPress={() => { setfeedbackmodel(false) }}>
                  <Text style={{ color: 'white', fontSize: 10 }}>Cancel</Text>
                </Button>
              </View>
            </View>
          </ScrollView>
        </Modal>
        <CustActivity loder={loder} />
      </SafeAreaView>
    ) : (<Text>no data found</Text>)
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