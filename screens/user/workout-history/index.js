import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {fetchWorkoutRecords} from '../../../store/workout/workoutActions';

export const WorkoutHistoryScreen = () => {
  const dispatch = useDispatch();
  const [workoutHistory, setWorkoutHistory] = useState([]);
  const [filter, setFilter] = useState('all'); // Default filter
  const userId = useSelector(state => state.auth.userData.id);

  const fetchRecords = async () => {
    try {
      const response = await dispatch(fetchWorkoutRecords());
      const responseArray = response?.payload;
      console.log('responseARray', responseArray);
      // Filter the records based on the userId
      const filteredRecords = responseArray.filter(
        record => record?.id === userId,
      );
      setWorkoutHistory(filteredRecords);
    } catch (error) {
      console.error('Error', error);
      // Handle error
    }
  };

  useEffect(() => {
    fetchRecords();
  }, []);

  const applyDateFilters = () => {
    // Apply the date filters on workoutHistory
    if (filter === 'today') {
      const today = new Date().toISOString().slice(0, 10);
      const filtered = workoutHistory.filter(item => item.date === today);
      setWorkoutHistory(filtered);
    } else if (filter === 'thisWeek') {
      const today = new Date();
      const startOfWeek = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate() - today.getDay(),
      );
      const endOfWeek = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate() + (6 - today.getDay()),
      );

      const filtered = workoutHistory.filter(item => {
        const workoutDate = new Date(item.date);
        return workoutDate >= startOfWeek && workoutDate <= endOfWeek;
      });

      setWorkoutHistory(filtered);
    } else if (filter === 'thisMonth') {
      const today = new Date();
      const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
      const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);

      const filtered = workoutHistory.filter(item => {
        const workoutDate = new Date(item.date);
        return workoutDate >= startOfMonth && workoutDate <= endOfMonth;
      });

      setWorkoutHistory(filtered);
    } else {
      // setWorkoutHistory(workoutHistory);
      return workoutHistory;
    }
  };

  const renderItem = ({item}) => (
    <View style={styles.historyCard}>
      <Image
        source={{uri: `data:image/jpeg;base64,${item.selfiePicture}`}}
        style={styles.workoutImage}
      />
      <View>
        <Text style={styles.workoutType}>Workout Type: {item.workoutType}</Text>
        <Text style={styles.workoutDuration}>Duration: {item.duration}</Text>
        <Text style={styles.workoutDuration}>
          Repetitions: {item.repetitions}
        </Text>
        <Text style={styles.workoutDate}>
          Distance Covered: {item.distance}
        </Text>
        <Text style={styles.workoutDate}>Date: {item.date}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Workout History</Text>
      <View style={styles.filterContainer}>
        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => {
            setFilter('all');
            applyDateFilters();
          }}>
          <Text>All</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => {
            setFilter('today');
            applyDateFilters();
          }}>
          <Text>Today</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => {
            setFilter('thisWeek');
            applyDateFilters();
          }}>
          <Text>This Week</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => {
            setFilter('thisMonth');
            applyDateFilters();
          }}>
          <Text>This Month</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={workoutHistory}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
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
  historyCard: {
    marginBottom: 15,
    display: 'flex',
    gap: 20,
    flexDirection: 'row',
    padding: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
  },
  workoutType: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  workoutDuration: {
    marginBottom: 3,
  },
  workoutDate: {
    color: 'gray',
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  filterButton: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
  },
  workoutImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: 'center',
  },
});
