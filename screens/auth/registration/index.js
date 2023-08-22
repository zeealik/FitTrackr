import React, {useState} from 'react';
import {
  Text,
  View,
  TextInput,
  Button,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import * as Yup from 'yup';
import {SCREEN_ROUTES} from '../../../constants/screen-routes';
import { isValidEmail } from '../../../utils/validations';

export const SignupScreen = ({navigation}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = async () => {
    if (!isValidEmail(email)) {
      alert('Please enter a valid email address.');
      return;
    }
    try {
      const schema = Yup.object().shape({
        email: Yup.string()
          .email('Invalid email')
          .required('Email is required'),
        password: Yup.string()
          .min(8, 'Password must be at least 8 characters')
          .required('Password is required'),
      });

      // Validate input data using the schema
      await schema.validate({email, password});

      // Implement user registration logic here
      // Assuming you have a local database of users
      // You can add the new user to the database
      Alert.alert('Success', 'User registered successfully');
    } catch (error) {
      Alert.alert('Error', error.message);
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
