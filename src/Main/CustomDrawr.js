import React from 'react';
import { Profiler } from 'react';
import { useState } from 'react';
import { StyleSheet } from 'react-native';
import {
  View,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity,
} from 'react-native';
import { Avatar } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
global.color = '#2859a6';

const CustomDrawer = props => {
  return (
    <View>
      <View style={styles.main}>
        <Avatar.Image size={100}
          style={{ marginVertical: '10%', alignSelf: 'center' }}
          source={
            global.user.image != null ?
              { uri: global.apiimage + global.user.image } :
              require("../Pictures/profile.jpeg")
          } />

        <Text
          style={styles.text}>
          {global.user.name}
        </Text>
        <Text
          style={[styles.text,{fontSize:12}]}>
          <Icon name="envelope" /> {global.user.email}</Text>
        <Text
          style={[styles.text,{fontSize:12}]}>
            <Icon name="phone" /> {global.user.contact}</Text>

      </View>
      <View style={{padding:'8%'}}>
        <TouchableOpacity
          onPress={() => {
            props.navigation.navigate('h');
            props.navigation.closeDrawer();
          }}
          style={styles.button}>
          <Text
           style={styles.buttontext}>
            <Icon name="home" size={15} />      Home
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            props.navigation.navigate('My Profile');
            props.navigation.closeDrawer();
          }}
          style={styles.button}>

          <Text
            style={styles.buttontext}>
            <Icon name="user-circle-o" size={15} />     Profile
          </Text>
        </TouchableOpacity>
        {global.user.roleid == 1 ? (
          <View>
            <TouchableOpacity
              onPress={() => {
                props.navigation.navigate('p');
                props.navigation.closeDrawer();
              }}
              style={styles.button}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>

                <Text
                  style={styles.buttontext}>
                  <Icon name="th-large" size={15} />      MyProperty
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                props.navigation.navigate('AddProperty');
                props.navigation.closeDrawer();
              }}
              style={styles.button}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>

                <Text
                 style={styles.buttontext}>
                  <Icon name="plus" size={15} />      Add Property
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        ) : (<></>)}


        <TouchableOpacity
          onPress={() => {
            props.navigation.navigate('Search');
            props.navigation.closeDrawer();
          }}
          style={styles.button}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>

            <Text
              style={styles.buttontext}>
              <Icon name="search" size={15} />      Search
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            props.navigation.navigate('SignIn');
            props.navigation.closeDrawer();
          }}
          style={styles.button}>
          <Text
            style={styles.buttontext}>
            <Icon name="sign-out" size={15} />      LogOut
          </Text>
        </TouchableOpacity>

      </View>

    </View >
  );
};

export default CustomDrawer;

const styles = StyleSheet.create({
  main: {
    justifyContent: 'center',
    backgroundColor: global.color,
    padding: '2%'
  },
  text:{
    fontSize: 25,
    fontFamily: 'Roboto-Medium',
    marginBottom: 5,
    width: '80%',
    alignSelf: 'center',
    color: 'white'
  },
  button:{
    margin: '1%', justifyContent: 'center',padding:'5%',
    marginVertical:'5%',
    borderRadius: 10, elevation: 2, backgroundColor: 'white'
  },
  buttontext:{

    fontSize: 12,
    fontFamily: 'Roboto-Medium',
    marginLeft: 5,
  }

})
