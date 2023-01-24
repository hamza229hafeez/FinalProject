import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import MainOwnerPage, { MyDrawer } from './src/Screens_Owner/App';
import { SignIn, MyPresentScreen } from './src/Main/SignIn';

import Signup from './src/Main/Signup';
import Search from './src/Main/Search'
import PropertyDetail from './src/Main/PropertyDetail';
import Profile from './src/Screens_Owner/Profile';
import MyPropertyDetail from './src/Screens_Owner/MyPropertyDetail';
import OtherProfile from './src/Main/OthersProfile';
import { LogBox } from 'react-native';
import AddProperty from './src/Screens_Owner/AddProperty';
import MyProperty from './src/Screens_Owner/MyProperty';
import SearchScreen from './src/Main/SearchPropertyData';
import RProperty from './src/Screen_Tanent/RProperty';
import RPropertyDetail from './src/Screen_Tanent/RPropertyDetail';
import MainPage from './src/Admin/MainPage'
import AdminPropertyDetail from './src/Admin/DetailsOfProperty';
import TenetMainOwnerPage, { TDrawer } from './src/Screen_Tanent/App';
import Map, { AddMap } from './src/Map/App';
import { BDORO, BDORT } from './src/Screen_Tanent/RentDetail';
import DashBoard from './src/Main/DashBoard';
import HomeScreen from './src/Main/HomeScreen';
import ODashBoard from './src/Screens_Owner/ODashBoard';
import History from './src/Screens_Owner/History';

global.color = '#2859a6';

const getCurrentDate = () => {

  var date = new Date().getDate();
  var month = new Date().getMonth() + 1;
  var year = new Date().getFullYear();
  //Alert.alert(date + '-' + month + '-' + year);
  // You can turn it in to your desired format
  return year + '-' + month + '-' + date;//format: dd-mm-yyyy;
}
global.Cdate = getCurrentDate();
const HomeStack = createNativeStackNavigator();
LogBox.ignoreAllLogs(['warning...'])
//global.api = 'http://192.168.43.77/RentalMS/api/'
global.dataapi = 'http://192.168.43.77/RMS/api/'
//global.apiImage = 'http://192.168.43.77/RentalMS/Images/'
global.apiimage = 'http://192.168.43.77/RMS/Images/'




function MyStack() {
  return (
    <HomeStack.Navigator initialRouteName='MyPresentScreen'>
      <HomeStack.Screen name="Home" component={MainOwnerPage} options={{ headerShown: false }} />
      <HomeStack.Screen name="SignIn" component={SignIn} options={{ headerShown: false }} />
      <HomeStack.Screen name="Drawr" component={MyDrawer} options={{ headerShown: false }} />
      <HomeStack.Screen name="TDrawr" component={TDrawer} options={{ headerShown: false }} />
      <HomeStack.Screen name="MyPresentScreen" component={MyPresentScreen} options={{ headerShown: false }} />
      <HomeStack.Screen name="SignUp" component={Signup} options={{ headerShown: false }} />
      <HomeStack.Screen name="AddProperty" component={AddProperty} />
      <HomeStack.Screen name="ODB" component={ODashBoard} options={{ headerShown: false }} />
      <HomeStack.Screen name="MyProperty" component={MyProperty} options={{ headerShown: false }} />
      <HomeStack.Screen name="Search" component={Search} />
      <HomeStack.Screen name="Detail" component={PropertyDetail} />
      <HomeStack.Screen name="Profile" component={Profile} />
      <HomeStack.Screen name="OtherProfile" component={OtherProfile} />
      <HomeStack.Screen name="MyPropertyDetail" component={MyPropertyDetail} />
      <HomeStack.Screen name="SearchScreen" component={SearchScreen} />
      <HomeStack.Screen name="RPropertyDetails" component={RPropertyDetail} />
      <HomeStack.Screen name="Admin" component={MainPage} />
      <HomeStack.Screen name="Approve" component={AdminPropertyDetail} />
      <HomeStack.Screen name="Tenent" component={TenetMainOwnerPage} options={{ headerShown: false }} />
      <HomeStack.Screen name="Map" component={Map} />
      <HomeStack.Screen name="BDORO" component={BDORO} />
      <HomeStack.Screen name="BDORT" component={BDORT} />
      <HomeStack.Screen name="History" component={History} />
      <HomeStack.Screen name="AddMap" component={AddMap} />
      
    </HomeStack.Navigator>
  )
}

export default function App() {
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
}