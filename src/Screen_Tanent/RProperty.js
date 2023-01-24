// import React, { useState, useEffect } from 'react';
// import {
//     SafeAreaView,
//     Text,
//     Image,
//     FlatList,
//     TouchableOpacity,
//     View,
//     LogBox,
// } from 'react-native';
// import Icon from 'react-native-vector-icons/FontAwesome';
// import RequestDetail from './RequstDetail'
// import RentalProperty from './RentalProperty'

// LogBox.ignoreLogs(['VirtualizedLists should never be nested']);

// const RProperty = ({ navigation, route }) => {

//     const [selected, setselected] = useState(1)
//     return (
//         <SafeAreaView style={{ flex: 1,paddingTop:'1%',paddingRight:'1%',paddingLeft:'1%', }}>
//             <View style={{
//                 flexDirection: 'row', backgroundColor: 'white', width: '96%', alignSelf: 'center',
//                 elevation: 5, borderRadius: 7, marginTop: 5, height: 40,margin:5
//             }}>
//                 <TouchableOpacity
//                     style={selected == 1 ? {
//                         alignSelf: 'center',
//                         flex: 1, borderBottomWidth: 2,
//                         borderColor: global.color,
//                         alignItems: 'center',
//                         justifyContent: 'center',
//                         borderRadius: 20,
//                         height: 40
//                     } : {
//                         alignSelf: 'center',
//                         flex: 1,
//                         alignItems: 'center',
//                         justifyContent: 'center'
//                         ,height: 40
//                     }}
//                     onPress={() => { setselected(1) }}>
//                     <Text style={selected == 1 ? { fontWeight: 'bold', fontSize: 18, color: global.color } : { fontSize: 15 }}>
//                         <Icon name="th-large" size={selected == 1 ? 15 : 12} /> Rent Property</Text>
//                 </TouchableOpacity>
//                 <TouchableOpacity
//                     style={selected == 2 ? {
//                         alignSelf: 'center',
//                         flex: 1, borderBottomWidth: 2,
//                         borderColor: global.color,
//                         alignItems: 'center',
//                         justifyContent: 'center',
//                         borderRadius: 20,
//                         height: 40
//                     } : {
//                         alignSelf: 'center',
//                         flex: 1,
//                         alignItems: 'center',
//                         justifyContent: 'center',
//                         height: 40
//                     }}
//                     onPress={() => { setselected(2) }}>
//                     <Text style={selected == 2 ? { fontWeight: 'bold', fontSize: 18, color: global.color } : { fontSize: 15 }}>
//                         <Icon name="th-large" size={selected == 2 ? 15 : 12} /> Request Detail</Text>
//                 </TouchableOpacity>
//             </View>
//             <View style={{ flex: 1}}>
//                 {selected == 1 ? (
//                     <RentalProperty />
//                 ) : (
//                     <RequestDetail />
//                 )}
//             </View>
//         </SafeAreaView>
//     )

// }


// export default RProperty;