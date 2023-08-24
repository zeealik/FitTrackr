// workoutActions.js
import {createAsyncThunk} from '@reduxjs/toolkit';
import db from '../../database/db';

export const saveWorkoutRecord = createAsyncThunk(
  'workout/saveWorkoutRecord',
  async (workoutData, {rejectWithValue}) => {
    const {
      userId,
      workoutType,
      duration,
      distance,
      repetitions,
      selfiePicture,
    } = workoutData;

    const currentTime = new Date().toISOString(); // Get current time

    return new Promise(async (resolve, reject) => {
      try {
        await db.transaction(tx => {
          tx.executeSql(
            'INSERT INTO workoutRecords (userId, workoutType, duration, distance, repetitions, selfiePicture, time) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [
              userId,
              workoutType,
              duration,
              distance,
              repetitions,
              selfiePicture,
              currentTime, // Include current time in the query
            ],
            (_, result) => {
              if (result.rowsAffected > 0) {
                resolve('Workout record saved successfully');
              } else {
                reject('Failed to save workout record');
              }
            },
            error => {
              reject(error.message);
            },
          );
        });
      } catch (error) {
        rejectWithValue(error.message);
      }
    });
  },
);

export const fetchWorkoutRecords = createAsyncThunk(
  'workout/fetchWorkoutRecords',
  async (userId, {rejectWithValue}) => {
    try {
      const response = await fetchWorkoutRecordsApiCall(userId);
      return response.data; // Return the fetched records
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);
