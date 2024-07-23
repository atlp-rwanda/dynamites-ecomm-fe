import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface ProfileState {
  loading: boolean;
  error: string | null;
  success: boolean;
}

const initialState: ProfileState = {
  loading: false,
  error: null,
  success: false,
};

const API_BASE_URL = import.meta.env.VITE_API_URL;

export const updateProfile = createAsyncThunk(
  'profile/updateProfile',
  async (profileData: {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
  }) => {
    const { id, ...data } = profileData;
    const response = await axios.put(
      `${API_BASE_URL}/updateProfile/${id}`,
      data
    );
    return response.data;
  }
);

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    resetStatus: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(updateProfile.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to update profile data';
        state.success = false;
      });
  },
});

export const { resetStatus } = profileSlice.actions;
export default profileSlice.reducer;
