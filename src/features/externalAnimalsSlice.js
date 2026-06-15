import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async thunk per recuperare animali esterni da un'API pubblica, con fallback sicuro in caso di errori o assenza di connessione
export const fetchExternalAnimals = createAsyncThunk(
  'externalAnimals/fetchAnimals',
  async () => {
    try {
      // API pubblica senza restrizioni CORS per ottenere immagini casuali di cani, simulando animali esterni
      const response = await fetch('https://dog.ceo/api/breeds/image/random/6');
      if (!response.ok) throw new Error('API non raggiungibile');
      
      const data = await response.json();
      
      return data.message.map((imgUrl, index) => ({
        id: `ext-${index}`,
        name: `Ospite Internazionale ${index + 1}`,
        species: 'Cane',
        description: 'Animale recuperato da un partner internazionale, in attesa di controlli veterinari.',
        image: imgUrl,
        origin: 'API Esterna (dog.ceo)'
      }));
    } catch (error) {
      // Fallback sicuro se l'utente non ha connessione
      return [
        { id: 'ext-1', name: 'Abissino', species: 'Gatto', description: 'Gatto attivo.', image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=600&q=80', origin: 'Partner' },
        { id: 'ext-2', name: 'Certosino', species: 'Gatto', description: 'Robusto e silenzioso.', image: 'https://images.unsplash.com/photo-1513360371669-4adf3dd7dff8?w=600&q=80', origin: 'Partner' },
        { id: 'ext-3', name: 'Bombay', species: 'Gatto', description: 'Simile a una pantera.', image: 'https://images.unsplash.com/photo-1501820488136-72669149e0d4?w=600&q=80', origin: 'Partner' },
        { id: 'ext-4', name: 'Golden Retriever', species: 'Cane', description: 'Molto socievole.', image: 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=600&q=80', origin: 'Partner' },
        { id: 'ext-5', name: 'Beagle', species: 'Cane', description: 'Vivace e curioso.', image: 'https://images.pexels.com/photos/4681107/pexels-photo-4681107.jpeg?w=600', origin: 'Partner' },
        { id: 'ext-6', name: 'Pastore Tedesco', species: 'Cane', description: 'Leale e coraggioso.', image: 'https://images.pexels.com/photos/333083/pexels-photo-333083.jpeg?w=600', origin: 'Partner' }
      ];
    }
  }
);

// Slice per gestire lo stato degli animali esterni, con supporto per operazioni asincrone
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