import React, { useState, useEffect } from 'react';
import {
    SafeAreaView,
    Text,
    Image,
    FlatList,
    TouchableOpacity,
    View,
    LogBox,
    ScrollView,
} from 'react-native';
import { RDOAP } from '../Screen_Tanent/RentDetail';
import MyProperty from './MyProperty';
const ODashBoard = ({navigation}) => {
    const [selected, setselected] = useState(1)
    return (
        <SafeAreaView
            style={{ flex: 1, backgroundColor: 'white', padding: '2%' }}
        >
            <View
                style={{ padding: '2%' ,flexDirection:'row',borderRadius:20}}
            >
                <TouchableOpacity
                    style={[selected==1?{backgroundColor:global.color,justifyContent:'center'}:{},
                    {flex:1,alignItems:'center',alignContent:'center',
                    borderRadius:20,padding:'1%',borderWidth:1,borderColor:'grey'}]}
                    onPress={()=>{
                        setselected(1)
                    }}
                >
                    <Text
                    
                    style={[selected==1?{color:'white',justifyContent:'center'}:{color:'black'},
                    {alignItems:'center',alignContent:'center'}]}
                    >
                        Property Detail
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                style={[selected==2?{backgroundColor:global.color,justifyContent:'center'}:{color:'black'},
                {flex:1,alignItems:'center',alignContent:'center',
                borderRadius:20,padding:'1%',borderWidth:1,borderColor:'grey'}]}
                onPress={()=>{
                    setselected(2)
                }}
                >
                    <Text
                    style={[selected==2?{color:'white',justifyContent:'center'}:{color:'black'},
                    {alignItems:'center',alignContent:'center'}]}
                    >
                        Rent Detail
                    </Text>
                </TouchableOpacity>
            </View>
            {
            selected==1?
            <MyProperty navigation={navigation}/>:<RDOAP navigation={navigation}/>

            
            }

        </SafeAreaView>
    )
}
export default ODashBoard