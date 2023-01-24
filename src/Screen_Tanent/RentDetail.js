//rent of month detail
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
    StyleSheet
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import CustActivity from '../Main/acvitity';

LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
//import { RefreshControl } from 'react-native';
const BDORT = ({ navigation, route }) => {
    let tid = route.params.tid


    const renderItem = ({ item }) => {
        let d = item.history.rentdate
        item = item.rent

        return (
            <View
                style={{ paddingHorizontal: '3%' }}
            >
                <View
                    style={{
                        backgroundColor: 'white', flexDirection: 'row',
                        paddingHorizontal: '5%', paddingVertical: '2%', elevation: 5,
                        marginVertical: '1%', borderRadius: 10, justifyContent: 'center'
                    }}
                >
                    <View style={{ flex: 2 }}>
                        <Text>{item.month} / {item.year}</Text>
                    </View>

                    <View style={{ flex: 1 }}>
                        {
                            item.status == 1 ?
                                <Text
                                    style={{ color: 'blue' }}
                                >Paid</Text> :
                                <Text
                                    style={item.status == null ? { color: 'red' } : { color: 'blue' }}
                                >{item.status == null && d < date ? 'unpaid' : 'due'}</Text>}
                    </View>

                    <View style={{ flex: 2 }}>
                        <Text>{item.rentamount}</Text>
                    </View>
                </View>
            </View>

        )
    }

    const [DATA, setData] = useState();
    const [loder, setloader] = useState(false);

    var date = new Date().getDate();
    useEffect(() => {
        getrentdetail()
    }, [])

    console.log(DATA);
    async function getrentdetail() {
        try {
            setloader(true)
            let response = await fetch(global.dataapi + 'Tenant/getPaymentDetailofproperty?id=' + tid)
            let req = await response.json()
            setData(req)
            console.log('inner data', req);
            setloader(false)
        }
        catch (e) { alert(e); setloader(false) }
    }
    return (
        DATA ?(
            <SafeAreaView
                style={{ flex: 1, backgroundColor: 'white' }}
            >
                <ScrollView>
                    <View
                        style={{ backgroundColor: 'white', padding: '5%' }}
                    >
                        <Text style={{ fontSize: 25, alignSelf: 'center', color: global.color, fontWeight: 'bold' }}>Monthly Rent Detail</Text>
                        <View style={styles.dview}>
                            <Text style={styles.tittle}>Property Name</Text>
                            <Text style={styles.text}>{DATA[0].property.propertyname}</Text>
                        </View>
                        <View style={styles.dview}>
                            <Text style={styles.tittle}>Rent Due date :</Text>
                            <Text style={styles.text}>Every {DATA[0].history.rentdate} of Month</Text>
                        </View>
                        <View style={styles.dview}>
                            <Text style={styles.tittle}>Rent Increment Yearly :</Text>
                            <Text style={styles.text}>{DATA[0].property.increment} %</Text>
                        </View>
                        <View style={styles.dview}>
                            <Text style={styles.tittle}>Join Base :</Text>
                            {DATA[0].history.rentmethod == '1' ? <Text style={styles.text}>Rent Monthly</Text> : <></>}
                            {DATA[0].history.rentmethod == '3' ? <Text style={styles.text}>Rent After 3 Month</Text> : <></>}
                            {DATA[0].history.rentmethod == '6' ? <Text style={styles.text}>Rent After 6 Month</Text> : <></>}
                            {DATA[0].history.rentmethod == '12' ? <Text style={styles.text}>Rent After 1 year</Text> : <></>}
                        </View>
                        {/* <View style={styles.dview}>
                            <Text style={styles.tittle}>Current Status</Text>
                            <Text style={styles.text}>{DATA[0].history.status==1?'Left':"Living"}</Text>
                        </View> */}
                    </View>
                    <View
                        style={{ paddingHorizontal: '3%' }}
                    >
                        <View
                            style={{
                                backgroundColor: 'white', flexDirection: 'row',
                                paddingHorizontal: '5%', paddingVertical: '2%', elevation: 5,
                                marginVertical: '1%', borderRadius: 10, justifyContent: 'center'
                            }}
                        >
                            <View style={{ flex: 2 }}>
                                <Text>Month / Year</Text>
                            </View>

                            <View style={{ flex: 1 }}>
                                <Text
                                >Status</Text>
                            </View>

                            <View style={{ flex: 2 }}>
                                <Text>Rent</Text>
                            </View>
                        </View>
                    </View>
                    <View
                    >
                        <FlatList
                            data={DATA}
                            showsVerticalScrollIndicator={false}
                            renderItem={renderItem}
                            keyExtractor={item => item.rent.id}
                        />
                    </View>


                </ScrollView>
            </SafeAreaView>)
            :
            (
                <View>
            <CustActivity loder={loder} />
            <Text>NOT found</Text>
            </View>
            )
    )
}

const BDORO = ({ navigation, route }) => {
    let tid = route.params.tid
    console.log('idddd',tid);


    const renderItem = ({ item }) => {
        let d = item.history.rentdate
        item = item.rent

        return (
            <View
                style={{ paddingHorizontal: '3%' }}
            >
                <View
                    style={{
                        backgroundColor: 'white', flexDirection: 'row',
                        paddingHorizontal: '5%', paddingVertical: '2%', elevation: 5,
                        marginVertical: '1%', borderRadius: 10, justifyContent: 'center'
                    }}
                >
                    <View style={{ flex: 2 }}>
                        <Text>{item.month} / {item.year}</Text>
                    </View>

                    <View style={{ flex: 1 }}>
                        {
                            item.status == 1 ?
                                <Text
                                    style={{ color: 'blue' }}
                                >Paid</Text> :
                                <Text
                                    style={item.status == null ? { color: 'red' } : { color: 'blue' }}
                                >{item.status == null && d < date ? 'unpaid' : 'due'}</Text>}
                    </View>

                    <View style={{ flex: 2 }}>
                        <Text>{item.rentamount}</Text>
                    </View>

                    <View style={[item.status == null ? { backgroundColor: global.color, } : { backgroundColor: 'silver', },
                    { flex: 1, alignItems: 'center', borderRadius: 20 }]}>
                        <TouchableOpacity
                            disabled={item.status == null ? false : true}
                            onPress={()=>{
                                setStatusPaid(item.id)
                            }}
                        >
                            <Text style={{ color: 'white', padding: "5%" }}>Paid</Text>
                        </TouchableOpacity>
                    </View>


                </View>
            </View>

        )
    }

    const [DATA, setData] = useState();
    const [loder, setloader] = useState(false);
    const [rentamount, setrentamount] = useState();

    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();
    var date = new Date().getDate();
    useEffect(() => {
        getrentdetail()
    }, [])

    useEffect(() => {
        if (DATA!=null) {
            if (date >= 1 && (month > DATA[0].rent.month || year > DATA[0].rent.year) && DATA[0].history.status == 0) {
                if ((DATA[0].rent.month + DATA[0].history.rentmethod % 12) == month) {
                    if ((DATA[0].rent.month*DATA[0].history.rentmethod) % 12 == 0) { setrentamount(DATA[0].history.rentmethod*(DATA[0].property.rent+( DATA[0].property.rent * (DATA[0].property.increment / 100)))) }
                    genrateRent()
                }
            }
        }
    }, [])

    async function getrentdetail() {
        try {
            setloader(true)
            let response = await fetch(global.dataapi + 'Tenant/getPaymentDetailofproperty?id=' + tid)
            let req = await response.json()
            setData(req)
            console.log('inner data', req);
            setloader(false)
        }
        catch (e) { alert(e); setloader(false) }
    }
    async function genrateRent() {
        try {
            setloader(true)
            fetch(global.dataapi + "Tenant/setRentofProperty",
                {
                    method: 'POST',
                    body: JSON.stringify({
                        tenantid: DATA[0].history.id,
                        month: month,
                        year: year,
                        rentamount: rentamount
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
            let req = await response.json()
            setData(req)
            console.log('inner data', req);
            setloader(false)
        }
        catch (e) { alert(e); setloader(false) }
    }
    const setStatusPaid = async (id) => {
        try {
            await fetch(global.dataapi + 'Tenant/setRentPaid',
                {
                    method: 'POST',
                    body: JSON.stringify({
                        id: id,
                    }
                    ),
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json'
                    }
                }
            ).then(response => getrentdetail())
        }
        catch (error) {
            alert("Post submission failed");
        }
    }
    return (
        DATA!=null ?
            <SafeAreaView
                style={{ flex: 1, backgroundColor: 'white' }}
            >
                <ScrollView>
                    <View
                        style={{ backgroundColor: 'white', padding: '5%' }}
                    >
                        <Text style={{ fontSize: 25, alignSelf: 'center', color: global.color, fontWeight: 'bold' }}>Monthly Rent Detail</Text>
                        <View style={styles.dview}>
                            <Text style={styles.tittle}>Property Name</Text>
                            <Text style={styles.text}>{DATA[0].property.propertyname}</Text>
                        </View>
                        <View style={styles.dview}>
                            <Text style={styles.tittle}>Tenent Name</Text>
                            <Text style={styles.text}>{DATA[0].user.name}</Text>
                        </View>
                        <View style={styles.dview}>
                            <Text style={styles.tittle}>Rent Due date :</Text>
                            <Text style={styles.text}>{DATA[0].history.rentdate}</Text>
                        </View>
                        <View style={styles.dview}>
                            <Text style={styles.tittle}>Rent Increment Yearly :</Text>
                            <Text style={styles.text}>{DATA[0].property.increment} %</Text>
                        </View>
                        <View style={styles.dview}>
                            <Text style={styles.tittle}>Join Base :</Text>
                            {DATA[0].history.rentmethod == '1' ? <Text style={styles.text}>Rent Monthly</Text> : <></>}
                            {DATA[0].history.rentmethod == '3' ? <Text style={styles.text}>Rent After 3 Month</Text> : <></>}
                            {DATA[0].history.rentmethod == '6' ? <Text style={styles.text}>Rent After 6 Month</Text> : <></>}
                            {DATA[0].history.rentmethod == '12' ? <Text style={styles.text}>Rent After 1 year</Text> : <></>}
                        </View>

                        {/* <View style={styles.dview}>
                            <Text style={styles.tittle}>Living Months :</Text>
                            <Text style={styles.text}>{DATA[0].months}</Text>
                        </View> */}


                    </View>
                    <View
                        style={{ paddingHorizontal: '3%' }}
                    >
                        <View
                            style={{
                                backgroundColor: 'white', flexDirection: 'row',
                                paddingHorizontal: '5%', paddingVertical: '2%', elevation: 5,
                                marginVertical: '1%', borderRadius: 10, justifyContent: 'center'
                            }}
                        >
                            <View style={{ flex: 2 }}>
                                <Text>Month / Year</Text>
                            </View>

                            <View style={{ flex: 1 }}>
                                <Text
                                >Status</Text>
                            </View>

                            <View style={{ flex: 2 }}>
                                <Text>Rent</Text>
                            </View>

                            <View style={[{ flex: 1, alignItems: 'center', borderRadius: 20 }]}>
                            </View>


                        </View>
                    </View>
                    <View
                    >
                        <FlatList
                            data={DATA}
                            showsVerticalScrollIndicator={false}
                            renderItem={renderItem}
                            keyExtractor={item => item.rent.id}
                        />
                    </View>


                </ScrollView>
            </SafeAreaView>
            :
            <CustActivity loder={loder} />
    )
}

const RDOAP = ({ navigation }) => {
    const renderItem = ({ item }) => {
        return (
            <View
                style={{ paddingHorizontal: '3%' }}
            >
                <TouchableOpacity
                    style={{
                        backgroundColor: 'white', flexDirection: 'row',
                        padding: '4%', elevation: 5,
                        marginVertical: '1%', borderRadius: 10, justifyContent: 'center'
                    }}
                    onPress={() => {
                        navigation.navigate('BDORO', { tid: item.tenant.id })
                    }}
                >
                    <View style={{ flex: 2, justifyContent: 'center' }}>
                        <Text style={{ fontSize: 12, fontWeight: 'bold' }}>{item.pdata.propertyname}</Text>
                        <Text style={{ fontSize: 12, fontWeight: 'bold' }}>{item.pdata.subarea}</Text>
                        <Text style={{ fontSize: 12, fontWeight: 'bold' }}>{item.pdata.city}</Text>
                    </View>
                    {/* <View style={{ flex: 1, justifyContent: 'center' }}>
                        <Text style={{ fontSize: 12 }}>{item.Month} {item.year}</Text>
                    </View> */}

                    <View style={{ flex: 1, justifyContent: 'center' }}>
                        <Text
                            style={{ color: 'red', fontSize: 12 }}
                        >unpaid</Text>
                    </View>

                    {/* <View style={{ flex: 1, justifyContent: 'center' }}>
                        <Text style={{ fontSize: 12 }}>{item.Rent}</Text>
                    </View> */}

                    <View
                        // style={[item.Status == 'unpaid' ? { backgroundColor: global.color, justifyContent: 'center' } : { backgroundColor: 'silver', },
                        // { flex: 1, alignItems: 'center', borderRadius: 20 }]}
                        style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
                    >
                        {/* <TouchableOpacity
                            disabled={item.Status == 'unpaid' ? false : true}
                        >
                            <Text style={{ color: 'white', padding: "1%", fontSize: 12 }}>Paid</Text>
                        </TouchableOpacity> */}
                        <Text style={{ fontSize: 12 }}>{item.unpaidmonths}</Text>

                    </View>


                </TouchableOpacity>
            </View>

        )
    }

    const [DATA, setData] = useState();
    const [loder, setloader] = useState(false);
    useEffect(() => {
        getrentdetail()
    }, [])
    async function getrentdetail() {
        try {
            setloader(true)
            let response = await fetch(global.dataapi + 'Tenant/getunpaidDetailofRent?id=' + global.user.id)
            let req = await response.json()
            setData(req)
            console.log('inner data', req);
            setloader(false)
        }
        catch (e) { alert(e); setloader(false) }
    }
    return (
        DATA ?
            <SafeAreaView
                style={{ flex: 1, backgroundColor: 'white' }}
            >
                <ScrollView>
                    <View
                        style={{ backgroundColor: 'white', padding: '5%' }}
                    >
                        <Text style={{
                            fontSize: 20, justifyContent: 'center',
                            alignSelf: 'center', padding: '2%', color: 'black'
                        }}>
                            Rent Detail
                        </Text>
                        <Text
                            style={{ fontSize: 18, justifyContent: 'center', padding: '1%' }}
                        >
                            All Properties Rent Detail's
                        </Text>

                    </View>
                    <View
                    >
                        <View
                            style={{ paddingHorizontal: '3%' }}
                        >
                            <View
                                style={{
                                    backgroundColor: 'white', flexDirection: 'row',
                                    paddingHorizontal: '5%', paddingVertical: '2%', elevation: 5,
                                    marginVertical: '1%', borderRadius: 10, justifyContent: 'center'
                                }}
                            >
                                <View style={{ flex: 2, justifyContent: 'center' }}>
                                    <Text style={{ fontSize: 12, fontWeight: 'bold' }}>Name</Text>
                                </View>
                                <View style={{ flex: 1, justifyContent: 'center' }}>
                                    <Text
                                        style={{ fontSize: 12, fontWeight: 'bold' }}
                                    >Status</Text>
                                </View>

                                {/* <View style={{ flex: 1, justifyContent: 'center' }}>
                                <Text style={{ fontSize: 12, fontWeight: 'bold' }}>Rent</Text>
                            </View> */}

                                <View style={{ flex: 1, justifyContent: 'center' }}>
                                    <Text style={{ fontSize: 12, fontWeight: 'bold' }}>Panding Month's</Text>
                                </View>


                            </View>
                        </View>
                        <FlatList
                            data={DATA}
                            showsVerticalScrollIndicator={false}
                            renderItem={renderItem}
                            keyExtractor={item => item.pdata.id}
                        />
                    </View>


                </ScrollView>
            </SafeAreaView>
            :
            <CustActivity loder={loder} />
    )
}
export { BDORO, BDORT, RDOAP };
const styles = StyleSheet.create({
    dview: { flexDirection: 'row', padding: '1%', paddingLeft: '3%' },
    tittle: { fontSize: 15, fontWeight: 'bold', flex: 1 },
    text: { fontSize: 15, flex: 1 }
})