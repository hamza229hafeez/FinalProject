// import React, { useState, useEffect } from 'react';
// import {
//     SafeAreaView,
//     Text,
//     Image,
//     FlatList,
//     TouchableOpacity,
//     View,
//     StyleSheet,
//     LogBox,
//     ImageBackground,
//     ScrollView
// } from 'react-native';
// import CustDD from '../API_Calling/CustDropDown'
// LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
// import { CityList } from '../Screens_Owner/Data';
// import HomeScreen from './HomeScreen';
// import PropertyDP from './PropertyDP';

// const DashBoard = ({ navigation }) => {


//     const [data, setData] = useState(
//         [
//             {
//                 propertyname: 'abc',
//                 propertytype: 'abc',
//                 subarea: 'abc',
//                 city: 'abc',
//                 rent: 'abc'
//             },
//             {
//                 propertyname: 'abc',
//                 propertytype: 'abc',
//                 subarea: 'abc',
//                 city: 'abc',
//                 rent: 'abc'
//             },
//             {
//                 propertyname: 'abc',
//                 propertytype: 'abc',
//                 subarea: 'abc',
//                 city: 'abc',
//                 rent: 'abc'
//             }
//         ]
//     )

//     const PropertyView = (props) => {
//         let item = props.item
//         console.log('pd', item);
//         return (
//             <View
//                 style={{ width: 300, padding: '1%', paddingVertical: '2%' }}
//             >
//                 <PropertyDP item={item} />
//             </View>
//         )
//     }

//     const CityView = (props) => {
//         const city = props.city
//         console.log('cilt', city);
//         return (
//             <TouchableOpacity
//             >
//                 <ImageBackground imageStyle={{ borderRadius: 10 }} source={require('../Pictures/main.jpeg')}>
//                     <View
//                         style={{
//                             height: 120,
//                             justifyContent: 'flex-end',
//                             opacity: .3,
//                             backgroundColor: 'black',
//                             padding: 20,
//                             borderTopRightRadius: 10,
//                             borderTopLeftRadius: 10

//                         }}>
//                     </View>
//                     <View
//                         style={{
//                             justifyContent: 'flex-end',
//                             opacity: .7,
//                             backgroundColor: 'black',
//                             paddingLeft: '5%',
//                             borderBottomRightRadius: 10,
//                             borderBottomLeftRadius: 10
//                         }}>
//                         <Text
//                             style={{ fontSize: 18, color: 'white', opacity: 1, fontWeight: 'bold', padding: '1%' }}
//                         >
//                             {city}
//                         </Text>
//                     </View>
//                 </ImageBackground>
//             </TouchableOpacity>
//         )
//     }

//     const [DDcity, setDDcity] = useState(false);
//     const [city, setcity] = useState('Rawalpindi');
//     const [cityList, setcitylist] = useState(CityList);



//     return (
//         <SafeAreaView
//             style={{ flex: 1, paddingTop: '2%', paddingLeft: '2%', paddingRight: '2%' }}
//         >
//             <View
//                 style={{
//                     flexDirection: 'row',
//                     backgroundColor: 'white',
//                     padding: '2%',
//                     borderRadius: 10,
//                     borderColor: 'grey',
//                     elevation: 5
//                 }}
//             >
//                 <TouchableOpacity
//                     style={{ width: '70%', borderRightWidth: 1, borderColor: 'grey' }}
//                     onPress={() => navigation.navigate('Search')}
//                 >
//                     <Text
//                         style={{ paddingLeft: '5%' }}
//                     >
//                         Search..!
//                     </Text>
//                 </TouchableOpacity>
//                 <TouchableOpacity
//                     onPress={() => {
//                         setDDcity(true)
//                     }}
//                 >
//                     <Text
//                         style={{ paddingLeft: '5%', color: global.color }}
//                     >
//                         {city}
//                     </Text>
//                 </TouchableOpacity>
//             </View>
//             <CustDD
//                 open={DDcity}
//                 setselect={setcity}
//                 setopen={setDDcity}
//                 data={cityList}
//             />

//             {/* <ScrollView
//                 showsVerticalScrollIndicator={false}
//                 style={{}}
//             >
//                 <View
//                     style={{ elevation: 3, backgroundColor: 'white', borderRadius: 10, padding: '3%', marginTop: '3%' }}
//                 >
//                     <Text
//                         style={{ padding: '2%', fontWeight: 'bold' }}
//                     >
//                         Top Rank Properties
//                     </Text>
//                     <ScrollView

//                         horizontal
//                         style={{ padding: '1%' }}
//                         showsHorizontalScrollIndicator={false}
//                     >
//                         {data.map(
//                             (d) => {
//                                 return (
//                                     <TouchableOpacity
//                                     style={{flex:1,width:'100%',height:'100%',
//                                     marginBottom:30}}
//                                     >
//                                         <PropertyView item={d} />
//                                     </TouchableOpacity>

//                                 )
//                             })
//                         }
//                     </ScrollView>
//                     <TouchableOpacity
//                         style={{ padding: '1%' }}
//                         onPress={() => navigation.navigate('CityData')}
//                     >
//                         <Text
//                             style={{ fontWeight: 'bold', alignSelf: 'center' }}
//                         >
//                             View All..!
//                         </Text>
//                     </TouchableOpacity>
//                 </View>
//                 <View
//                     style={{ elevation: 5, backgroundColor: 'white', borderRadius: 20, padding: '1%', marginTop: '3%' }}
//                 >
//                     <Text
//                         style={{ padding: '2%', fontWeight: 'bold' }}
//                     >
//                         Top Cities
//                     </Text>
//                     <View
//                         style={{ flexDirection: 'row' }}
//                     >
//                         <View
//                             style={{ flex: 1, padding: '1%' }}
//                         >
//                             <CityView city={"Islamabad"} />
//                         </View>
//                         <View
//                             style={{ flex: 1, padding: '1%' }}
//                         >
//                             <CityView city={"Rawalpindi"} />
//                         </View>
//                         <View
//                             style={{ flex: 1, padding: '1%' }}
//                         >
//                             <CityView city={"Karachi"} />
//                         </View>
//                     </View>
//                     <View
//                         style={{ flexDirection: 'row' }}
//                     >
//                         <View
//                             style={{ flex: 1, padding: '1%' }}
//                         >
//                             <CityView city={"Lahore"} />
//                         </View>
//                         <View
//                             style={{ flex: 1, padding: '1%' }}
//                         >
//                             <CityView city={"Faislabad"} />
//                         </View>
//                     </View>


//                 </View>
//             </ScrollView> */}

//             <HomeScreen/>
//         </SafeAreaView>
//     )
// }
// export default DashBoard