import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import PostDetailsClass from './ClassComponents/PostDetailsClass';
import HomeClass from './ClassComponents/HomeClass';

const Stack = createStackNavigator();
function App() {
  return (
    <NavigationContainer>
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={HomeClass} options={{headerShown: false}} />
       <Stack.Screen name="PostDetails" component={PostDetailsClass as any} options={{headerShown: false}} />
    </Stack.Navigator>
  </NavigationContainer>
  );
}

export default App;
