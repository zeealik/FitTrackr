import {createAsyncThunk} from '@reduxjs/toolkit';
import db from '../../database/db';

export const signupUser = createAsyncThunk(
  'auth/signupUser',
  async ({name, email, password}, {rejectWithValue}) => {
    try {
      // Save user record to the database
      const result = await new Promise((resolve, reject) => {
        db.transaction(
          tx => {
            tx.executeSql(
              'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
              [name, email, password],
              (_, innerResult) => {
                resolve(innerResult.rowsAffected > 0);
              },
              error => {
                reject(error);
              },
            );
          },
          transactionError => {
            reject(transactionError);
          },
        );
      });

      if (result) {
        // Handle successful signup
        return {name, email}; // Return user data to be stored in state
      } else {
        return rejectWithValue({message: 'Failed to register user'});
      }
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);
