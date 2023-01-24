import React from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Stars from 'react-native-stars';

export default function BDetail(props) {
    const data = props.data
    return (
        <View style={{ padding: '4%' }}>
            <View style={{ flexDirection: 'row', paddingBottom: '2%' }}>
                <View style={{ flex: 1 }}>
                    <Text style={{ fontSize: 22, fontWeight: 'bold', color: 'black', }}>{data.propertyname}</Text>
                    <Text style={{ fontSize: 12, fontWeight: 'bold', color: global.color, }}>( {data.propertytype} )</Text>
                    <Text style={{ fontSize: 12, fontWeight: 'bold', color: global.color, }}> Portion : ({data.floor})</Text>
                </View>
                <View
                    style={styles.ratingview}
                >
                    <Text style={{ fontSize: 14, fontWeight: 'bold', color: global.color, }}>Rating</Text>
                    <Stars
                        default={4}
                        count={5}
                        half={true}
                        disabled={true}
                        starSize={50}
                        fullStar={<Icon name={'star'} style={styles.myStarStyle} />}
                        emptyStar={<Icon name={'star-o'} style={[styles.myStarStyle, styles.myEmptyStarStyle]} />}
                        halfStar={<Icon name={'star-half'} style={{
                            color: 'gold',
                            backgroundColor: 'transparent',
                            textShadowColor: 'black',
                            textShadowOffset: { width: 1, height: 1 },
                            textShadowRadius: 2,
                        }} />}
                    />
                </View>
                <View style={styles.mapviewbutton}>
                    <TouchableOpacity
                        onPress={() => { global.naviof.navigate('Map') }}>
                        <Text style={{
                            color: 'white',
                            fontSize: 10,

                        }}>ON MAPP</Text>
                    </TouchableOpacity>
                </View>
            </View>
            {
                //down from location
            }
            <View>

                <Text style={styles.heading}>Location:</Text>
                <View style={{ marginLeft: '5%' }}>

                    <Text style={styles.text}>
                        <Icon name="map-marker" size={20} color={global.color} />  {data.subarea}</Text>
                    <Text style={[styles.text, { fontWeight: 'bold' }]}>{data.city}</Text>
                </View>

                <Text style={styles.heading}>Basic Detail:</Text>
                {data.subtype == 'Residential' ? (
                    <View style={{ flexDirection: 'row', flex: 1, padding: '2%' }}>
                        <View style={styles.Iconview}>
                            <Icon name="bed" size={18} color={global.color} />
                            <Text style={styles.text}>Room : {data.roomnumber}</Text>

                        </View>
                        <View style={styles.Iconview}>
                            <Icon name="shower" size={18} color={global.color} />
                            <Text style={styles.text}>Fresh Room : {data.bathnumber}</Text>

                        </View>
                        <View style={styles.Iconview}>
                            <Icon name="crop" size={18} color={global.color} />
                            <Text style={styles.text}>{data.measuredarea} {data.measuredunit}</Text>
                        </View>
                    </View>
                ) : (

                    <View style={styles.Iconview}>
                        <Icon name="crop" size={20} color={global.color} />
                        <Text style={styles.text}>Area({data.measuredarea}Sqft)</Text>
                    </View>
                )}
                <View
                style={{flexDirection:'row'}}
                >
                    <View>
                        <Text style={styles.heading}>Rent:</Text>
                        <Text style={{ fontSize: 18, fontWeight: 'bold', alignSelf: 'center' }}>Price RS: {data.rent}</Text>
                    </View>

                    <View
                    style={{paddingLeft:'10%'}}
                    >
                        <Text style={styles.heading}>Yearly Increment</Text>
                        <Text style={{ fontSize: 15, alignSelf: 'center',color:'black' }}>{data.increment} % </Text>
                    </View>
                </View>
                <Text style={styles.heading}>Features:</Text>
                <View style={{ padding: '3%' }}>
                    {
                        data.parking == 1 ? <Icon name="circle" size={15} style={{ padding: '1%' }}> Parking</Icon> : <></>
                    }
                    {
                        data.elevator == 1 ? <Icon name="circle" size={15} style={{ padding: '1%' }}> Elevator</Icon> : <></>
                    }
                    {
                        data.electricmeter == 1 ? <Icon name="circle" size={15} style={{ padding: '1%' }}> Electric Meter</Icon> : <></>
                    }
                    {
                        data.gassmeter == 1 ? <Icon name="circle" size={15} style={{ padding: '1%' }}> Gass Conection</Icon> : <></>
                    }
                    {
                        data.water == 1 ? <Icon name="circle" size={15} style={{ padding: '1%' }}> Water supply</Icon> : <></>
                    }
                    {
                        data.furnished == 1 ? <Icon name="circle" size={15} style={{ padding: '1%' }}> Furnished</Icon> : <></>
                    }






                </View>
                <Text style={styles.heading}>Description:</Text>
                <Text style={{ fontSize: 12, }} >{data.description}</Text>
            </View>
        </View>

    )
}
const styles = StyleSheet.create({
    myStarStyle: {
        color: 'gold',
        backgroundColor: 'transparent',
        textShadowColor: 'black',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 2,
    },
    myEmptyStarStyle: {
        color: 'white',
    },
    heading: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'black',
    },
    text: {
        fontSize: 15,
        color: 'black'
    },
    Iconview: {
        flex: 1,
        alignItems: 'center'
    },
    mapviewbutton: {
        alignContent: 'center',
        alignSelf: 'center',
        justifyContent: 'center',
        backgroundColor: global.color,
        borderColor: "#eee",
        borderRadius: 10,
        padding: '3%',
    },
    ratingview: {
        flex: 1, alignContent: 'center', alignItems: 'center', alignSelf: 'center', justifyContent: 'center'
    }
});

