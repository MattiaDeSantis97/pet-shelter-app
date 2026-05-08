import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const getLocalRequests = () => JSON.parse(localStorage.getItem('adoption_requests')) || [];
const saveLocalRequests = (data) => localStorage.setItem('adoption_requests', JSON.stringify(data));

export const submitAdoptionRequest = createAsyncThunk(
  'adoption/submit',
  async (requestData) => {
    const requests = getLocalRequests();
    const newRequest = { ...requestData, id: Date.now().toString(), status: 'in attesa', adminNotes: '' };
    requests.push(newRequest);
    saveLocalRequests(requests);
    return newRequest;
  }
);

export const fetchAdoptionRequests = createAsyncThunk(
  'adoption/fetchAll',
  async () => {
    return getLocalRequests();
  }
);

export const updateRequestStatus = createAsyncThunk(
  'adoption/updateStatus',
  async ({ id, status, adminNotes }) => {
    const requests = getLocalRequests();
    const index = requests.findIndex(r => r.id === id);
    if (index !== -1) {
      requests[index] = { ...requests[index], status, adminNotes };
      saveLocalRequests(requests);
      return requests[index];
    }
    throw new Error('Richiesta non trovata');
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