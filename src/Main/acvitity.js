import React, { useState } from 'react';
import { TextInput, Avatar, Button, ActivityIndicator, Modal } from 'react-native-paper';
import {
  SafeAreaView,
  Text,
  Image,

  View,
} from 'react-native';
import { StyleSheet } from 'react-native';
global.color = '#2859a6';

const CustActivity = ({ loder }) => {
  return (

    <Modal style={styles.modl} visible={loder}>
      <View
        style={styles.view}
      >
        <ActivityIndicator color={global.color} size="small" style={{ marginTop: 3 }} />
      </View>
    </Modal>)
}
export default CustActivity;

const styles = StyleSheet.create({
  modl:{ alignItems: 'center', justifyContent: 'center', },
  view:{
    backgroundColor: 'white', width: 40, borderRadius: 50, height: 40,
    borderColor: global.color, borderWidth: 5, marginTop: 70
  }
});