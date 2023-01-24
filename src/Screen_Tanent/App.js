import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  Button, Image, Text, TouchableOpacity, View

} from 'react-native';
import HomeScreen from '../Main/HomeScreen';
import Profile from '../Screens_Owner/Profile';
import RProperty from './RProperty';
import { createDrawerNavigator } from '@react-navigation/drawer';
import CustomDrawer from '../Main/CustomDrawr';
  
const Drawer = createDrawerNavigator();

function TDrawer() {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,        
      }}
      drawerContent={props => <CustomDrawer {...props} />}

      useLegacyImplementation>
      <Drawer.Screen name="owner" component={TenetMainOwnerPage} />
    </Drawer.Navigator>
  );
}
const Tab = createBottomTabNavigator();

function TenetMainOwnerPage({ navigation }) {
  global.naviof = navigation;
  return(

      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: global.color,
          tabBarLabelStyle: { fontSize: 12 }
  
        }}
      >
        <Tab.Screen name="h" component={HomeScreen}
          options={{
            tabBarLabel: ({ color }) => color == global.color ? <Text style={{ fontSize: 10, color: global.color }}>Home</Text> : <></>,
            tabBarIcon: ({ color }) => (
              <Icon name="home" size={color == global.color ? 28 : 20} color={color} />
            ),
            header: ({ color }) => (
              <View style={{
                flexDirection: 'row', backgroundColor: global.color, elevation: 5
                , borderBottomEndRadius: 30
              }}>
                <TouchableOpacity
                  style={{ alignSelf: 'center', flex: 1, alignItems:'flex-end' }}
                  onPress={() => navigation.openDrawer()}
                ><Icon name='bars' size={25}
                  style={{ backgroundColor: global.color }} color={'white'} />
                </TouchableOpacity>
                <Text style={{
                  fontSize: 25,
                  color: 'white',
                  fontWeight: 'bold',
                  flex: 5,
                  padding: '5%',
                }}>  RENTAL <Text style={{
                  fontSize: 18,
                  color: 'white',
                }}>MANAGAMENT</Text></Text>
                {/* <Image
                  style={{ height: 60, width: 30,marginLeft:50,marginTop:10 }}
                  source={require('../Pictures/LOGO.png')}
                />
  
  
                <Image
                  style={{ height: 40, width: 180,marginLeft:10,marginTop:20 }}
                  source={require('../Pictures/Makan.png')}
                /> */}
                <Icon.Button name="filter" backgroundColor={global.color}
                  style={{ alignSelf: 'center', flex: 1 }}
                  onPress={() => navigation.navigate('Search')}
                >
                  <Text style={{ fontFamily: 'Arial', fontSize: 12, color: 'white' }}>
                    Filter
                  </Text>
                </Icon.Button>
                <View style={{ flex: 1 }}></View>
              </View>
            ),
          }}
        />
        < Tab.Screen name='Rent Property' component={RProperty}
          options={{
            tabBarLabel: ({ color }) => color == global.color ? <Text style={{ fontSize: 10, color: global.color }}>Rent</Text> : <></>,
            tabBarIcon: ({ color }) => (
              <Icon name='bookmark' size={color == global.color ? 28 : 20} color={color} />
            ),
          }}
        />
        < Tab.Screen name="My Profile" component={Profile}
          options={{
            tabBarLabel: ({ color }) => color == global.color ? <Text style={{ fontSize: 10, color: global.color }}>Profile</Text> : <></>,
            tabBarIcon: ({ color }) => (
              <Icon name="user" size={color == global.color ? 28 : 20} color={color} />
            ),
          }}
        />
      </Tab.Navigator >
  )
  
  }
export default TenetMainOwnerPage;
export { TDrawer }