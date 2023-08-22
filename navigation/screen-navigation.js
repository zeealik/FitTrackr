import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {SCREEN_ROUTES} from '../constants/screen-routes';
import { LoginScreen, SignupScreen, WorkoutHistoryScreen } from '../screens';

const Stack = createStackNavigator();

export default function ScreenNavigation() {
  const token = false;

  if (token) {
    return (
      <Stack.Navigator initialRouteName={SCREEN_ROUTES.LOGIN}>
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
