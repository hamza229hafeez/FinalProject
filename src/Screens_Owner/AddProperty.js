import React, { useState } from 'react';
import {
    Alert,
    SafeAreaView,
    Text,
    TouchableOpacity,
    View,
    LogBox
} from 'react-native';
import {
    Button,
    Checkbox,
    Provider, TextInput

} from "react-native-paper";
import { RadioButton } from 'react-native-paper';
import { MultiPickImage } from "./Image";
import { ScrollView } from 'react-native-gesture-handler';
import CustActivity from '../Main/acvitity'
import { CityList, SubAreaList } from './Data';
import CCB from './CustomCheckBox';
import CustDD from '../API_Calling/CustDropDown'
import { StyleSheet } from 'react-native';
LogBox.ignoreLogs(['AddProperty'], ['CCB']);

global.color = '#2859a6';

const AddProperty = ({ navigation, route }) => {
    React.useEffect(() => {
        if (route.params) {
            setlongitude(route.params.longitude);
            setlatitude(route.params.latitude);
        }
    }, [route.params]);

    const [loder, setloder] = useState(false)
    let data;
    async function setdataoofProperty() {
        try {
            setloder(true)
            let property = {
                SubArea: subsector,
                City: city,
                Rent: price,
                SubType: propertytype,
                PropertyType: subtype,
                Description: description,
                PropertyName: pname,
                Ownerid: global.user.id,
                Latitude: latitude,
                Longitude: longitude,
                BathNumber: bath,
                RoomNumber: room,
                MeasuredArea: size,
                MeasuredUnit: unit,
                Floor: floor,
                Elevator: elevator,
                Furnished: furnished,
                ElectricMeter: electricity,
                GassMeter: gass,
                Water: water,
                Parking: parking,
                incerement:incerement
            }
            let response = await fetch(global.dataapi + 'Property/setProperty', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(property)
            })
            data = await response.json()
            console.log(data);
            data == 0 ? (alert("Already Exist"), setloder(false)) : (UpdatePropertyPicture(data))
        }
        catch (e) { alert(e); setloder(false) }
    }
    const UpdatePropertyPicture = async (id) => {
        try {
            const data = new FormData();
            if (image.length > 0) {
                for (var i = 0; i < image.length; i++) {
                    const photo = image[i];
                    data.append('images', {
                        name: photo.fileName,
                        type: photo.type,
                        uri: photo.uri,
                    });
                }
            }
            await fetch(global.dataapi + 'Property/UploadFile?id=' + id,
                {
                    method: 'POST',
                    body: data,
                    headers: {
                        'Content-Type': 'multipart/form-data;',
                    }
                }
            ).then(response => response.json())
                .then(d => {
                    console.log('imagessssssss', d);
                    setloder(false)
                    global.naviof.goBack()
                })
        }
        catch (error) {
            alert("Post submission failed");
            setloder(false)
        }
    }

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
            value: "Appartment",
        },
        {
            label: "Flat",
            value: "Flat",
        },
        {
            label: "House",
            value: "House",
        },
    ]);
    const [subtypeList2, setsubtypelist2] = useState([
        {
            label: "Office",
            value: "Office",
        },
        {
            label: "Factory",
            value: "Factory",
        },
        {
            label: "Shop",
            value: "Shop",
        },
    ]);
    const [DDunit, setDDunit] = useState(false);
    const [DDfloor, setDDfloor] = useState(false);

    const [size, setsize] = useState("10")
    const [pname, setpname] = useState("Malik House")
    const [image, setimage] = useState([])
    const [price, setprice] = useState("50000")
    const [incerement, setincerement] = useState("5")
    const [propertytype, setpropertytype] = useState("Residential")
    const [description, setdescription] = useState("New House...good for live")
    const [room, setroom] = useState("8")
    const [bath, setbath] = useState("3")
    const [elevator, setelevator] = useState(0);
    const [furnished, setfurnished] = useState(0);
    const [electricity, setelectricity] = useState(0);
    const [gass, setgass] = useState(0);
    const [water, setwater] = useState(0);
    const [parking, setparking] = useState(0);
    const [floor, setfloor] = useState();
    const [latitude, setlatitude] = useState(false);
    const [longitude, setlongitude] = useState(false);
    const [unit, setunit] = useState("MARLA");

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
                        <Text style={styles.heading}>Name</Text>
                        <TextInput
                            label={<Text style={styles.inerview}>Property Name</Text>}
                            value={pname}
                            activeUnderlineColor={global.color}
                            onChangeText={text => setpname(text)}
                        />
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
                            <View
                                style={{ flex: 1, marginLeft: 5 }}
                            >
                                <Text style={styles.heading}>Select Floor</Text>
                                <TouchableOpacity
                                    style={styles.ddview}
                                    onPress={() => {
                                        setDDfloor(true)
                                    }}
                                >
                                    <Text style={[styles.inerview, { height: 50, textAlignVertical: 'center' }]}>{floor}</Text>
                                </TouchableOpacity>
                                <CustDD
                                    open={DDfloor}
                                    setselect={setfloor}
                                    setopen={setDDfloor}
                                    data={[
                                        {
                                            label: "Basment",
                                            value: "Basment",
                                        },
                                        {
                                            label: "Ground",
                                            value: "Ground",
                                        },
                                        {
                                            label: "1st",
                                            value: "1st",
                                        },
                                        {
                                            label: "2nd",
                                            value: "2nd",
                                        },
                                        {
                                            label: "3rd",
                                            value: "3rd",
                                        },
                                    ]}
                                />
                            </View>
                        </View>
                        <View
                        style={{flexDirection:'row'}}
                        >
                            <View
                            style={{flex:1,padding:'2%'}}
                            >
                                <Text style={styles.heading}>Price</Text>
                                <TextInput
                                    label={<Text style={styles.inerview}>Price in (PKR)</Text>}
                                    value={price}
                                    keyboardType='numeric'
                                    activeUnderlineColor={global.color}
                                    onChangeText={text => setprice(text)}
                                />
                            </View>

                            <View
                            style={{flex:1,padding:'2%'}}
                            >
                                <Text style={styles.heading}>Increment Yearly</Text>
                                <TextInput
                                    label={<Text style={styles.inerview}>Enter in %</Text>}
                                    value={incerement}
                                    keyboardType='numeric'
                                    activeUnderlineColor={global.color}
                                    onChangeText={text => setincerement(text)}
                                />
                            </View>
                        </View>
                        {propertytype == "Residential" ? (
                            <View style={{ flexDirection: 'row' }}>
                                <View style={{ flexDirection: 'column',flex:1,padding:'2%' }}>
                                    <Text style={styles.heading}>Rooms?</Text>
                                    <TextInput
                                        label={<Text style={styles.inerview}>Number of room</Text>}
                                        value={room}
                                        keyboardType='numeric'
                                        activeUnderlineColor={global.color}
                                        onChangeText={text => setroom(text)}
                                    /></View>
                                <View style={{ flexDirection: 'column', flex:1,padding:'2%' }}>
                                    <Text style={styles.heading}>Fresh Room?</Text>
                                    <TextInput
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
                        <Text style={{ fontSize: 14, fontWeight: 'bold', margin: '2%', color: 'black' }}>Check Features Exist In Property</Text>
                        <CCB t={'Elevator'} setValue={setelevator} />
                        <CCB t={'Electric Meter'} setValue={setelectricity} />
                        <CCB t={'Furnished'} setValue={setfurnished} />
                        <CCB t={'Gass Meter'} setValue={setgass} />
                        <CCB t={'Water Conection'} setValue={setwater} />
                        <CCB t={'Parking Area'} setValue={setparking} />
                        {
                            //image
                        }

                        <Text style={styles.heading}>Upload Images Of Your Property</Text>
                        <MultiPickImage setimage={setimage} />
                        {
                            //map
                        }
                        <View>
                            <Text style={styles.heading}>Location Of Your Property</Text>
                            <TouchableOpacity
                                style={{ flex: 1, alignContent: 'center', alignSelf: 'center', justifyContent: 'center' }}
                                onPress={() => {
                                    navigation.navigate('AddMap')
                                }
                                }
                            >
                                <View style={{
                                    backgroundColor: global.color,
                                    borderColor: "#eee",
                                    borderRadius: 10,
                                    alignItems: 'center',
                                    justifyContent: 'center'

                                }}>
                                    <Text style={{
                                        color: 'white',
                                        fontSize: 10,
                                        alignSelf: 'center',
                                        textAlignVertical: 'center',
                                        textAlign: 'center',
                                        padding: 10,
                                    }}>ON MAPP</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                        {
                            //description
                        }
                        <Text style={styles.heading}>Description</Text>
                        <TextInput
                            label={<Text style={styles.inerview}>Description About Your Property</Text>}
                            value={description}
                            multiline={true}
                            activeUnderlineColor={global.color}
                            onChangeText={text => setdescription(text)}
                        />
                        {
                            //saved data button
                        }
                        <Button mode="contained"
                            color={global.color}
                            style={{
                                width: "50%", alignSelf: 'center', elevation: 2, margin: '3%'

                                , borderRadius: 8, justifyContent: "center"
                            }}
                            onPress={() => {
                                (city != '' && subsector != '' && subtype != '' && pname != '' && size != '' && price != '' && image != '') ?
                                    (setdataoofProperty()) :
                                    (alert("Please Fill all feilds"))
                            }}>
                            Add
                        </Button>
                    </View>

                </ScrollView>

                <CustActivity loder={loder} />

            </SafeAreaView>
        </Provider>
    )
}
export default AddProperty;

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