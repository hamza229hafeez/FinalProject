import React, { useState, useEffect } from 'react';
import {
    SafeAreaView,
    Text,
    Image,
    FlatList,
    TouchableOpacity,
    View,
    LogBox,
} from 'react-native';
import CustActivity from '../Main/acvitity';
import { useIsFocused } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/FontAwesome';
import PropertyDP from '../Main/PropertyDP';
import { RefreshControl } from 'react-native';
LogBox.ignoreLogs(['VirtualizedLists should never be nested']);

const RentProperty = ({ route }) => {
    const [loder, setloder] = useState(false);
    const [condition, setcondition] = useState()
    const [selected, setselected] = useState(1)
    const [all, setall] = useState(true)
    const isfocus = useIsFocused()
    useEffect(() => {
        getpropertydata()
    }, [])

    const [refreshing, setRefreshing] = React.useState(false);
    const onRefresh = React.useCallback(async()=>{
        setRefreshing(true);
        getpropertydata()
        setRefreshing(false);
      },[refreshing])

    let DATA;
    const [data, setdata] = useState([])
    async function getpropertydata() {
        try {
            setloder(true)
            let id = global.user.id
            let response = await fetch(global.dataapi + 'property/getPropertiesTanentRented?id=' + id)
            DATA = await response.json()
            setdata(DATA)
            setloder(false)
        }
        catch (e) { alert(e); setloder(false) }
    }

    const conditionalrenderItem = ({ item }) => (
        <View style={{ flex: 1, alignSelf: 'center', elevation: 5, backgroundColor: 'white', 
        borderRadius: 8, width: '100%'}}>
            <TouchableOpacity
                onPress={() => {
                    global.naviof.navigate('RPropertyDetails', { item })
                }}
            >
                <PropertyDP item={item} />
            </TouchableOpacity>
        </View>
    )
    return (
        <SafeAreaView style={{ flex: 1,padding:'2%' }}>
            <FlatList
                data={data}
                renderItem={conditionalrenderItem}
                showsVerticalScrollIndicator={false}
                keyExtractor={item => item.data.id}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                  }
            />
            <CustActivity loder={loder} />
        </SafeAreaView>
    )
}
export default RentProperty
