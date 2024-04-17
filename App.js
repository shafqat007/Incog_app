
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { HomeScreen,SignUpScreen, LoginScreen,SplashScreen } from './screens'
import {Provider} from 'react-redux'
import Store from './context/store'
const Stack = createNativeStackNavigator();


const App = () => {
  return (
    <NavigationContainer>
      <Provider store={Store}>
      <Stack.Navigator screenOptions={{headerShown:false}}>
      <Stack.Screen name="SplashScreen" component={SplashScreen} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
      </Stack.Navigator>
      </Provider>
     
    </NavigationContainer>
  )
}

export default App