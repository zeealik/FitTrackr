import {createAsyncThunk} from '@reduxjs/toolkit';

export const signupUser = createAsyncThunk(
  'auth/signupUser',
  async ({name, email, password}, {rejectWithValue}) => {
    try {
      // Make the API call to register the user
      const response = await yourSignupApiCall({name, email, password});

      // Handle successful signup
      return response.data; // Return user data to be stored in state
    } catch (error) {
      return rejectWithValue(error.response.data); // Return error data to be stored in state
    }
  },
);
