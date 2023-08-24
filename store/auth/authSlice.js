import {createSlice} from '@reduxjs/toolkit';
import {signupUser} from './authActions';

const initialState = {
  // ...existing state...
  isCreated: false,
  signupLoading: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // ...existing reducers...
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
        state.userData = action.payload; // Update user data in state
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.signupLoading = false;
        state.isCreated = false;
        state.errorMessage = action.payload.message; // Update error message in state
      });
  },
});

export const {
  /* ...existing actions... */
} = authSlice.actions;

export default authSlice.reducer;
