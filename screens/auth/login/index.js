import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {
  Text,
  View,
  TextInput,
  Button,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {SCREEN_ROUTES} from '../../../constants/screen-routes';

export const LoginScreen = () => {
  const navigation = useNavigation();
  const handleLogin = () => {
    // Implement your login logic here
    // For now, let's just log a message
    console.log('Login button pressed');
  };

  const navigateToSignup = () => {
    navigation.navigate(SCREEN_ROUTES.SIGNUP);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.appName}>FitTrackr</Text>
      <TextInput style={styles.input} placeholder="Email" />
      <TextInput style={styles.input} placeholder="Password" secureTextEntry />
      <Button title="Login" onPress={handleLogin} />
      <TouchableOpacity onPress={navigateToSignup}>
        <Text style={styles.signupText}>New user? Sign up</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  appName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
  },
  signupText: {
    marginTop: 10,
    color: 'blue',
    textDecorationLine: 'underline',
  },
});
