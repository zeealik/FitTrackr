import React, { useState } from 'react';
import { Text, View, FlatList, StyleSheet, TouchableOpacity } from 'react-native';

// Sample data for demonstration purposes
const sampleWorkoutHistory = [
  { id: '1', type: 'Cardio', duration: '30 mins', date: '2023-08-20' },
  { id: '2', type: 'Strength Training', duration: '45 mins', date: '2023-08-19' },
  { id: '3', type: 'Cardio', duration: '25 mins', date: '2023-08-18' },
  // ... more workout history entries
];

export const WorkoutHistoryScreen = () => {
  const [workoutHistory, setWorkoutHistory] = useState(sampleWorkoutHistory);
  const [filter, setFilter] = useState('all'); // Default filter

  const filterWorkouts = () => {
    if (filter === 'today') {
      const today = new Date().toISOString().slice(0, 10);
      const filtered = sampleWorkoutHistory.filter(item => item.date === today);
      setWorkoutHistory(filtered);
    } else if (filter === 'thisWeek') {
      const today = new Date();
      const startOfWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - today.getDay());
      const endOfWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() + (6 - today.getDay()));

      const filtered = sampleWorkoutHistory.filter(item => {
        const workoutDate = new Date(item.date);
        return workoutDate >= startOfWeek && workoutDate <= endOfWeek;
      });

      setWorkoutHistory(filtered);
    } else if (filter === 'thisMonth') {
      const today = new Date();
      const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
      const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);

      const filtered = sampleWorkoutHistory.filter(item => {
        const workoutDate = new Date(item.date);
        return workoutDate >= startOfMonth && workoutDate <= endOfMonth;
      });

      setWorkoutHistory(filtered);
    } else {
      setWorkoutHistory(sampleWorkoutHistory); // No filter, show all
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.workoutItem}>
      <Text style={styles.workoutType}>{item.type}</Text>
      <Text style={styles.workoutDuration}>{item.duration}</Text>
      <Text style={styles.workoutDate}>{item.date}</Text>
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
            filterWorkouts();
          }}>
          <Text>All</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => {
            setFilter('today');
            filterWorkouts();
          }}>
          <Text>Today</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => {
            setFilter('thisWeek');
            filterWorkouts();
          }}>
          <Text>This Week</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => {
            setFilter('thisMonth');
            filterWorkouts();
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
  workoutItem: {
    marginBottom: 15,
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
});
