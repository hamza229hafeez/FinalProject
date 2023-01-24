import React, { useState } from 'react';
import {
    Alert,
    SafeAreaView,
    Text,
    View,
} from 'react-native';
import {
    Button,
    Checkbox,
    Provider, TextInput

} from "react-native-paper";

export default function CCB(props) {
    const [check,setcheck]=useState(false);
    check?props.setValue(1):props.setValue(0)
    return (
        <View style={{ flexDirection: 'row', alignContent: 'center', alignItems: 'center' }}>
            <Checkbox
                status={check ? 'checked' : 'unchecked'}
                color={global.color}
                onPress={() => {
                    setcheck(!check);
                }}
            ></Checkbox>
            <Text style={{ fontSize: 15 }}>{props.t}</Text>
        </View>
    )
}





