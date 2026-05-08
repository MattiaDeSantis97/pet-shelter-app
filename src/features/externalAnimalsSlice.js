import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchExternalAnimals = createAsyncThunk(
  'externalAnimals/fetchAnimals',
  async () => {
    try {
      const [catsRes, dogsRes] = await Promise.all([
        fetch('https://api.thecatapi.com/v1/breeds?limit=3'),
        fetch('https://api.thedogapi.com/v1/breeds?limit=3')
      ]);

      // VALIDAZIONE FONDAMENTALE: intercetta l'errore 403 di TheDogAPI
      if (!catsRes.ok || !dogsRes.ok) {
        throw new Error('API esterna non autorizzata (403) o irraggiungibile');
      }

      const catsData = await catsRes.json();
      const dogsData = await dogsRes.json();

      const cats = catsData.slice(0, 3).map(cat => ({
        id: `cat-${cat.id}`,
        name: cat.name,
        species: 'Gatto',
        description: cat.description || 'Nessuna descrizione disponibile.',
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
      // DATI DI BACKUP: garantisce sempre 6 annunci se le API falliscono
      return [
        { id: 'b1', name: 'Abissino', species: 'Gatto', description: 'Gatto attivo, curioso e molto intelligente.', image: '/cat1.jpeg', origin: 'Backup Locale' },
        { id: 'b2', name: 'Certosino', species: 'Gatto', description: 'Robusto, silenzioso e leale.', image: '/cat2.jpeg', origin: 'Backup Locale' },
        { id: 'b3', name: 'Bombay', species: 'Gatto', description: 'Affettuoso e giocherellone, simile a una pantera.', image: '/cat3.jpeg', origin: 'Backup Locale' },
        { id: 'b4', name: 'Golden Retriever', species: 'Cane', description: 'Estremamente socievole, paziente e devoto.', image: 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=600&q=80', origin: 'Backup Locale' },
        { id: 'b5', name: 'Beagle', species: 'Cane', description: 'Vivace e curioso, dotato di un fiuto eccezionale.', image: 'https://images.unsplash.com/photo-1537151608804-ea6f1cb3ba6c?w=600&q=80', origin: 'Backup Locale' },
        { id: 'b6', name: 'Pastore Tedesco', species: 'Cane', description: 'Leale, coraggioso e altamente addestrabile.', image: 'https://images.unsplash.com/photo-1589976267223-9524e93096cc?w=600&q=80', origin: 'Backup Locale' }
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