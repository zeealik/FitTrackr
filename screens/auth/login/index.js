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
import {useDispatch} from 'react-redux';
import {loginUser} from '../../../store/auth/authActions';
import {SCREEN_ROUTES} from '../../../constants/screen-routes';
import {loginSchema} from '../../../utils/yup-schemas';

export const LoginScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      await loginSchema.validate({email, password});
      // Dispatch the login action
      const response = await dispatch(loginUser({email, password}));

      // Handle the login response as needed
      if (loginUser.fulfilled.match(response)) {
        // Login successful
        console.log('Success: User logged in');
      } else {
        // Login failed
        Alert.alert('Error', response.payload.message);
      }
    } catch (error) {
      console.error('Error during login: ', error);
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
