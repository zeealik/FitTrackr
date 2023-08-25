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
                // Resolve with the workout data
                resolve({
                  userId,
                  workoutType,
                  duration,
                  distance,
                  repetitions,
                  selfiePicture,
                  time: currentTime,
                });
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
  async (_, {rejectWithValue}) => {
    return new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          'SELECT * FROM workoutRecords',
          [],
          (txObj, resultSet) => {
            const records = [];
            for (let i = 0; i < resultSet.rows.length; i++) {
              records.push(resultSet.rows.item(i));
            }
            resolve(records);
          },
          (txObj, error) => {
            reject(rejectWithValue(error));
          },
        );
      });
    });
  },
);

export const fetchWorkoutRecordsByID = createAsyncThunk(
  'workout/fetchWorkoutRecordsByID',
  async (userId, {rejectWithValue}) => {
    return new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          'SELECT * FROM workoutRecords WHERE userId = ?',
          [userId],
          (txObj, resultSet) => {
            const records = [];
            for (let i = 0; i < resultSet.rows.length; i++) {
              records.push(resultSet.rows.item(i));
            }
            resolve(records);
          },
          (txObj, error) => {
            reject(rejectWithValue(error));
          },
        );
      });
    });
  },
);
