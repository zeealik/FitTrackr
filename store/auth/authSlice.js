import {createSlice} from '@reduxjs/toolkit';
import {signupUser, loginUser} from './authActions';
import {generateAuthToken} from '../../utils/helpers';

const initialState = {
  isLogged: false,
  isLoading: false,
  isAuthorized: false,
  userData: {},
  signupLoading: false,
  token: '', // Add token in initial state
  errorMessage: '', // Initialize error message
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    resetWholeState: () => initialState,
  },
  extraReducers: builder => {
    builder
      // ...existing extraReducers...
      .addCase(signupUser.pending, state => {
        state.signupLoading = true;
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.signupLoading = false;
        state.isCreated = true;
        state.userData = action.payload;
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.signupLoading = false;
        state.isCreated = false;
        state.errorMessage = action.payload.message;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isLogged = true;
        state.token = generateAuthToken(); // Update token in state
        state.userData = action.payload; // Update user data in state
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isLogged = false;
        state.errorMessage = action.payload.message;
      });
  },
});

export const {resetWholeState} = authSlice.actions;

export default authSlice.reducer;
