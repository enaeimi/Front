// src/features/projects/projectSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { projectApi } from '../../services/projectApi';

export const fetchProjects = createAsyncThunk(
  'projects/fetchProjects',
  async () => {
    const response = await projectApi.getAll();
    return response.data;
  }
);

const projectSlice = createSlice({
  name: 'projects',
  initialState: {
    items: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProjects.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProjects.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchProjects.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default projectSlice.reducer;