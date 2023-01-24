import React, { useState } from 'react';
import {
  SafeAreaView,
  Text,
  View,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Avatar, Button, Modal, TextInput } from 'react-native-paper';
import Reviews from '../Main/Reviews';
import Icon from 'react-native-vector-icons/FontAwesome';
import Stars from 'react-native-stars';
import { StyleSheet } from 'react-native';

const OtherProfile = ({ route, navigation }) => {


  const { item } = route.params;

  // const [updateModel, setupdateModel] = useState(false)
  // const [feedback, setfeedback] = useState('')
  
  let date = global.Cdate;
  let d;
  // async function setReview() {
  //   try {

  //     setloder(true)
  //     let rev = {

  //       sender: sender,
  //       receiver: receiver,
  //       against: pid,
  //       date: date,
  //       feedback: feedback
  //     }
  //     let response = await fetch(global.api + 'Review/setReview', {
  //       method: 'POST',
  //       headers: {
  //         Accept: 'application/json',
  //         'Content-Type': 'application/json'
  //       },
  //       body: JSON.stringify(rev)
  //     })
  //     d = await response.json()
  //     setloder(false)
  //     d == 1 ? (alert("Already Review")) : (
  //       d == 0 ? (setupdateModel(false)) : (alert(d)))
  //   }
  //   catch (e) { alert(e); setloder(false) }
  // }

  return (
    <SafeAreaView style={{ backgroundColor: 'white', flex: 1, flexDirection: 'column', padding: "2%" }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ alignSelf: 'center', padding: "2%" }}>
          <Avatar.Image size={120} source={
            item.image != null ?
              { uri: global.apiimage + item.image } :
              require("../Pictures/profile.jpeg")
          } />
          <Text style={{ fontSize: 25, alignSelf: 'center', color: global.color, fontWeight: 'bold' }}>{item.name}</Text>
        </View>

        <View style={styles.dview}>
          <Text style={styles.tittle}><Icon name="user" /> User Name :</Text>
          <Text style={styles.text}> {item.username}</Text>
        </View>
        <View style={styles.dview}>
          <Text style={styles.tittle}><Icon name="phone" /> Contact Number :</Text>
          <Text style={styles.text}>{item.contact}</Text>
        </View>

        <View style={styles.dview}>
          <Text style={styles.tittle}><Icon name="envelope" /> E-mail :</Text>
          <Text style={styles.text}>{item.email}</Text>

        </View>

        <View style={styles.dview}>
          <Text style={styles.tittle}><Icon name="map-marker" /> Address :</Text>
          <Text style={styles.text}>{item.address}</Text>
        </View>
        <View
          style={{
            flex: 1, alignContent: 'center', alignItems: 'center',
            alignSelf: 'center', justifyContent: 'center', padding: '5%'
            , flexDirection: 'row'
          }}
        >
          <Text
            Style={{ fontWeight: 'bold' }}
          >
            Rating{'\t'}{'\t'}{'\t'}
          </Text>
          <Stars
            default={4}
            count={5}
            half={true}
            disabled={true}
            starSize={30}
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
        {/* {((item.id == data.tid && global.user.id == data.oid && data.status == 1) || (item.id == data.oid && global.user.id == data.tid && data.status == 1)) ? (

          <View
            style={{ padding: '2%' }}
          >
            <Button mode="contained"
              color={global.color}
              style={{
                borderRadius: 8,
                elevation: 5,
                width: '50%',
                alignSelf: 'center'

              }}
              onPress={() => { setupdateModel(true) }}>
              Feedback
            </Button>
          </View>
        ) : (<></>)}
        <Modal visible={updateModel} style={{ backgroundColor: 'white', height: 320, borderRadius: 20, width: '90%', marginLeft: '5%' }}>
          <ScrollView>
            <Text
              style={{ fontSize: 28, fontWeight: 'bold', color: global.color, alignSelf: 'center' }}
            >FeedBack</Text>
            <View
              style={{
                flexDirection: 'column'
              }}
            >
              <TextInput
                label="Feedback"
                value={feedback}
                style={{ width: "90%", alignSelf: 'center', marginTop: 10, elevation: 5 }}
                activeUnderlineColor={global.color}
                onChangeText={text => setfeedback(text)}
                multiline={true}
              />
              <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 20 }}>
                <Button mode="contained"
                  color={global.color}
                  style={{
                    flex: 1,
                    margin: '2%',
                    borderRadius: 8,
                    elevation: 5,
                  }}
                  onPress={() => {
                    feedback == "" ?
                      (alert('Empty Filed')) : (
                        setReview()
                      )
                  }}>
                  send
                </Button>
                <Button mode="contained"
                  color={'grey'}
                  style={{
                    flex: 1,
                    margin: '2%',
                    borderRadius: 8,
                    elevation: 5,
                  }}
                  
                  onPress={() => { setupdateModel(false) }}>
                  <Text style={{ color: 'white' }}>Cancel</Text>
                </Button>
              </View>
            </View>
          </ScrollView>
        </Modal> */}
        <View>
          <Text style={{ fontSize: 18, color: "black", fontWeight: 'bold', marginLeft: 20 }}>Reviews:</Text>
          <Reviews id={item.id} />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
export default OtherProfile;

const styles = StyleSheet.create({
  dview: { flexDirection: 'row', padding: '1%', paddingLeft: '5%' },
  tittle: { fontSize: 15, fontWeight: 'bold', flex: 1 },
  text: { fontSize: 15, flex: 1 }
})