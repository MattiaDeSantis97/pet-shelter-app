import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const getLocalAnimals = () => JSON.parse(localStorage.getItem('local_animals')) || [];
const saveLocalAnimals = (data) => localStorage.setItem('local_animals', JSON.stringify(data));

export const fetchLocalAnimals = createAsyncThunk('animals/fetchLocal', async () => {
  return getLocalAnimals();
});

export const addLocalAnimal = createAsyncThunk('animals/addLocal', async (animalData) => {
  const animals = getLocalAnimals();
  const newAnimal = { ...animalData, id: Date.now().toString() };
  animals.push(newAnimal);
  saveLocalAnimals(animals);
  return newAnimal;
});

export const updateLocalAnimal = createAsyncThunk('animals/updateLocal', async (animalData) => {
  const animals = getLocalAnimals();
  const index = animals.findIndex(a => a.id === animalData.id);
  if (index !== -1) {
    animals[index] = animalData;
    saveLocalAnimals(animals);
  }
  return animalData;
});

export const deleteLocalAnimal = createAsyncThunk('animals/deleteLocal', async (id) => {
  let animals = getLocalAnimals();
  animals = animals.filter(a => a.id !== id);
  saveLocalAnimals(animals);
  return id;
});

const animalsSlice = createSlice({
  name: 'animals',
  initialState: { items: [], status: 'idle', error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLocalAnimals.pending, (state) => { state.status = 'loading'; })
      .addCase(fetchLocalAnimals.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(addLocalAnimal.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(updateLocalAnimal.fulfilled, (state, action) => {
        const index = state.items.findIndex(a => a.id === action.payload.id);
        if (index !== -1) state.items[index] = action.payload;
      })
      .addCase(deleteLocalAnimal.fulfilled, (state, action) => {
        state.items = state.items.filter(a => a.id !== action.payload);
      });
  },
});

export default animalsSlice.reducer;