import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchExternalAnimals = createAsyncThunk(
  'externalAnimals/fetchAnimals',
  async () => {
    try {
      const [catsRes, dogsRes] = await Promise.all([
        fetch('https://api.thecatapi.com/v1/breeds?limit=3'),
        fetch('https://api.thedogapi.com/v1/breeds?limit=3')
      ]);

      const catsData = await catsRes.json();
      const dogsData = await dogsRes.json();

      const cats = catsData.slice(0, 3).map(cat => ({
        id: `cat-${cat.id}`,
        name: cat.name,
        species: 'Gatto',
        description: cat.description,
        image: cat.image?.url || "https://placehold.co/600x400?text=Gatto",
        origin: 'TheCatAPI'
      }));

      const dogs = dogsData.slice(0, 3).map(dog => ({
        id: `dog-${dog.id}`,
        name: dog.name,
        species: 'Cane',
        description: dog.temperament || 'Un fedele compagno in cerca di casa.',
        image: dog.reference_image_id 
          ? `https://cdn2.thedogapi.com/images/${dog.reference_image_id}.jpg` 
          : "https://placehold.co/600x400?text=Cane",
        origin: 'TheDogAPI'
      }));

      return [...cats, ...dogs];
    } catch (error) {
      console.warn("Errore API Esterne, uso dati di backup.");
      return [
        { id: 'b1', name: 'Abissino', species: 'Gatto', description: 'Gatto curioso.', image: '/cat1.jpeg', origin: 'Locale' },
        { id: 'b2', name: 'Certosino', species: 'Gatto', description: 'Gatto calmo.', image: '/cat2.jpeg', origin: 'Locale' },
        { id: 'b3', name: 'Bombay', species: 'Gatto', description: 'Gatto affettuoso.', image: '/cat3.jpeg', origin: 'Locale' },
        { id: 'b4', name: 'Golden Retriever', species: 'Cane', description: 'Amichevole.', image: 'https://placehold.co/600x400?text=Cane1', origin: 'Locale' },
        { id: 'b5', name: 'Beagle', species: 'Cane', description: 'Vivace.', image: 'https://placehold.co/600x400?text=Cane2', origin: 'Locale' },
        { id: 'b6', name: 'Labrador', species: 'Cane', description: 'Leale.', image: 'https://placehold.co/600x400?text=Cane3', origin: 'Locale' }
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