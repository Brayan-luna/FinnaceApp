import React, { useMemo } from 'react';
import { StyleSheet, View, TouchableOpacity, Platform } from 'react-native';
import { NavigationContainer, DarkTheme, DefaultTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import { useApp } from '../context/AppContext';

// Import Screens
import { HomeScreen } from '../screens/Home';
import { StatsScreen } from '../screens/Stats';
import { AddTransactionScreen } from '../screens/AddTransaction';
import { ChatScreen } from '../screens/Chat';
import { SettingsScreen } from '../screens/Settings';
import { AddCategoriesScreen } from '../screens/AddCategories';
import { AddAccountScreen } from '../screens/AddAccount';
import { AddCashScreen } from '../screens/AddCash';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const TabNavigator = () => {
  const { themeColors, isDarkMode } = useApp();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: themeColors.surface,
          borderTopWidth: 0,
          height: Platform.OS === 'ios' ? 88 : 72,
          paddingBottom: Platform.OS === 'ios' ? 28 : 12,
          paddingTop: 12,
          elevation: 0,
          shadowOpacity: 0,
        },
        tabBarActiveTintColor: themeColors.accent,
        tabBarInactiveTintColor: themeColors.textSecondary,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? "wallet" : "wallet-outline"}
              size={24}
              color={focused ? themeColors.accent : themeColors.textSecondary}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Stats"
        component={StatsScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? "stats-chart" : "stats-chart-outline"}
              size={22}
              color={focused ? themeColors.accent : themeColors.textSecondary}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? "settings" : "settings-outline"}
              size={22}
              color={focused ? themeColors.accent : themeColors.textSecondary}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export const AppNavigator = () => {
  const { themeColors, isDarkMode } = useApp();

  const navigationTheme = useMemo(() => {
    const baseTheme = isDarkMode ? DarkTheme : DefaultTheme;
    return {
      ...baseTheme,
      colors: {
        ...baseTheme.colors,
        background: themeColors.background,
        card: themeColors.surface,
        text: themeColors.text,
        border: themeColors.border,
      },
    };
  }, [isDarkMode, themeColors]);

  return (
    <NavigationContainer theme={navigationTheme}>
      <GestureHandlerRootView style={{ flex: 1, backgroundColor: themeColors.background }}>
        <Stack.Navigator 
          screenOptions={{ 
            headerShown: false,
            contentStyle: { backgroundColor: themeColors.background }
          }}
        >
          <Stack.Screen name="MainTabs" component={TabNavigator} />
          <Stack.Screen name="AddTransaction" component={AddTransactionScreen} />
          <Stack.Screen name="AddCategories" component={AddCategoriesScreen} />
          <Stack.Screen name="AddAccount" component={AddAccountScreen} />
          <Stack.Screen name="AddCash" component={AddCashScreen} />
        </Stack.Navigator>
      </GestureHandlerRootView>
    </NavigationContainer>
  );
};
