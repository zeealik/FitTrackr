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
import { Picker } from '@react-native-picker/picker';
import { captureImage } from '../../../utils/camera-methods';

export const WorkoutTrackingScreen = () => {
  const [workoutType, setWorkoutType] = useState('cardio');
  const [duration, setDuration] = useState('');
  const [distance, setDistance] = useState('');
  const [repetitions, setRepetitions] = useState('');
  const [selfieUri, setSelfieUri] = useState(null);

  const handleTakeSelfie = async () => {
    // Implement code to capture a selfie and set selfieUri state
    // For simplicity, let's assume you have a function to capture a selfie
    // and it returns the image URI
    const selfieImageUri = await captureImage();
    setSelfieUri(selfieImageUri);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Record Your Workout</Text>
      <Picker
        selectedValue={workoutType}
        onValueChange={itemValue => setWorkoutType(itemValue)}>
        <Picker.Item label="Cardio" value="cardio" />
        <Picker.Item label="Strength Training" value="strength" />
        {/* Add more workout types here */}
      </Picker>
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
      <TouchableOpacity style={styles.selfieButton} onPress={handleTakeSelfie}>
        <Text style={styles.selfieButtonText}>Take a Selfie</Text>
      </TouchableOpacity>
      {selfieUri && (
        <Image source={{uri: selfieUri}} style={styles.selfieImage} />
      )}
      <Button title="Save Workout" />
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
  input: {
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
});
