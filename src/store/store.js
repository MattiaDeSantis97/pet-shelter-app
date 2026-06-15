import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/authSlice';
import animalsReducer from '../features/animalsSlice';
import adoptionReducer from '../features/adoptionSlice';
import externalAnimalsReducer from '../features/externalAnimalsSlice';

// Configurazione dello store Redux, combinando i reducer per autenticazione, animali locali, richieste di adozione e animali esterni, con supporto per operazioni asincrone e persistenza su localStorage
export const store = configureStore({
  reducer: {
    auth: authReducer,
    animals: animalsReducer,
    adoption: adoptionReducer,
    externalAnimals: externalAnimalsReducer,
  },
});