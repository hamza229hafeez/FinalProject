import React, { useEffect, useState } from 'react';
import {
    SafeAreaView,
    Text,
    Image,
    FlatList,
    TouchableOpacity,
    View,
} from 'react-native';
import { Avatar, Button } from 'react-native-paper';
import CustActivity from '../Main/acvitity';

const RequestOF = ({ id, data }) => {
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();

    const setTenenttoProperty = async (t) => {
        try {
            await fetch(global.dataapi + 'Tenant/setTenentAgainstProperty',
                {
                    method: 'POST',
                    body: JSON.stringify({
                        propertyid: id,
                        tenantid: t.tenantid,
                        status: 0,
                        dateofjoin: global.Cdate,
                        ownerid: global.user.id,
                        rentdate: t.rentdate,
                        rentmethod: t.rentmethord
                    }
                    ),
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json'
                    }
                }
            ).then(response => response.json())
                .then(d => {
                    fetch(global.dataapi + "Tenant/setRentofProperty",
                        {
                            method: 'POST',
                            body: JSON.stringify({
                                tenantid: d.id,
                                month: month,
                                year: year,
                                rentamount:(data.rent*d.rentmethod)
                            }
                            ),
                            headers: {
                                Accept: 'application/json',
                                'Content-Type': 'application/json'
                            }
                        })
                        .then(response => response.json())
                        .then(mydata => {
                            alert("ok done", mydata)
                            global.naviof.goBack()
                        });
                })
        }
        catch (error) {
            alert("Post submission failed");

        }
    }


    const renderItem = ({ item }) => (
        <SafeAreaView style={{
            flex: 1, width: '96%', alignSelf: 'center', elevation: 2,
            backgroundColor: 'white', borderRadius: 8, padding: '2%'
        }}>
            <TouchableOpacity
                onPress={() => { global.naviof.navigate('OtherProfile', { item: item }) }}
            >
                <View style={{ flexDirection: 'row', flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <View style={{ flex: 1 }}>
                        <Avatar.Image
                            size={60}
                            style={{ alignSelf: 'center' }}
                            source={
                                item.image != null ?
                                    { uri: global.apiimage + item.image } :
                                    require("../Pictures/profile.jpeg")
                            }
                        />
                    </View>
                    <View style={{ alignSelf: 'center', flex: 2, marginLeft: '5%' }}>
                        <Text style={{ fontSize: 15, color: global.color }}>{item.name}</Text>
                        <Text style={{ fontSize: 12, color: 'black' }}>Date of pay Rent : {item.rentdate}</Text>
                        {item.rentmethord == '1' ? <Text style={{ fontSize: 12, color: 'black' }}>I'll pay Rent Monthly</Text> : <></>}
                        {item.rentmethord == '3' ? <Text style={{ fontSize: 12, color: 'black' }}>I'll pay Rent After 3 Month</Text> : <></>}
                        {item.rentmethord == '6' ? <Text style={{ fontSize: 12, color: 'black' }}>I'll pay Rent After 6 Month</Text> : <></>}
                        {item.rentmethord == '12' ? <Text style={{ fontSize: 12, color: 'black' }}>I'll pay Rent After 1 year</Text> : <></>}


                        <Text style={{ fontSize: 12, color: 'black' }}>{item.description}</Text>
                        <Text style={{ fontSize: 12, color: global.color, alignSelf: 'center' }}>{item.date}</Text>
                    </View>
                    <View
                        style={{ justifyContent: 'center', flex: 2 }}
                    >
                        {data.status != 2 ?
                            <Button mode="elevated"
                                color={'white'}
                                style={{ alignSelf: 'center', backgroundColor: global.color }}
                                onPress={() => setTenenttoProperty(item)}>
                                Accept
                            </Button>
                            :
                            <></>
                        }
                    </View>

                </View>

            </TouchableOpacity>
        </SafeAreaView>
    );
    const [DATA, setData] = useState();
    const [loader, setloader] = useState(false);

    useEffect(() => {
        getRequest();
    }, [])
    async function getRequest() {
        try {
            setloader(true)
            let response = await fetch(global.dataapi + 'Request/getRequests?id=' + id)
            let req = await response.json()
            setData(req)
            setloader(false)
        }
        catch (e) { alert(e); setloader(false) }
    }
    return (
        DATA != '' ? (<View>

            <FlatList
                data={DATA}
                renderItem={renderItem}
                showsVerticalScrollIndicator={false}
                keyExtractor={item => item.id}
                contentContainerStyle={{ padding: '1%' }}
            />

        </View>
        )
            : (
                <View>
                    <Text style={{ alignSelf: 'center' }}> No Request Found</Text>
                    <CustActivity loder={loader} />
                </View>
            )

    )
}
export default RequestOF;