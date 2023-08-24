import React, {useState} from 'react';
import {
  Text,
  View,
  TextInput,
  Button,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Picker} from '@react-native-picker/picker';
import {captureImage} from '../../../utils/camera-methods';
import {SCREEN_ROUTES} from '../../../constants/screen-routes';
import {IMAGES} from '../../../constants/image-urls';

export const WorkoutTrackingScreen = () => {
  const navigation = useNavigation();
  const [workoutType, setWorkoutType] = useState('cardio');
  const [duration, setDuration] = useState('');
  const [distance, setDistance] = useState('');
  const [repetitions, setRepetitions] = useState('');
  const [selfieUri, setSelfieUri] = useState(null);

  const handleTakeSelfie = async () => {
    // Implement code to capture a selfie and set selfieUri state
    // For simplicity, let's assume you have a function to capture a selfie
    // and it returns the image URI
    const selfieImageUri = await captureImage('photo');
    setSelfieUri(selfieImageUri);
  };

  const handleLogout = async () => {
    try {
      // Remove the authToken from AsyncStorage
      await AsyncStorage.removeItem('authToken');
      // Navigate to the login screen or wherever appropriate
    } catch (error) {
      console.error('Error logging out: ', error);
    }
  };

  const goToWorkoutHistory = () =>
    navigation.navigate(SCREEN_ROUTES.WORKOUT_HISTORY);

  return (
    <View style={styles.container}>
      <View style={{alignItems: 'center'}}>
        <View style={styles.avatarWrapper}>
          {selfieUri ? (
            <Image
              source={{
                uri: `data:image/jpeg;base64,${selfieUri}`,
              }}
              style={styles.userImage}
            />
          ) : (
            <Image source={IMAGES.AVATAR} style={styles.avatar} />
          )}
          <TouchableOpacity
            style={styles.avatarTextWrapper}
            onPress={handleTakeSelfie}>
            <Text style={styles.avatarText}>
              {selfieUri ? 'Change Profile Picture' : 'Upload Profile Picture'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={{flexDirection: 'row', gap: 20}}>
        <Text style={styles.title}>Record Your Workout</Text>
        <TouchableOpacity
          style={styles.historyButton}
          onPress={goToWorkoutHistory}>
          <Text style={styles.historyButtonText}>Workout History</Text>
        </TouchableOpacity>
      </View>

      <Picker
        selectedValue={workoutType}
        onValueChange={itemValue => setWorkoutType(itemValue)}>
        <Picker.Item label="Cardio" value="cardio" />
        <Picker.Item label="Strength Training" value="strength" />
      </Picker>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Duration"
          value={duration}
          onChangeText={setDuration}
        />
        <TextInput
          style={styles.input}
          placeholder="Distance"
          value={distance}
          onChangeText={setDistance}
        />
        <TextInput
          style={styles.input}
          placeholder="Repetitions"
          value={repetitions}
          onChangeText={setRepetitions}
        />
      </View>
      <TouchableOpacity style={styles.selfieButton} onPress={handleTakeSelfie}>
        <Text style={styles.selfieButtonText}>Take a Selfie</Text>
      </TouchableOpacity>

      <View style={styles.saveButtonContainer}>
        <Button title="Save Workout" />
      </View>

      <View style={styles.logoutButtonContainer}>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  inputContainer: {
    alignItems: 'center', // Center align inputs
    marginBottom: 20, // Add some spacing
  },
  input: {
    width: '100%', // Make the inputs take full width
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
  },
  selfieButton: {
    backgroundColor: 'blue',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    marginBottom: 10,
  },
  selfieButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  selfieImage: {
    width: 150,
    height: 150,
    resizeMode: 'cover',
    marginBottom: 10,
  },
  saveButtonContainer: {
    alignItems: 'center', // Center align buttons
  },
  historyButton: {
    marginTop: 5,
    width: 150,
    borderRadius: 10,
  },
  historyButtonText: {
    color: 'white',
    backgroundColor: 'gray',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  avatar: {
    alignSelf: 'center',
    justifyContent: 'center',
    resizeMode: 'contain',
    marginTop: 20,
    width: 100,
    height: 100,
    opacity: 0.1,
  },
  userImage: {
    alignSelf: 'center',
    justifyContent: 'center',
    resizeMode: 'contain',
    width: 150,
    height: 150,
    borderRadius: 100,
    opacity: 1,
  },
  avatarWrapper: {
    width: 150,
    height: 150,
    backgroundColor: 'gray',
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontWeight: '400',
    fontSize: 10,
    textAlign: 'center',
    color: 'white',
  },
  avatarTextWrapper: {
    position: 'absolute',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: 'gray',
  },
  logoutButtonContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  logoutButton: {
    backgroundColor: 'red',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  logoutButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
