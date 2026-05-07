import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// FIX: rimosso rejectWithValue non utilizzato (il catch usa dati di fallback, non reject)
export const fetchExternalAnimals = createAsyncThunk(
  'externalAnimals/fetchAnimals',
  async () => {
    try {
      const response = await fetch('https://api.thecatapi.com/v1/breeds?limit=3');
      if (!response.ok) throw new Error('CORS o Errore Rete');
      const data = await response.json();
      return data.map(breed => ({
        id: breed.id,
        name: breed.name,
        description: breed.description,
        image: breed.image?.url || '/cat1.jpeg' || '/cat2.jpeg' || '/cat3.jpeg', // FIX: gestisce assenza di immagine
      }));
    } catch {
      console.warn('API non raggiungibile. Caricamento immagini locali dalla cartella public.');
      return [
        { id: 'b1', name: 'Abissino (Locale)', description: 'Gatto attivo, curioso e molto intelligente. Ama interagire con la famiglia.', image: '/cat1.jpeg' },
        { id: 'b2', name: 'Bombay (Locale)', description: 'Una "pantera in miniatura" domestica. Affettuoso e giocherellone.', image: '/cat2.jpeg' },
        { id: 'b3', name: 'Certosino (Locale)', description: 'Robusto, silenzioso e leale. Noto per il suo sorriso enigmatico.', image: '/cat3.jpeg' },
      ];
    }
  }
);

const externalAnimalsSlice = createSlice({
  name: 'externalAnimals',
  initialState: { items: [], status: 'idle', error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchExternalAnimals.pending, (state) => { state.status = 'loading'; })
      .addCase(fetchExternalAnimals.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchExternalAnimals.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default externalAnimalsSlice.reducer;