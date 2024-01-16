import React from 'react'
import { StyleSheet } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { COLORS } from '../theme/theme'
import { BlurView } from 'expo-blur'
import HomeScreen from '../screens/home-screen'
import FavoritesScreen from '../screens/favorites-screen'
import CartScreen from '../screens/cart-screen'
import ProfileScreen from '../screens/profile-screen'
import OrderHistoryScreen from '../screens/order-history-screen'
import { Ionicons, FontAwesome, MaterialIcons } from '@expo/vector-icons'
import HeaderBar from '../components/HeaderBar'

const Tab = createBottomTabNavigator()

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarHideOnKeyboard: true,
        headerShown: true,
        tabBarShowLabel: false,
        tabBarStyle: styles.tabBarStyle,
        tabBarBackground: () => (
          <BlurView intensity={50} style={styles.BlurViewStyles} />
        )
      }}
    >
      <Tab.Screen
        name='Home'
        component={HomeScreen}
        options={{
          headerTitle: () => <HeaderBar title='Inicio' />,
          tabBarIcon: ({ focused, color, size }) => (
            <MaterialIcons
              name='home'
              size={28}
              color={
                focused ? COLORS.primaryOrangeHex : COLORS.primaryLightGreyHex
              }
            />
          )
        }}
      />
      <Tab.Screen
        name='Cart'
        component={CartScreen}
        options={{
          headerTitle: () => <HeaderBar title='Carrito' />,
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons
              name='cart-sharp'
              size={26}
              color={
                focused ? COLORS.primaryOrangeHex : COLORS.primaryLightGreyHex
              }
            />
          )
        }}
      />
      <Tab.Screen
        name='Profile'
        component={ProfileScreen}
        options={{
          headerTitle: () => <HeaderBar title='Perfil' />,
          tabBarIcon: ({ focused, color, size }) => (
            <FontAwesome
              name='user'
              size={26}
              color={
                focused ? COLORS.primaryOrangeHex : COLORS.primaryLightGreyHex
              }
            />
          )
        }}
      />
      <Tab.Screen
        name='Favorite'
        component={FavoritesScreen}
        options={{
          headerTitle: () => <HeaderBar title='Favoritos' />,
          tabBarIcon: ({ focused, color, size }) => (
            <FontAwesome
              name='heart'
              size={22}
              color={
                focused ? COLORS.primaryOrangeHex : COLORS.primaryLightGreyHex
              }
            />
          )
        }}
      />
      <Tab.Screen
        name='History'
        component={OrderHistoryScreen}
        options={{
          headerTitle: () => <HeaderBar title='Historial' />,
          tabBarIcon: ({ focused, color, size }) => (
            <MaterialIcons
              name='history'
              size={28}
              color={
                focused ? COLORS.primaryOrangeHex : COLORS.primaryLightGreyHex
              }
            />
          )
        }}
      />
    </Tab.Navigator>
  )
}

const styles = StyleSheet.create({
  tabBarStyle: {
    height: 80,
    position: 'absolute',
    backgroundColor: COLORS.secondaryBlackRGBA,
    elevation: 1
  },
  BlurViewStyles: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
  }
})

export default TabNavigator
