import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './screen/Home';
import PostDetails from './screen/PostDetails';

const Stack = createStackNavigator();
function App(): React.JSX.Element {
  return (
    <NavigationContainer>
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={Home} options={{headerShown: false}} />
       <Stack.Screen name="PostDetails" component={PostDetails} options={{headerShown: false}} />
    </Stack.Navigator>
  </NavigationContainer>
  );
}

export default App;
