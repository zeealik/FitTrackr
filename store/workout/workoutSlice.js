// workoutSlice.js
import {createSlice} from '@reduxjs/toolkit';
import {
  fetchWorkoutRecords,
  fetchWorkoutRecordsByID,
  saveWorkoutRecord,
} from './workoutActions';

const initialState = {
  workoutRecords: [],
};

const workoutSlice = createSlice({
  name: 'workout',
  initialState,
  reducers: {
    saveWorkout: (state, action) => {
      state.workoutRecords.push(action.payload);
    },
    resetWorkouts: state => {
      state.workoutRecords = [];
    },
  },
  extraReducers: builder => {
    builder
      .addCase(saveWorkoutRecord.fulfilled, (state, action) => {
        state.workoutRecords = action.payload;
      })
      .addCase(saveWorkoutRecord.rejected, (state, action) => {
        console.error(action.payload); // Should contain error message
      })
      .addCase(fetchWorkoutRecords.fulfilled, (state, action) => {
        state.workoutRecords = action.payload; // Update workoutRecords with fetched data
      })
      .addCase(fetchWorkoutRecords.rejected, (state, action) => {
        console.error(action.payload); // Should contain error message
      })
      .addCase(fetchWorkoutRecordsByID.fulfilled, (state, action) => {
        state.workoutRecords = action.payload; // Update workoutRecords with fetched data
      })
      .addCase(fetchWorkoutRecordsByID.rejected, (state, action) => {
        console.error(action.payload); // Should contain error message
      });
  },
});

export const {saveWorkout, resetWorkouts} = workoutSlice.actions;

export default workoutSlice.reducer;
