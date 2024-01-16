import React, { useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import TabNavigator from './src/navigators/tab-navigator'
import DetailsScreen from './src/screens/details-screen'
import PaymentScreen from './src/screens/payment-screen'
import { useFonts } from 'expo-font'
import LoginScreen from './src/screens/login-screen'
import { onAuthStateChanged } from 'firebase/auth'
import { FIREBASE_AUTH } from './firebaseConfig'
import useAuthStore from './src/store/auth-store'

const Stack = createNativeStackNavigator()

const App = () => {
  const { setUser, user } = useAuthStore()
  let [fontsLoaded] = useFonts({
    'Poppins-Black': require('./assets/fonts/Poppins-Black.ttf'),
    'Poppins-Bold': require('./assets/fonts/Poppins-Bold.ttf'),
    'Poppins-ExtraBold': require('./assets/fonts/Poppins-ExtraBold.ttf'),
    'Poppins-ExtraLight': require('./assets/fonts/Poppins-ExtraLight.ttf'),
    'Poppins-Light': require('./assets/fonts/Poppins-Light.ttf'),
    'Poppins-Medium': require('./assets/fonts/Poppins-Medium.ttf'),
    'Poppins-Regular': require('./assets/fonts/Poppins-Regular.ttf'),
    'Poppins-SemiBold': require('./assets/fonts/Poppins-SemiBold.ttf'),
    'Poppins-Thin': require('./assets/fonts/Poppins-Thin.ttf')
  })

  useEffect(() => {
    onAuthStateChanged(FIREBASE_AUTH, user => {
      setUser(user)
    })
  }, [])

  if (!fontsLoaded) {
    return null
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName='Login'
      >
        {user ? (
          <Stack.Group>
            {/* Screens for auth users */}
            <Stack.Screen
              name='Tab'
              component={TabNavigator}
              options={{ animation: 'slide_from_bottom', title: 'Home' }}
            />

            <Stack.Screen
              name='Details'
              component={DetailsScreen}
              options={{ animation: 'slide_from_bottom' }}
            />
            <Stack.Screen
              name='Payment'
              component={PaymentScreen}
              options={{ animation: 'slide_from_bottom' }}
            />
          </Stack.Group>
        ) : (
          <Stack.Group>
            {/* Auth Screens */}
            <Stack.Screen
              name='Login'
              component={LoginScreen}
              options={{ animation: 'slide_from_bottom' }}
            />
          </Stack.Group>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App
