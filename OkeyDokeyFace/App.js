import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';

import Home from './src/screens/Home';
import Register from './src/screens/Register';
import Recognize from './src/screens/Recognize';
import PhotoList from './src/screens/PhotoList';
import Sencor from './src/screens/Sencor';
import Receipt from './src/screens/Receipt';

const App = () => {
  const Stack = createNativeStackNavigator();
  const Tab = createBottomTabNavigator();
  const BottomTabScreen = () => {
    return (
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            height: 70,
          },
        }}>
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Register" component={Register} />
        <Tab.Screen name="Recognize" component={Recognize} />
      </Tab.Navigator>
    );
  };
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Bottom" component={BottomTabScreen} />
        <Stack.Screen name="PhotoList" component={PhotoList} />
        <Stack.Screen name="Sencor" component={Sencor} />
        <Stack.Screen name="Receipt" component={Receipt} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
