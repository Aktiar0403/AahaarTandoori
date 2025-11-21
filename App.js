// App.js - Enhanced with your restaurant's actual branding
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

// Context Providers
import { AuthProvider } from './src/context/AuthContext';
import { CartProvider } from './src/context/CartContext';
import { MenuProvider } from './src/context/MenuContext';

// Screens
import LoginScreen from './src/screens/LoginScreen';
import HomeScreen from './src/screens/HomeScreen';
import MenuScreen from './src/screens/MenuScreen';
import CartScreen from './src/screens/CartScreen';
import AdminScreen from './src/screens/AdminScreen';
import OrderTrackingScreen from './src/screens/OrderTrackingScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'Home') iconName = focused ? 'home' : 'home-outline';
          else if (route.name === 'Menu') iconName = focused ? 'restaurant' : 'restaurant-outline';
          else if (route.name === 'Cart') iconName = focused ? 'cart' : 'cart-outline';
          else if (route.name === 'Admin') iconName = focused ? 'settings' : 'settings-outline';
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#d4af37', // Gold color for premium feel
        tabBarInactiveTintColor: '#8b7355',
        tabBarStyle: {
          backgroundColor: '#1a1a1a',
          borderTopWidth: 1,
          borderTopColor: '#333',
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} options={{ title: 'Home' }} />
      <Tab.Screen name="Menu" component={MenuScreen} options={{ title: 'Menu' }} />
      <Tab.Screen name="Cart" component={CartScreen} options={{ title: 'Cart' }} />
      <Tab.Screen name="Admin" component={AdminScreen} options={{ title: 'Manage' }} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <MenuProvider>
        <CartProvider>
          <NavigationContainer>
            <StatusBar style="light" />
            <Stack.Navigator 
              initialRouteName="Login"
              screenOptions={{
                headerStyle: {
                  backgroundColor: '#1a1a1a',
                },
                headerTintColor: '#d4af37',
                headerTitleStyle: {
                  fontWeight: 'bold',
                },
              }}
            >
              <Stack.Screen 
                name="Login" 
                component={LoginScreen}
                options={{ headerShown: false }}
              />
              <Stack.Screen 
                name="Main" 
                component={MainTabs}
                options={{ headerShown: false }}
              />
              <Stack.Screen 
                name="OrderTracking" 
                component={OrderTrackingScreen}
                options={{ title: 'Track Your Order' }}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </CartProvider>
      </MenuProvider>
    </AuthProvider>
  );
}