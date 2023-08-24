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
import {SCREEN_ROUTES} from '../../../constants/screen-routes';
import {isValidEmail} from '../../../utils/validations';
import {signupSchema} from '../../../utils/yup-schemas';
import db from '../../../database/db';

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
      await signupSchema.validate({name, email, password});

      // Save user record to the database
      db.transaction(tx => {
        tx.executeSql(
          'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
          [name, email, password],
          (_, result) => {
            if (result.rowsAffected > 0) {
              Alert.alert('Success', 'User registered successfully');
              navigateToLogin();
            } else {
              Alert.alert('Error', 'Failed to register user');
            }
          },
          error => {
            console.error('Error saving user record: ', error);
          },
        );
      });
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
