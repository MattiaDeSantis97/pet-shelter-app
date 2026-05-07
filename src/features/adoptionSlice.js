import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const submitAdoptionRequest = createAsyncThunk(
  'adoption/submit',
  async (requestData) => {
    const response = await fetch('http://localhost:3001/adoption_requests', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...requestData, status: 'in attesa', adminNotes: '' }),
    });
    if (!response.ok) throw new Error('Errore invio richiesta');
    return response.json();
  }
);

export const fetchAdoptionRequests = createAsyncThunk(
  'adoption/fetchAll',
  async () => {
    const response = await fetch('http://localhost:3001/adoption_requests');
    if (!response.ok) throw new Error('Errore recupero richieste');
    return response.json();
  }
);

export const updateRequestStatus = createAsyncThunk(
  'adoption/updateStatus',
  async ({ id, status, adminNotes }) => {
    const response = await fetch(`http://localhost:3001/adoption_requests/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status, adminNotes }),
    });
    if (!response.ok) throw new Error('Errore aggiornamento');
    return response.json();
  }
);

const adoptionSlice = createSlice({
  name: 'adoption',
  initialState: { requests: [], status: 'idle', error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAdoptionRequests.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAdoptionRequests.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.requests = action.payload;
      })
      .addCase(fetchAdoptionRequests.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      // FIX: aggiunge la nuova richiesta allo state locale
      .addCase(submitAdoptionRequest.fulfilled, (state, action) => {
        state.requests.push(action.payload);
      })
      .addCase(updateRequestStatus.fulfilled, (state, action) => {
        const index = state.requests.findIndex(req => req.id === action.payload.id);
        if (index !== -1) state.requests[index] = action.payload;
      });
  },
});

export default adoptionSlice.reducer;