import React, { useState } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    Text,
    View,
    LogBox
} from 'react-native';
import {
    Button,
    Provider, TextInput

} from "react-native-paper";
import { RadioButton } from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';
import { CityList, SubAreaList } from '../Screens_Owner/Data';
import { TouchableOpacity } from 'react-native';
import CustDD from '../API_Calling/CustDropDown'
import CCB from '../Screens_Owner/CustomCheckBox';
import SearchScreen from './SearchPropertyData';
LogBox.ignoreLogs(['VirtualizedLists should never be nested']);


const Search = ({ navigation }) => {
    const [DDcity, setDDcity] = useState(false);
    const [city, setcity] = useState('');
    const [cityList, setcitylist] = useState(CityList);

    const [DDsubsector, setDDsubsector] = useState(false);
    const [subsector, setsubsector] = useState();
    const [subsectorList, setsubsectorlist] = useState([]);

    const [DDsubtype, setDDsubtype] = useState(false);
    const [subtype, setsubtype] = useState();
    const [subtypeList1, setsubtypelist1] = useState([
        {
            label: "Appartment",
            value: "appartment",
        },
        {
            label: "Flat",
            value: "flat",
        },
        {
            label: "House",
            value: "house",
        },
    ]);
    const [subtypeList2, setsubtypelist2] = useState([
        {
            label: "Office",
            value: "office",
        },
        {
            label: "Factory",
            value: "factory",
        },
        {
            label: "Shop",
            value: "shop",
        },
    ]);
    const [size, setsize] = useState()
    const [unit, setunit] = useState();
    const [DDunit, setDDunit] = useState(false);
    const [room, setroom] = useState()
    const [bath, setbath] = useState()
    const [elevator, setelevator] = useState();
    const [furnished, setfurnished] = useState();
    const [electricity, setelectricity] = useState();
    const [gass, setgass] = useState();
    const [water, setwater] = useState();
    const [parking, setparking] = useState();
    const [price, setprice] = useState()
    const [propertytype, setpropertytype] = useState()
     
    const [srch,setsrch]=useState()
    // let property = {
    //     subarea: "" + subsector + "",
    //     city: "" + city + "",
    //     rent: "" + price + "",
    //     subtype: "" + propertytype + "",
    //     propertytype: "" + subtype + "",
    //     measuredarea: "" + size + "",
    // }

    let property= {
        SubArea: subsector,
        City: city,
        Rent: price,
        SubType: propertytype,
        PropertyType: subtype,
        BathNumber: bath,
        RoomNumber: room,
        MeasuredArea: size,
        MeasuredUnit: unit,
        Elevator: elevator,
        Furnished: furnished,
        ElectricMeter: electricity,
        GassMeter: gass,
        Water: water,
        Parking: parking,
        ownerid:global.user.id
    }
    function CitySelected() {
        city != '' ? setsubsectorlist(SubAreaList(city)) : (alert('Select city'))
    }
    return (
        <Provider>
            <SafeAreaView style={{ backgroundColor: 'white', padding: '2%', flex: 1 }}>

                <View style={{ margin: '3%' }} >
                    <Text style={{ fontSize: 15, fontWeight: 'bold', color: 'black' }}>Type of Property</Text>
                    <RadioButton.Group onValueChange={newValue => { setpropertytype(newValue); setsubtype('') }} value={propertytype}>
                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ flexDirection: 'row', flex: 1 }}>
                                <RadioButton color={global.color} value="Residential" />
                                <Text style={{ fontSize: 12, flex: 1, margin: '4%' }}>Residential</Text>
                            </View>
                            <View style={{ flexDirection: 'row', flex: 1 }}>
                                <RadioButton value="Commercial" color={global.color} />
                                <Text style={{ fontSize: 12, flex: 1, margin: '4%' }}>Commercial</Text>
                            </View>
                        </View>
                    </RadioButton.Group>
                </View>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    style={{ backgroundColor: 'white', padding: '1%', paddingHorizontal: '5%' }}>


                    <View >
                        {
                            //city
                        }
                        <View>
                            <Text style={styles.heading}>Where is your Place Loacated?  (city)</Text>
                            <TouchableOpacity
                                style={styles.ddview}
                                onPress={() => {
                                    setDDcity(true)
                                    setsubsector('')
                                }}
                            >
                                <Text style={styles.inerview}>{city}</Text>
                            </TouchableOpacity>
                            <CustDD
                                open={DDcity}
                                setselect={setcity}
                                setopen={setDDcity}
                                data={cityList}
                            />
                        </View>
                        <View>
                            <Text style={styles.heading}>Address  (Select Sub-Sector)</Text>
                            <TouchableOpacity
                                style={styles.ddview}
                                onPress={() => {
                                    CitySelected();
                                    if (city) { setDDsubsector(true) }

                                }}
                            >
                                <Text style={styles.inerview}>{subsector}</Text>
                            </TouchableOpacity>
                            <CustDD
                                open={DDsubsector}
                                setselect={setsubsector}
                                setopen={setDDsubsector}
                                data={subsectorList}
                            />
                        </View>
                        <View>
                            <Text style={styles.heading}>Property Type  (Select Sub-Type)</Text>
                            <TouchableOpacity
                                style={styles.ddview}
                                onPress={() => {
                                    setDDsubtype(true)
                                }}
                            >
                                <Text style={styles.inerview}>{subtype}</Text>
                            </TouchableOpacity>
                            <CustDD
                                open={DDsubtype}
                                setselect={setsubtype}
                                setopen={setDDsubtype}
                                data={
                                    propertytype == "Residential" ? subtypeList1 : subtypeList2
                                }
                            />
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'center', paddingVertical: '2%' }}>
                            <View style={{ flex: 1, marginHorizontal: 5, alignSelf: 'center' }}>
                                <Text style={styles.heading}>Area</Text>
                                <TextInput
                                    label="Enter Size"
                                    value={size}
                                    keyboardType='numeric'
                                    activeUnderlineColor={global.color}
                                    onChangeText={text => setsize(text)}
                                />
                            </View>
                            <View
                                style={{ flex: 1 }}
                            >
                                <Text style={styles.heading}>Select Unit</Text>
                                <TouchableOpacity
                                    style={styles.ddview}
                                    onPress={() => {
                                        setDDunit(true)
                                    }}
                                >
                                    <Text style={[styles.inerview, { height: 50, textAlignVertical: 'center' }]}>{unit}</Text>
                                </TouchableOpacity>
                                <CustDD
                                    open={DDunit}
                                    setselect={setunit}
                                    setopen={setDDunit}
                                    data={[
                                        {
                                            label: "FT2",
                                            value: "FT2",
                                        },
                                        {
                                            label: "YD2",
                                            value: "YD2",
                                        },
                                        {
                                            label: "M2",
                                            value: "M2",
                                        },
                                        {
                                            label: "KANAL",
                                            value: "KANAL",
                                        },
                                        {
                                            label: "MARLA",
                                            value: "MARLA",
                                        },
                                    ]}
                                />
                            </View>

                        </View>
                        <Text style={styles.heading}>Maximum Price</Text>
                        <TextInput
                            label={<Text style={styles.inerview}>Price in (PKR)</Text>}
                            value={price}
                            keyboardType='numeric'
                            activeUnderlineColor={global.color}
                            onChangeText={text => setprice(text)}
                        />
                        {/* <Text style={styles.heading}>Minimum Price</Text>
                        <TextInput
                            label={<Text style={styles.inerview}>Price in (PKR)</Text>}
                            value={price}
                            keyboardType='numeric'
                            activeUnderlineColor={global.color}
                            onChangeText={text => setprice(text)}
                        /> */}
                        {propertytype == "Residential" ? (
                            <View style={{ flexDirection: 'row', padding: '5%' }}>
                                <View style={{ flexDirection: 'column', width: "50%" }}>
                                    <Text style={styles.heading}>Rooms?</Text>
                                    <TextInput
                                        style={{ width: "80%", }}
                                        label={<Text style={styles.inerview}>Number of room</Text>}
                                        value={room}
                                        keyboardType='numeric'
                                        activeUnderlineColor={global.color}
                                        onChangeText={text => setroom(text)}
                                    /></View>
                                <View style={{ flexDirection: 'column', width: "50%" }}>
                                    <Text style={styles.heading}>Fresh Room?</Text>
                                    <TextInput
                                        style={{ width: "80%", }}
                                        label={<Text style={styles.in}>Number</Text>}
                                        keyboardType='numeric'
                                        value={bath}
                                        activeUnderlineColor={global.color}
                                        onChangeText={text => setbath(text)}
                                    /></View>
                            </View>) : (<></>)

                        }
                        {
                            //features
                        }
                        <Text style={{ fontSize: 14, fontWeight: 'bold', margin: '2%', color: 'black' }}>Check Features In Property you want</Text>
                        <CCB t={'Elevator'} setValue={setelevator} />
                        <CCB t={'Electric Meter'} setValue={setelectricity} />
                        <CCB t={'Furnished'} setValue={setfurnished} />
                        <CCB t={'Gass Meter'} setValue={setgass} />
                        <CCB t={'Water Conection'} setValue={setwater} />
                        <CCB t={'Parking Area'} setValue={setparking} />
                    </View>
                    <Button mode="contained"
                        color={global.color}
                        style={{
                            width: "50%", alignSelf: 'center', elevation: 5, margin: '5%'

                            , borderRadius: 10, justifyContent: "center"
                        }}
                        onPress={() => {setsrch(true)}}>
                        Search
                    </Button>

                </ScrollView>
            </SafeAreaView>
            <View
            style={{flex:1}}
            >
                <SearchScreen property={property} ok={srch}/>
            </View>
        </Provider>
    )
}
export default Search;
const styles = StyleSheet.create({
    heading: { fontSize: 12, fontWeight: 'bold', margin: '2%', color: 'black' },
    ddview: {
        width: '100%'
        , padding: '5%', backgroundColor: '#E7E7E7',
        borderBottomWidth: 1,
        borderBottomColor: global.color
    },
    inerview: { fontSize: 12, fontWeight: 'bold', color: global.color }
});