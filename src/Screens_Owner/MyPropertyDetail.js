import React, { useState, useEffect } from 'react';
import {
    SafeAreaView,
    Text,
    TouchableOpacity,
    View,

} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Avatar, Button, Modal, TextInput } from 'react-native-paper';
import BDetail from '../Main/BasicPDetails';
import MultipleImage from '../Main/MultipuleImages';
import Icon from 'react-native-vector-icons/FontAwesome';
import Reviews, { PReviews } from '../Main/Reviews';
import RequestOF from './Request';
import Stars from 'react-native-stars'

const MyPropertyDetail = ({ navigation, route }) => {
    const data = route.params.item
    let id = data.id;
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();
    var date = new Date().getDate();
    const [loder, setloder] = useState();
    const [dataofuser, setdataofuser] = useState('')
    const [bdetail, setbdetail] = useState('')



    useEffect(() => {
        getbdofproperty()
    }, [])

    useEffect(() => {
        if (bdetail) {
            if (bdetail.ownerleft == 1 && bdetail.tenantleft == 1 && data.status == 2) {
                if ((bdetail.leftrequestmonth + bdetail.leftaftermonth % 12) == month) {
                    leftAll();
                }
            }
        }
    }, [])
    useEffect(() => {
        getTenantofproperty()
    }, [(data.status == 1 || data.status == 2) && bdetail.status == 0])
    async function getTenantofproperty() {
        try {
            setloder(true)
            let response = await fetch(global.dataapi + 'Tenant/getTenantdataProperty?id=' + id)
            let owner = await response.json()
            setdataofuser(owner)
            setloder(false)
        }
        catch (e) { alert(e); setloder(false) }
    }
    async function getbdofproperty() {
        try {
            setloder(true)
            let response = await fetch(global.dataapi + 'Tenant/getTenantAgainstProperty?id=' + id)
            let o = await response.json()
            setbdetail(o)
            setloder(false)
        }
        catch (e) { alert(e); setloder(false) }
    }

    async function deletedataofproperty() {
        try {
            setloder(true)
            let response = await fetch(global.dataapi + 'Property/DeleteProperty?id=' + id)
            let res = await response.json()
            res == 1 ? (navigation.goBack()) : (alert(res))
            setloder(false)
        }
        catch (e) { alert(e); setloder(false) }
    }
    const leftProperty = async () => {
        try {
            setloder(true)
            await fetch(global.dataapi + 'Tenant/setownerLeftProperty',
                {
                    method: 'POST',
                    body: JSON.stringify({
                        id: bdetail.id,
                        propertyid: data.id,
                        leftrequestmonth: month,
                        leftaftermonth: 1
                    }
                    ),
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json'
                    }
                }
            ).then(response => response.json())
                .then(d => {
                    fetch(global.dataapi + 'Review/setReviewofperson',
                        {
                            method: 'POST',
                            body: JSON.stringify({
                                sender: global.user.id,
                                receiver: dataofuser.id,
                                propertyid: data.id,
                                date: global.Cdate,
                                rate: rate,
                                feedback: feedback
                            }
                            ),
                            headers: {
                                Accept: 'application/json',
                                'Content-Type': 'application/json'
                            }
                        }
                    ).then(response => response.json())
                        .then(d => {
                            alert("left", d)
                            setloder(false)
                        })
                })
        }
        catch (error) {
            setloder(false)
            alert("Post submission failed");

        }
    }
    const leftAll = async () => {
        try {
            setloder(true)
            await fetch(global.dataapi + 'Tenant/setLeftProperty',
                {
                    method: 'POST',
                    body: JSON.stringify({
                        id: bdetail.id,
                        propertyid: data.id,
                        dateofleft: global.Cdate,
                    }
                    ),
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json'
                    }
                }
            ).then(response => response.json())
                .then(d => { })
        }
        catch (error) {
            setloder(false)
            alert("Post submission failed");

        }
    }
    const [updateModel, setupdateModel] = useState(false)
    const [feedback, setfeedback] = useState('')
    const [rate, setrate] = useState(3)
    console.log(bdetail);
    return (
        <SafeAreaView style={{
            flex: 1, flexDirection: 'column',
            backgroundColor: 'white'
        }}>
            <ScrollView>
                <View style={{ flex: 2 }}>
                    <MultipleImage id={id} />


                    <BDetail data={data} />

                    {
                        ((data.status == 1 || data.status == 2) && bdetail.status == 0 && dataofuser) ? (
                            <View style={{ margin: '1%' }}>

                                <TouchableOpacity style={{ backgroundColor: 'white', padding: 5 }} onPress={() => { navigation.navigate('OtherProfile', { item: dataofuser, data: data }) }}>
                                    <Text style={{ fontSize: 15, fontWeight: 'bold', color: 'black', marginLeft: '3%' }}>Tenent:</Text>
                                    <View style={{ flexDirection: 'row', borderRadius: 8, elevation: 10, backgroundColor: 'white', flex: 1 }}>

                                        <View style={{ flex: 2, alignItems: 'center', alignSelf: 'center' }}>

                                            <Avatar.Image size={60}
                                                style={{ margin: '2%' }}
                                                source={
                                                    dataofuser.image != null ?
                                                        { uri: global.apiimage + dataofuser.image } :
                                                        require("../Pictures/profile.jpeg")
                                                } />
                                        </View>
                                        <View
                                            style={{ flex: 3, alignItems: 'flex-start', justifyContent: 'center' }}>
                                            <Text style={{ fontSize: 15, color: global.color, fontWeight: 'bold' }}>{dataofuser.name}</Text>
                                            <Text style={{ fontSize: 12, fontWeight: 'bold' }}>Contact: {dataofuser.contact}</Text>
                                        </View>
                                        <View
                                            style={{ flex: 2, justifyContent: 'center' }}
                                        >

                                            <Button mode="elevated"
                                                color={'white'}
                                                disabled={bdetail.ownerleft==1}
                                                style={{ alignSelf: 'center', backgroundColor: global.color }}
                                                onPress={() => { setupdateModel(true) }}>
                                                <Text style={{ fontSize: 10 }}> leave</Text>
                                            </Button>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                                <View style={{ flexDirection: 'row', justifyContent: 'center', padding: 5, marginBottom: 5, flex: 1 }}>
                                    <Button mode="contained"
                                        color={global.color}
                                        style={{
                                            flex: 1,
                                            margin: '2%',
                                            borderRadius: 8,
                                            elevation: 5,
                                        }}
                                        onPress={() => {
                                            global.naviof.navigate('BDORO', { tid: bdetail.id })
                                        }}>
                                        Details
                                    </Button>
                                </View>
                            </View>
                        ) : (

                            <View style={{ marginTop: '3%' }}>

                                <View style={{ flexDirection: 'row', justifyContent: 'center', flex: 1 }}>
                                    <Button mode="contained"
                                        color={global.color}
                                        style={{
                                            flex: 1,
                                            margin: '2%',
                                            borderRadius: 8,
                                            elevation: 5,

                                        }}
                                        onPress={() => {
                                            navigation.navigate('History', { pid: id })
                                        }}>
                                        History
                                    </Button>
                                    <Button mode="contained"
                                        color={'grey'}
                                        style={{

                                            borderRadius: 8,
                                            elevation: 5,
                                            flex: 1,
                                            margin: '2%',
                                        }}
                                        onPress={() => { deletedataofproperty() }}>
                                        <Text style={{ color: 'white' }}>Delete</Text>
                                    </Button>
                                </View>

                            </View>
                        )
                    }
                </View>
                {
                    (data.status == 2 || data.status == 0) ? (
                        <View>
                            <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'black', marginLeft: "3%" }}>Request:</Text>
                            <RequestOF id={id} data={data} />
                        </View>) : (<></>)
                }


                <View style={{ flex: 1 }}>

                    <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'black', marginLeft: "3%" }}>Reviews:</Text>
                    <PReviews id={id} oid={global.user.id} />

                </View>
            </ScrollView>
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
                        <View
                            style={{ flex: 1, alignContent: 'center', alignItems: 'center', alignSelf: 'center', justifyContent: 'center' }}
                        >
                            <Text style={{ fontSize: 20, fontWeight: 'bold', color: global.color, }}>Rate the Tenant</Text>
                            <View
                                style={{ paddingTop: '5%' }}
                            >
                                <Stars
                                    default={2.5}
                                    starSize={60}
                                    spacing={8}
                                    update={setrate}
                                    count={5}
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
                                />
                            </View>
                        </View>
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
                                            leftProperty()
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
            </Modal>
        </SafeAreaView>

    );

}
export default MyPropertyDetail;