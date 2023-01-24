import React, { useState } from 'react';
import { TextInput, Button, Provider } from 'react-native-paper';
import {
  SafeAreaView,
  Text,

  ScrollView,
  View,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import DropDown from "react-native-paper-dropdown";
import CustActivity from './acvitity'
import { CityList} from '../Screens_Owner/Data';

const Signup = ({ navigation }) => {
  const mycolor = global.color
  const [show, setshow] = useState(true);
  const [showDropDown, setShowDropDown] = useState(false);
  const [roll, setRoll] = useState("");
  const [loder, setloder] = useState(false);
  const rollList = [
    {
      label: "Owner",
      value: "1",
    },
    {
      label: "Tanent",
      value: "2",
    }
  ];
  const [email, setEmail] = useState();
  const [pasword, setpasword] = useState();
  const [username, setusername] = useState();
  const [contactno, setcoontactno] = useState();
  const [name, setname] = useState()
  const [img, setimage] = useState('')
  const [cityadress, setcityadress] = useState()
  const [showcDropDown, setShowcDropDown] = useState(false);
  const [cityList, setcitylist] = useState(CityList);

  let data;
  async function setUser() {
    try {
      setloder(true)
      let user = {
        name: name,
        username: username,
        email: email,
        roleid: roll,
        adress: cityadress,
        contact: contactno,
        password: pasword,
      }
      let response = await fetch(global.dataapi + 'user/setuser', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
      })
      data = await response.json()
      setloder(false)
      data == 1 ? (alert("Already User Name Exist")) : (
        data == 0 ? (navigation.goBack()) : ("in data of signup", console.log(data)))
    }
    catch (e) { alert(e); setloder(false) }
  }

  return (
    <Provider>
      <SafeAreaView style={styles.top}>
        <View
          style={{ padding: '10%' }}
        >
          <Text
            style={{ fontSize: 30, fontWeight: 'bold', color: mycolor, alignSelf: 'center' }}
          >Sign Up</Text>

        </View>
        <ScrollView
          showsVerticalScrollIndicator={false}
        >
          <View>

            <TextInput
              label={<Icon name="user" color={global.color} > Name</Icon>}
              value={name}
              style={styles.input}
              activeUnderlineColor={mycolor}
              onChangeText={text => setname(text)}
            />
            <TextInput
              label={<Icon name="user" color={global.color} > User Name</Icon>}
              value={username}
              style={styles.input}
              activeUnderlineColor={mycolor}
              onChangeText={text => setusername(text)}
            />
            <TextInput
              label={<Icon name="envelope" color={global.color} > Email</Icon>}
              value={email}
              style={styles.input}
              activeUnderlineColor={mycolor}
              onChangeText={text => setEmail(text)}
            />
            <View style={styles.input}>
              <DropDown
                label={<Icon name="group" color={global.color} > Category</Icon>}
                visible={showDropDown}
                theme={{ colors: { primary: global.color } }}
                showDropDown={() => setShowDropDown(true)}
                onDismiss={() => setShowDropDown(false)}
                value={roll}
                setValue={setRoll}
                list={rollList}
              />
            </View>
            <View style={styles.input}>
              <DropDown
                label={<Icon name="map-marker" color={global.color} > City</Icon>}
                visible={showcDropDown}
                theme={{ colors: { primary: global.color } }}
                showDropDown={() => setShowcDropDown(true)}
                onDismiss={() => setShowcDropDown(false)}
                value={cityadress}
                setValue={setcityadress}
                list={cityList}
              />
            </View>
            <TextInput
              label={<Icon name="comments" color={global.color} > Contact Number</Icon>}
              value={contactno}
              style={styles.input}
              outlineColor='Black '
              activeUnderlineColor={mycolor}
              onChangeText={text => setcoontactno(text)}
            />
            <TextInput
              label={<Icon name="lock" color={global.color} > Password</Icon>}
              value={pasword}
              right={<TextInput.Icon name="eye"
                onPress={() => {
                  show ? setshow(false) : setshow(true)
                }}
              />}
              secureTextEntry={show}
              style={styles.input}
              outlineColor='Black '
              activeUnderlineColor={mycolor}
              onChangeText={text => setpasword(text)}
            />
            <Button mode="contained"
              color={mycolor}
              style={styles.button}
              onPress={() => {
                pasword == "" || username == "" || roll == "" || contactno == "" || cityadress == "" || name == "" ?
                  (alert('Empty Filed')) : (setUser())
              }}>
              Sign UP
            </Button>
            <View style={styles.signup}>
              <Text>Already have an Account?</Text>
              <Button mode="text"
                color={mycolor}
                onPress={() => navigation.goBack()}>
                Sign In
              </Button>
            </View>
          </View>
        </ScrollView>
        <CustActivity loder={loder} />
      </SafeAreaView>
    </Provider>
  );
};
export default Signup;

const styles = StyleSheet.create({
  top: { flex: 1, backgroundColor: 'white', padding: '8%' },
  input: { marginTop: '3%', elevation: 2 },
  button: { marginTop: '10%' },
  signup: {
    flexDirection: 'row',
    padding: '10%',
    alignItems: 'center'
  }
});