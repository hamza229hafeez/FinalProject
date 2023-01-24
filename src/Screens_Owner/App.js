import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Text, TouchableOpacity, View } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from '../Main/HomeScreen';
import Profile from './Profile';
import MyProperty from './MyProperty';
import RProperty from '../Screen_Tanent/RProperty';
import RentalProperty from '../Screen_Tanent/RentalProperty';
import CustomDrawer from '../Main/CustomDrawr';
import DashBoard from '../Main/DashBoard';
import ODashBoard from './ODashBoard';

const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

function MyDrawer({navigation}) {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
      }}
      drawerContent={props => <CustomDrawer {...props} />}

      useLegacyImplementation>
      <Drawer.Screen name="owner" component={MainOwnerPage} />
    </Drawer.Navigator>
  );
}
function MainOwnerPage({ navigation }) {
  global.naviof = navigation;
  return (
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
              flexDirection: 'row', backgroundColor: global.color, elevation: 10
              , borderBottomEndRadius: 30
            }}>
              <TouchableOpacity
                style={{ alignSelf: 'center', alignContent: 'flex-start', flex: 2, alignItems: 'center' }}
                onPress={() => navigation.openDrawer()}
              ><Icon name='bars' size={25}
                style={{ backgroundColor: global.color }} color={'white'} />
              </TouchableOpacity>
              <Text style={{
                fontSize: 25,
                color: 'white',
                fontWeight: 'bold',
                flex: 4,
                textAlignVertical: 'center',
                padding: '3%',
              }}>RENTAL {'\n'}<Text style={{
                fontSize: 15,
                color: 'white',
              }}>MANAGAMENT</Text>
              </Text>
              {/* <Image
                style={{ height: 60, width: 30,marginLeft:50,marginTop:10 }}
                source={require('../Pictures/LOGO.png')}
              />


              <Image
                style={{ height: 40, width: 180,marginLeft:10,marginTop:20 }}
                source={require('../Pictures/Makan.png')}
              /> */}
              <View style={{ flex: 1, padding: '2%', alignSelf: 'center'}}>
                {
                  //   <Icon.Button name="filter" backgroundColor={global.color}
                  //   style={{ alignSelf: 'flex-start' }}
                  //   onPress={() => navigation.navigate('Search')}
                  // >
                  //   <Text style={{ fontSize: 12, color: 'white' }}>
                  //     Search
                  //   </Text>
                  // </Icon.Button>
                }
                <TouchableOpacity
                  onPress={() => {
                    global.naviof.navigate('Map')
                  }
                  }
                ><Icon name={'bell'} color={'white'} size={20}/>
                 
                </TouchableOpacity>
              </View>
            </View>
          ),
        }}
      />
      < Tab.Screen name='Rent Property' component={RentalProperty}
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
      < Tab.Screen name="p" component={ODashBoard}
        options={{
          tabBarLabel: ({ color }) => color == global.color ? <Text style={{ fontSize: 10, color: global.color }}>Properties</Text> : <></>,
          tabBarIcon: ({ color }) => (
            <Icon name="building" size={color == global.color ? 25 : 20} color={color} />
          ),
          header: ({ color }) => (
            <View style={{
              flexDirection: 'row', backgroundColor: global.color, elevation: 10
              , borderBottomEndRadius: 30, borderBottomLeftRadius: 0, justifyContent: 'center'
            }}>

              <Text style={{
                fontSize: 20,
                color: 'white',
                fontWeight: 'bold',
                flex: 4,
                padding: '5%'
              }}>My Properties</Text>
              <Icon.Button name="plus-circle" backgroundColor={global.color}
                style={{ alignSelf: 'center', flex: 1 }}
                onPress={() => navigation.navigate('AddProperty')}
              >
                <Text style={{ fontFamily: 'Arial', fontSize: 12, color: 'white' }}>
                  Add
                </Text>
              </Icon.Button>
              <View style={{ flex: 1 }}></View>
            </View>
          )
        }}
      />
    </Tab.Navigator >
  );
}
export default MainOwnerPage;
export { MyDrawer }