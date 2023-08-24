import React, { useEffect, useState } from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {SCREEN_ROUTES} from '../constants/screen-routes';
import {
  LoginScreen,
  SignupScreen,
  WorkoutHistoryScreen,
  WorkoutTrackingScreen,
} from '../screens';

const Stack = createStackNavigator();

export default function ScreenNavigation() {
  const [token, setToken] = useState(null);

  // Check for authToken on component mount
  useEffect(() => {
    checkAuthToken();
  }, []);

  const checkAuthToken = async () => {
    try {
      const authToken = await AsyncStorage.getItem('authToken');
      setToken(authToken);
    } catch (error) {
      console.error('Error retrieving authToken: ', error);
    }
  };


  if (token) {
    return (
      <Stack.Navigator initialRouteName={SCREEN_ROUTES.WORKOUT_TRACKING}>
        <Stack.Screen
          name={SCREEN_ROUTES.WORKOUT_TRACKING}
          component={WorkoutTrackingScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name={SCREEN_ROUTES.WORKOUT_HISTORY}
          component={WorkoutHistoryScreen}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    );
  }

  return (
    <Stack.Navigator initialRouteName={SCREEN_ROUTES.LOGIN}>
      <Stack.Screen
        name={SCREEN_ROUTES.LOGIN}
        component={LoginScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={SCREEN_ROUTES.SIGNUP}
        component={SignupScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}
