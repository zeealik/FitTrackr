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

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({email, password}, {rejectWithValue}) => {
    try {
      return new Promise(resolve => {
        db.transaction(tx => {
          tx.executeSql(
            'SELECT * FROM users WHERE email = ? AND password = ?',
            [email, password],
            (_, result) => {
              if (result.rows.length > 0) {
                const user = result.rows.item(0);
                resolve(user);
              } else {
                resolve(null);
              }
            },
            error => {
              console.error('Error checking user credentials: ', error);
              resolve(null);
            },
          );
        });
      }).then(async user => {
        if (user) {
          return user; // Return user data to be stored in state
        } else {
          return rejectWithValue({message: 'Invalid credentials'});
        }
      });
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);
