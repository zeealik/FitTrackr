import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  TextInput,
  Button,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import {useDispatch} from 'react-redux';
import {SCREEN_ROUTES} from '../../../constants/screen-routes';
import {isValidEmail} from '../../../utils/validations';
import {signupSchema} from '../../../utils/yup-schemas';
import {signupUser} from '../../../store/auth/authActions';

export const SignupScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = async () => {
    if (!isValidEmail(email)) {
      alert('Please enter a valid email address.');
      return;
    }

    try {
      await signupSchema.validate({name, email, password});

      // Dispatch the signup action
      const response = await dispatch(signupUser({name, email, password}));

      // Handle the signup response as needed
      if (signupUser.fulfilled.match(response)) {
        // Signup successful
        navigateToLogin();
      } else {
        // Signup failed
        Alert.alert('Error', response.payload.message);
      }
    } catch (error) {
      console.error('Error during signup: ', error);
    }
  };

  const navigateToLogin = () => {
    navigation.navigate(SCREEN_ROUTES.LOGIN);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.appName}>FitTrackr</Text>
      <Text style={styles.screenTitle}>Sign Up</Text>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Sign Up" onPress={handleSignup} />
      <TouchableOpacity onPress={navigateToLogin}>
        <Text style={styles.loginText}>Already have an account? Log in</Text>
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
  screenTitle: {
    fontSize: 20,
    marginBottom: 10,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
  },
  loginText: {
    marginTop: 10,
    color: 'blue',
    textDecorationLine: 'underline',
  },
});
