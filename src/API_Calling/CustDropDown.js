import React, { useEffect, useState, useRef } from "react";
import { TouchableOpacity } from "react-native";
import { FlatList,Text, View } from "react-native";
import { Searchbar } from "react-native-paper";
import RBSheet from "react-native-raw-bottom-sheet";

global.color = '#2859a6';

function CustDD(props) {

    const refRBSheet = useRef();
    //console.log(props);
    useEffect(() => {
        if (props.open) {
            refRBSheet.current.open()
            props.setopen(false)
        }
    }, [props.open])
    const [searchcity, setsearchcity] = useState('')
    const data = props.data
    const [select, setselect] = useState();

    return (

        <RBSheet
            ref={refRBSheet}
            height={500}
            closeOnDragDown={true}
            closeOnPressMask={true}
            animationType={'fade'}
            closeOnPressBack={true}
            customStyles={{
                wrapper: {
                    backgroundColor: "transparent",

                },
                draggableIcon: {
                    backgroundColor: "#000",
                    borderRadius: 20,
                    
                },
                container: {
                    borderRadius: 30,
                    borderColor: 'grey',
                    borderWidth: 2,
                    backfaceVisibility:'hidden'
                }
            }}>
            <View
                style={{ paddingHorizontal: '5%', }}
            >
                <Searchbar
                    placeholder="Search By City"
                    value={searchcity}
                    theme={{ colors: { primary: global.color } }}
                    fontSize={12}
                    style={{ borderRadius: 10,borderColor:'grey',borderWidth:1 }}
                    onChangeText={text => setsearchcity(text)}
                />
            </View>
            <FlatList
                data={data}
                showsVerticalScrollIndicator={false}
                renderItem={(d) => {
                    if (d.item.value.toLowerCase().includes(searchcity.toLowerCase()))
                        return (

                            <TouchableOpacity
                                onPress={() => {
                                    props.setselect(d.item.value);
                                    setselect(d.item.value)
                                    refRBSheet.current.close();
                                }}
                                style={{ padding: "2%", paddingHorizontal: '5%' }}
                            >
                                <Text
                                    style={[{
                                        fontSize: 15, backgroundColor: 'white',
                                        elevation: 2, padding: '2%', borderRadius: 12,
                                        textAlign: 'center',
                                        
                                    },
                                    d.item.value == select ? { color: global.color } : {}]
                                    }
                                >{d.item.value}</Text>
                            </TouchableOpacity>)
                }}
                keyExtractor={d => d.value}
            />
        </RBSheet>
    )
}
export default CustDD;