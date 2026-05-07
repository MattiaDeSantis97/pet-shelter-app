import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchExternalAnimals = createAsyncThunk(
  'externalAnimals/fetchAnimals',
  async () => {
    try {
      // Chiamate parallele a CatAPI e DogAPI
      const [catsRes, dogsRes] = await Promise.all([
        fetch('https://api.thecatapi.com/v1/breeds?limit=3'),
        fetch('https://api.thedogapi.com/v1/breeds?limit=3')
      ]);

      const catsData = await catsRes.json();
      const dogsData = await dogsRes.json();

      // Mappatura Gatti
      const cats = catsData.map(cat => ({
        id: `cat-${cat.id}`,
        name: cat.name,
        species: 'Gatto',
        description: cat.description,
        image: cat.image?.url || "/cat1.jpeg",
        origin: 'TheCatAPI'
      }));

      // Mappatura Cani
      const dogs = dogsData.map(dog => ({
        id: `dog-${dog.id}`,
        name: dog.name,
        species: 'Cane',
        description: dog.temperament || 'Un cane fedele e vivace in cerca di una casa.',
        image: `https://cdn2.thedogapi.com/images/${dog.reference_image_id}.jpg`,
        origin: 'TheDogAPI'
      }));

      return [...cats, ...dogs]; // Uniamo i 6 annunci
    } catch (error) {
      console.error("Errore API Esterne:", error);
      // Fallback locale in caso di errore rete/CORS
      return [
        { id: 'b1', name: 'Abissino', species: 'Gatto', description: 'Gatto attivo e curioso.', image: '/cat1.jpeg' },
        { id: 'b2', name: 'Golden Retriever', species: 'Cane', description: 'Amichevole e socievole.', image: 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=500' }
      ];
    }
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