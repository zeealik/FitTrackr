import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {useSelector} from 'react-redux';
import {SCREEN_ROUTES} from '../constants/screen-routes';
import {
  LoginScreen,
  SignupScreen,
  WorkoutHistoryScreen,
  WorkoutTrackingScreen,
} from '../screens';

const Stack = createStackNavigator();

export default function ScreenNavigation() {
  const {token} = useSelector(store => store.auth);

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
