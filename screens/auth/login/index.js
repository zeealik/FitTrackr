import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
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
import {loginSchema} from '../../../utils/yup-schemas';
import {checkLogin} from '../../../database/db';

export const LoginScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const generateAuthToken = () => {
    const randomString = Math.random().toString(36).substring(7);
    return randomString;
  };

  const handleLogin = async () => {
    try {
      await loginSchema.validate({email, password});
      const user = await checkLogin(email, password);
      if (user) {
        const authToken = generateAuthToken();
        await AsyncStorage.setItem('authToken', authToken);
        console.log('success login')
      } else {
        Alert.alert('Error', 'Invalid credentials');
      }
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  const navigateToSignup = () => {
    navigation.navigate(SCREEN_ROUTES.SIGNUP);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.appName}>FitTrackr</Text>
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
