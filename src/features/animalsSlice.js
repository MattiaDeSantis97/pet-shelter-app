import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchLocalAnimals = createAsyncThunk(
  'animals/fetchLocal',
  async () => {
    const response = await fetch('http://localhost:3001/local_animals');
    if (!response.ok) throw new Error('Errore recupero dati');
    return response.json();
  }
);

export const addLocalAnimal = createAsyncThunk(
  'animals/addLocal',
  async (animalData) => {
    const response = await fetch('http://localhost:3001/local_animals', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(animalData),
    });
    if (!response.ok) throw new Error('Errore salvataggio dati');
    return response.json();
  }
);

export const updateLocalAnimal = createAsyncThunk(
  'animals/updateLocal',
  async ({ id, ...animalData }) => {
    const response = await fetch(`http://localhost:3001/local_animals/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, ...animalData }),
    });
    if (!response.ok) throw new Error('Errore aggiornamento');
    return response.json();
  }
);

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
      .addCase(fetchLocalAnimals.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addLocalAnimal.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(updateLocalAnimal.fulfilled, (state, action) => {
        const index = state.items.findIndex(a => a.id === action.payload.id);
        if (index !== -1) state.items[index] = action.payload;
      });
  },
});

export default animalsSlice.reducer;