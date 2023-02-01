import React, { useState, useEffect, useRef } from 'react';
import { TextInput, Avatar, Button, ActivityIndicator } from 'react-native-paper';
import {
  SafeAreaView,
  Text,
  Image,
  BackHandler,
  Alert,
  View,
  StatusBar,
  Animated,
  LogBox,
  StyleSheet
} from 'react-native';
import CustActivity from './acvitity'
import Icon from 'react-native-vector-icons/FontAwesome';
import { ScrollView } from 'react-native-gesture-handler';
import PushNotification from "react-native-push-notification";
LogBox.ignoreAllLogs(['useNavigateDriver'])

const SignIn = ({ navigation }) => {
  useEffect(() => {
    createChannels();
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);

  const createChannels = () => {
    PushNotification.createChannel(
      {
        channelId: "test",
        channelName: "test ok"
      }
    )
  }


  const backAction = () => {
    Alert.alert("Hold on!", "Are you sure you want to Exit?", [
      {
        text: "Cancel",
        onPress: () => null,
        style: "cancel"
      },
      { text: "YES", onPress: () => BackHandler.exitApp() }
    ]);
    return true;
  };



  const mycolor = global.color
  const [show, setshow] = useState(true);
  const [username, setusername] = useState("hamza");
  const [loder, setloder] = useState(false);
  const [pasword, setpasword] = useState("123");
  let data;


  async function getUser() {
    try {

      setloder(true)
      let user = {
        userName: username,
        password: pasword
      }
      let response = await fetch(global.dataapi + 'user/getUser', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
      })
      data = await response.json()
      //console.log(data);
      setloder(false)

      data == '0' ? (alert("User Not Exist")) : (
        data == '1' ? (alert("Password Incorrect")) : (
          data.roleid == '0' ? (
            global.user = data, setpasword(''), setusername(''), navigation.navigate('Admin')
          ) : (data.roleid == '1' ? (
            global.user = data, setpasword(''), setusername(''), navigation.navigate('Drawr')
          ) : ((data.roleid == '2' ? (global.user = data, setpasword(''), setusername(''), navigation.navigate('TDrawr'))
            : (alert('seome thing wrong'))
          )))
        ))
    }
    catch (error) {
      alert("APi not responding")
      setloder(false)
    }
  }

  return (
    <SafeAreaView style={styles.main}>
      <StatusBar hidden={false} />
      <ScrollView style={{ flex: 1 }}>
        <View
          style={styles.pic}

        >
          <Image
            style={{ height: 200, width: '99%' }}
            source={require('../Pictures/first.png')}
          />
          <Text
            style={styles.logo}
          >RENTAL</Text>
          <Text
            style={styles.logo}
          >MANAGMENT</Text>
          {/* <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Image
              style={{ height: 280, width: 150 }}
              source={require('../Pictures/LOGO.png')}
            />
            <View style={{ flexDirection: 'column' }}>
              <Image
                style={{ height: 45, width: 200 }}
                source={require('../Pictures/Makan.png')}
              />
              <Text
                style={{ fontSize: 20, fontWeight: 'bold', color: mycolor, alignSelf: 'center', marginTop: 30 }}
              >RENTAL  MANAGMENT</Text>
              <View style={{ width: 200, height: 5, borderRadius: 20, backgroundColor: global.color }}></View>
              <Text
                style={{ fontSize: 20, fontWeight: 'bold', color: mycolor, alignSelf: 'center' }}
              >REAL ESTATE</Text>
            </View>
          </View> */}
        </View>
        <View
          style={styles.inputview}
        >
          <View>
            <TextInput
              label={<Icon name="user" color={global.color} > User Name</Icon>}
              value={username}
              style={styles.input}
              activeUnderline='disable'
              activeUnderlineColor={mycolor}
              outlineColor='Black '
              onChangeText={text => setusername(text)}
            />
          </View>
          <View
            style={{ marginTop: '3%' }}
          >
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
              activeUnderlineColor={mycolor}
              onChangeText={text => setpasword(text)}
            />
          </View>
          <View
            style={{ marginTop: '4%' }}
          >
            <Button mode="contained"
              color={mycolor}
              style={styles.input}
              onPress={() => {
                pasword == "" || username == "" ? (alert('Empty Filed')) : (getUser())
              }}>
              LogIn
            </Button>
          </View>
          <View style={styles.signin}>

            <Text>Don't have an Account?</Text>
            <Button mode="text"
              color={mycolor}
              onPress={() => navigation.navigate('SignUp')}>
              Sign Up
            </Button>
          </View>

        </View>
      </ScrollView>
      <CustActivity loder={loder} />
    </SafeAreaView>
  );
};
function MyPresentScreen({ navigation }, props) {
  setTimeout(() => {
    navigation.navigate('SignIn');
  }, 2500);

  const FadeInView = (props) => {
    const fadeAnim = useRef(new Animated.Value(0)).current  // Initial value for opacity: 0

    useEffect(() => {
      Animated.timing(
        fadeAnim,
        {
          toValue: 1,
          duration: 2500,
          useNativeDriver: true
        }
      ).start();
    }, [fadeAnim])

    return (
      <Animated.View                 // Special animatable View
        style={{
          ...props.style,
          opacity: fadeAnim,
          // width:fadeAnim,
          // height:fadeAnim         // Bind opacity to animated value
        }}
      >
        {props.children}
      </Animated.View>
    );
  }




  return (

    <View
      style={{ justifyContent: 'center', flex: 1, width: '100%' }}
      alignSelf='center'
    >
      {/* <Text
    style={{ fontSize: 52, fontWeight: 'bold', color: mycolor, alignSelf: 'center'}}
  >RENTAL  MANAGMENT</Text> 
      <StatusBar animated={true} hidden={true} />
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Image
          style={{ height: 280, width: 150 }}
          source={require('../Pictures/LOGO.png')}
        />
        <View style={{ flexDirection: 'column' }}>
          <Image
            style={{ height: 45, width: 200 }}
            source={require('../Pictures/Makan.png')}
          />
          <Text
            style={{ fontSize: 20, fontWeight: 'bold', color: global.color, alignSelf: 'center', marginTop: 30 }}
          >RENTAL  MANAGMENT</Text>
          <View style={{ width: 200, height: 5, borderRadius: 20, backgroundColor: global.color }}></View>
          <Text
            style={{ fontSize: 20, fontWeight: 'bold', color: global.color, alignSelf: 'center' }}
          >REAL ESTATE</Text>
        </View>
      </View> */}
      <FadeInView >
        <Image
          style={{ height: 200, width: '99%' }}
          source={require('../Pictures/first.png')}
        />
        <Text
          style={styles.splash}
        >RENTAL</Text>
        <Text
          style={styles.splash}
        >MANAGMENT</Text>
      </FadeInView>
    </View>

  )
};

export { SignIn, MyPresentScreen };

const styles = StyleSheet.create({
  splash: {
    fontSize: 25, fontWeight: 'bold', color: global.color, textAlign: 'center'
  },
  main: { backgroundColor: 'white', flex: 1, padding: '2%' },
  pic: { flex: 1, width: '99%', alignItems: 'center', padding: '5%', marginTop: '15%', alignSelf: 'center' },
  logo: { fontSize: 25, fontWeight: 'bold', color: global.color, textAlign: 'center' },
  inputview: {
    flexDirection: 'column'
    , flex: 1, padding: '7%'
  },
  input: { elevation: 2, marginTop: '1%' },
  signin: {
    flexDirection: 'row',
    padding: '10%',
    alignItems: 'center'
  }
});