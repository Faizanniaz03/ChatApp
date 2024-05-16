import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import NewMessage from './src/screens/NewMessage'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './src/screens/Login';
import SignUp from './src/screens/SignUp';
import IndividualScreen from './src/screens/IndividualScreen';


const App = () => {
  const Stack = createNativeStackNavigator()
  return (
    <NavigationContainer>
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName={'Login'} >
        <Stack.Screen name='Login' component={Login} />
        <Stack.Screen name='SignUp' component={SignUp} />
        <Stack.Screen name='NewMessage' component={NewMessage}/>
        <Stack.Screen name='IndividualScreen' component={IndividualScreen}/>
    </Stack.Navigator>
  </NavigationContainer>
  )
}

export default App

const styles = StyleSheet.create({})