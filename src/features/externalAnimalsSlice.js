import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchExternalAnimals = createAsyncThunk(
  'externalAnimals/fetchAnimals',
  async () => {
    // Array statico: NESSUNA CHIAMATA API ESTERNA
    return [
      { id: 'ext-1', name: 'Abissino', species: 'Gatto', description: 'Gatto attivo, curioso e molto intelligente.', image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=600&q=80', origin: 'Partner Esterno' },
      { id: 'ext-2', name: 'Certosino', species: 'Gatto', description: 'Robusto, silenzioso e leale.', image: 'https://images.unsplash.com/photo-1513360371669-4adf3dd7dff8?w=600&q=80', origin: 'Partner Esterno' },
      { id: 'ext-3', name: 'Bombay', species: 'Gatto', description: 'Affettuoso e giocherellone, simile a una pantera.', image: 'https://images.unsplash.com/photo-1501820488136-72669149e0d4?w=600&q=80', origin: 'Partner Esterno' },
      { id: 'ext-4', name: 'Golden Retriever', species: 'Cane', description: 'Estremamente socievole, paziente e devoto.', image: 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=600&q=80', origin: 'Partner Esterno' },
      { id: 'ext-5', name: 'Beagle', species: 'Cane', description: 'Vivace e curioso, dotato di un fiuto eccezionale.', image: 'https://images.pexels.com/photos/4681107/pexels-photo-4681107.jpeg?auto=compress&cs=tinysrgb&w=600', origin: 'Partner Esterno' },
      { id: 'ext-6', name: 'Pastore Tedesco', species: 'Cane', description: 'Leale, coraggioso e altamente addestrabile.', image: 'https://images.pexels.com/photos/333083/pexels-photo-333083.jpeg?auto=compress&cs=tinysrgb&w=600', origin: 'Partner Esterno' }
    ];
  }
);

const externalAnimalsSlice = createSlice({
  name: 'externalAnimals',
  initialState: { items: [], status: 'idle' },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchExternalAnimals.pending, (state) => { state.status = 'loading'; })
      .addCase(fetchExternalAnimals.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      });
  },
});

export default externalAnimalsSlice.reducer;