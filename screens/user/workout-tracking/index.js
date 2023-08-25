import React, {useCallback, useState} from 'react';
import {
  Text,
  View,
  TextInput,
  Button,
  Alert,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {Picker} from '@react-native-picker/picker';
import {captureImage} from '../../../utils/camera-methods';
import {resetWholeState} from '../../../store/auth/authSlice';
import {saveWorkoutRecord} from '../../../store/workout/workoutActions';
import {SCREEN_ROUTES} from '../../../constants/screen-routes';
import {IMAGES} from '../../../constants/image-urls';

export const WorkoutTrackingScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [workoutType, setWorkoutType] = useState('cardio');
  const [duration, setDuration] = useState('');
  const [distance, setDistance] = useState('');
  const [repetitions, setRepetitions] = useState('');
  const [selfiePicture, setSelfiePicture] = useState(null);
  const userId = useSelector(state => state.auth.userData.id);

  const handleTakeSelfie = async () => {
    const selfieImageUri = await captureImage('photo');
    setSelfiePicture(selfieImageUri);
  };

  const handleSubmit = async () => {
    try {
      // Validate your inputs before proceeding

      // Dispatch the saveWorkoutRecord action
      const resultAction = await dispatch(
        saveWorkoutRecord({
          userId: userId, // Replace with actual user ID
          workoutType: workoutType,
          duration: duration,
          distance: distance,
          repetitions: repetitions,
          selfiePicture: selfiePicture,
        }),
      );

      // Handle the result from the action
      if (saveWorkoutRecord.fulfilled.match(resultAction)) {
        // Clear input fields
        setWorkoutType('cardio');
        setDuration('');
        setDistance('');
        setRepetitions('');
        Alert.alert('Success', resultAction.payload);
      } else {
        Alert.alert('Error', resultAction.error.message);
      }
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  const handleLogout = useCallback(async () => {
    dispatch(resetWholeState());
  });

  const goToWorkoutHistory = () =>
    navigation.navigate(SCREEN_ROUTES.WORKOUT_HISTORY);

  return (
    <View style={styles.container}>
      <View style={{alignItems: 'center'}}>
        <View style={styles.avatarWrapper}>
          {selfiePicture ? (
            <Image
              source={{
                uri: `data:image/jpeg;base64,${selfiePicture}`,
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
              {selfiePicture
                ? 'Change Selfie Picture'
                : 'Upload Selfie Picture'}
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

      <TouchableOpacity
        style={styles.saveButtonContainer}
        onPress={handleSubmit}>
        <Text style={styles.selfieButtonText}>Save Workout</Text>
      </TouchableOpacity>

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
    alignItems: 'center',
    backgroundColor: 'green',
    width: '50%',
    borderRadius: 8,
    justifyContent: 'center',
    alignSelf: 'center',
    height: '5%',
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
