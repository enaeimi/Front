// src/features/projects/projectSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import { projectApi } from '../../services/projectApi';

// Récupérer les données du localStorage au démarrage
const loadState = () => {
  try {
    const serializedState = localStorage.getItem('projects');
    if (serializedState === null) {
      return { items: [] };
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return { items: [] };
  }
};

// export const fetchProjects = createAsyncThunk(
//   'projects/fetchProjects',
//   async () => {
//     const response = await projectApi.getAll();
//     return response.data;
//   }
// );

const projectSlice = createSlice({
  name: 'projects',
  initialState: loadState(),
  reducers: {
    addProject: (state, action) => {
      state.items.push(action.payload);
      // Sauvegarder dans localStorage
      localStorage.setItem('projects', JSON.stringify(state));
    },
    deleteProject: (state, action) => {
      state.items = state.items.filter(project => project.id !== action.payload);
      // Sauvegarder dans localStorage
      localStorage.setItem('projects', JSON.stringify(state));
    },
    modifyProject: (state, action) => {
      const { id, updates } = action.payload;
      const index = state.items.findIndex(project => project.id === id);
      if (index !== -1) {
        state.items[index] = { ...state.items[index], ...updates };
        // Sauvegarder dans localStorage
        localStorage.setItem('projects', JSON.stringify(state));
      }
    },
  }
});

// const projectSlice = createSlice({
//   name: 'projects',
//   initialState: {
//     items: [],
//     status: 'idle',
//     error: null,
//   },
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchProjects.pending, (state) => {
//         state.status = 'loading';
//       })
//       .addCase(fetchProjects.fulfilled, (state, action) => {
//         state.status = 'succeeded';
//         state.items = action.payload;
//       })
//       .addCase(fetchProjects.rejected, (state, action) => {
//         state.status = 'failed';
//         state.error = action.error.message;
//       });
//   },
// });
export const { addProject, deleteProject } = projectSlice.actions;

export default projectSlice.reducer;