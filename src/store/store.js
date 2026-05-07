import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/authSlice';
import animalsReducer from '../features/animalsSlice';
import adoptionReducer from '../features/adoptionSlice';
import externalAnimalsReducer from '../features/externalAnimalsSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    animals: animalsReducer,
    adoption: adoptionReducer,
    externalAnimals: externalAnimalsReducer,
  },
});