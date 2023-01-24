import React, { useState } from 'react';
import {
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Avatar, Button, Modal, TextInput } from 'react-native-paper';
import Reviews from '../Main/Reviews';
import { useIsFocused } from '@react-navigation/native'
import CustActivity from '../Main/acvitity';
import Icon from 'react-native-vector-icons/FontAwesome';
import { PickImage } from './Image';
import Stars from 'react-native-stars';

const Profile = (props) => {
  let data = global.user;
  const isfocus = useIsFocused()


  const [image, setimage] = useState("")
  const [updateModel, setupdateModel] = useState(false)
  const [loder, setloder] = useState(false)
  const [name, setname] = useState(global.user.name)
  const [username, setusername] = useState(global.user.username)
  const [email, setemail] = useState(global.user.email)
  const [contact, setcontact] = useState(global.user.contact)
  const [password, setpasword] = useState(global.user.password)


  const UpdateUserPicture = async () => {
    try {
      const info = new FormData();
      info.append("photo", {
        name: 'abc.jpg',
        type: 'image/jpeg',
        uri: image
      });
      await fetch(
        global.dataapi + 'user/UploadFile',
        {
          method: 'POST',
          body: info,
          headers: {
            'Content-Type': 'multipart/form-data;',
          }
        }
      ).then(response => response.json())
        .then(img => {
          fetch(global.dataapi + "user/UpdateUserImage", {
            method: 'POST',
            body: JSON.stringify({
              id: global.user.id,
              name: name,
              username: username,
              email: email,
              contact: contact,
              password: password,
              image: img.Name
            }
            ),
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json'
            }
          }).then(response => response.json())
            .then(mydata => {
              global.user = mydata
              if (data != '') {
              }
              else alert("Plz Try Again!")
              setloder(false)
            });
        });
    }
    catch (error) {
      alert("Post submission failed");
    }
  }
  const UpdateUser = async () => {
    try {
      setloder(true)
      await fetch(global.dataapi + "user/UpdateUser", {
        method: 'POST',
        body: JSON.stringify({
          id: global.user.id,
          name: name,
          username: username,
          email: email,
          contact: contact,
          password: password,
        }
        ),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      }).then(response => response.json())
        .then(mydata => {
          global.user = mydata
          if (mydata != '') {
            //alert("Successfully Updated data of user")
          }
          else alert("Plz Try Again!")
          setloder(false)
        });
    }
    catch (error) {
      setloder(false)
    }
  }
  return (
    <SafeAreaView style={{ backgroundColor: 'white', flexDirection: 'column', padding: '2%' }}>
      <ScrollView >
        <View style={{ alignSelf: 'center', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
          <View style={{ flex: 2, justifyContent: 'center', alignItems: 'center' }}>
            <Avatar.Image size={120}
              source={
                global.user.image != null ?
                  { uri: global.apiimage + global.user.image } :
                  require("../Pictures/profile.jpeg")
              } />
          </View>
          <View
            style={{ flex: 3, justifyContent: 'center', alignContent: 'center', padding: '2%' }}>
            <Text style={{ fontSize: 22, color: global.color, fontWeight: 'bold' }}>{data.name}</Text>
            <Text style={{ fontSize: 15, }}><Icon name="user" /> {data.username}</Text>
            <Text style={{ fontSize: 15, }}><Icon name="phone" /> {data.contact}</Text>
            <Text style={{ fontSize: 15, }}><Icon name="envelope" /> {data.email}</Text>
            <Text style={{ fontSize: 15, }}><Icon name="map-marker" /> {data.address}</Text>

          </View>

        </View>
        {/* <View style={{ flex: 1, justifyContent: 'center' }}>
          <Text style={{ fontSize: 30, alignSelf: 'center', color: global.color, fontWeight: 'bold' }}>{data.name}</Text>
        </View>
        <View style={{ flexDirection: 'row', flex: 2 }}>
          <View
            style={{ flex: 1, marginLeft: "5%", }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>User Name :</Text>
            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Contact Number :</Text>
            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>E-mail :</Text>
            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Address :</Text>
          </View>

          <View
            style={{ flex: 2 }}>
            <Text style={{ fontSize: 18, }}> {data.username}</Text>
            <Text style={{ fontSize: 18, }}>{data.contact}</Text>
            <Text style={{ fontSize: 18, }}>{data.email}</Text>
            <Text style={{ fontSize: 18, }}>{data.adress}</Text>

          </View>
        </View> */}
        <View
          style={{ flex: 1, alignContent: 'center', alignItems: 'center', alignSelf: 'center', justifyContent: 'center' }}
        >
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
        <View style={{
          flexDirection: 'row', justifyContent: 'center',
          alignSelf: 'center',
          padding: '7%'
        }}>
          <TouchableOpacity
            style={{
              alignSelf: 'center',
              alignItems: 'center',
              justifyContent: 'center',
              flex: 1,
              borderRightWidth: 2, borderColor: 'grey'
            }}
            onPress={() => { setupdateModel(true) }}>
            <Text style={{ fontWeight: 'bold', fontSize: 15, color: global.color }}>
              <Icon name="refresh" size={18} /> Update</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              alignSelf: 'center',
              alignItems: 'center',
              justifyContent: 'center',
              flex: 1,
              borderRadius: 20,
            }}
            onPress={() => { global.naviof.navigate('SignIn') }}
          >
            <Text style={{ fontWeight: 'bold', fontSize: 15, color: 'grey' }}>
              <Icon name="sign-out" size={18} /> Log Out</Text>
          </TouchableOpacity>
        </View>
        <View>
          <Text style={{ fontSize: 18, color: "black", fontWeight: 'bold', marginLeft: 20 }}>Reviews:</Text>

          <Reviews id={global.user.id} />

        </View>
      </ScrollView>
      <Modal visible={updateModel} style={{ backgroundColor: 'white', height: 500, borderRadius: 20, width: '90%', margin: '5%' }}>
        <ScrollView>
          <Text
            style={{ fontSize: 25, fontWeight: 'bold', color: global.color, alignSelf: 'center' }}
          >Update Data</Text>
          <View
            style={{
              flexDirection: 'column'
            }}
          >

            <TextInput
              label={<Icon name="user" color={global.color} > Name</Icon>}
              value={name}
              style={{ width: "90%", alignSelf: 'center', marginTop: '2%', elevation: 2 }}
              activeUnderlineColor={global.color}
              onChangeText={text => setname(text)}
            />
            <TextInput
              label={<Icon name="envelope" color={global.color} > Email</Icon>}
              value={email}
              style={{ width: "90%", alignSelf: 'center', marginTop: '2%', elevation: 2 }}
              activeUnderlineColor={global.color}
              onChangeText={text => setemail(text)}
            />
            <TextInput
              label={<Icon name="comments" color={global.color} > Contact Number</Icon>}
              value={contact}
              style={{ width: "90%", alignSelf: 'center', marginTop: '2%', elevation: 2 }}
              outlineColor='Black '
              activeUnderlineColor={global.color}
              onChangeText={text => setcontact(text)}
            />
            <TextInput
              label={<Icon name="lock" color={global.color} > Password</Icon>}
              value={password}
              style={{ width: "90%", alignSelf: 'center', marginTop: '2%', elevation: 2 }}
              outlineColor='Black '
              activeUnderlineColor={global.color}
              onChangeText={text => setpasword(text)}
            />
            <View style={{ marginLeft: '7%', marginTop: '3%' }}>
              <PickImage setimage={setimage} />
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'center', flex: 1 }}>
              <Button mode="text"
                color={global.color}
                style={{
                  flex: 1,
                  margin: '2%'
                }}
                onPress={() => {
                  password == "" || contact == "" || name == "" || email == "" ?
                    (alert('Empty Filed')) : (
                      image == "" ? (UpdateUser(), setupdateModel(false)) : (UpdateUserPicture(), setupdateModel(false))
                    )
                }}>
                <Text style={{ fontWeight: 'bold', fontSize: 18, color: global.color }}>
                  <Icon name="thumbs-o-up" size={18} /> Ok</Text>
              </Button>
              <Button
                color={'grey'}
                style={{
                  flex: 1,
                  margin: '2%'
                }}
                onPress={() => { setupdateModel(false) }}>
                <Text style={{ fontWeight: 'bold', fontSize: 18, color: 'grey' }}>
                  <Icon name="ban" size={18} color={'grey'} /> Cancel</Text>
              </Button>
            </View>
          </View>
        </ScrollView>
      </Modal>
      <CustActivity loder={loder} />

    </SafeAreaView>
  )
}
export default Profile;