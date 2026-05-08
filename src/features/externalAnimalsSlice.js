import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchExternalAnimals = createAsyncThunk(
  'externalAnimals/fetchAnimals',
  async () => {
    try {
      // Chiamate parallele a CatAPI e DogAPI con limite a 3 ciascuna
      const [catsRes, dogsRes] = await Promise.all([
        fetch('https://api.thecatapi.com/v1/breeds?limit=3'),
        fetch('https://api.thedogapi.com/v1/breeds?limit=3')
      ]);

      const catsData = await catsRes.json();
      const dogsData = await dogsRes.json();

      const cats = catsData.map(cat => ({
        id: `cat-${cat.id}`,
        name: cat.name,
        species: 'Gatto',
        description: cat.description,
        image: cat.image?.url || "https://placehold.co/600x400?text=Gatto",
        origin: 'TheCatAPI'
      }));

      const dogs = dogsData.map(dog => ({
        id: `dog-${dog.id}`,
        name: dog.name,
        species: 'Cane',
        description: dog.temperament || 'Un compagno fedele in cerca di casa.',
        image: dog.reference_image_id 
          ? `https://cdn2.thedogapi.com/images/${dog.reference_image_id}.jpg` 
          : "https://placehold.co/600x400?text=Cane",
        origin: 'TheDogAPI'
      }));

      return [...cats, ...dogs]; // Totale 6 annunci
    } catch (error) {
      console.error("Errore API Esterne:", error);
      return [];
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