import { createSlice } from '@reduxjs/toolkit';

const payoutSlice = createSlice({
  name: 'payout',
  initialState: {
    rate: 20,
    data: [],
  },
  reducers: {
    setRate: (state, action) => {
      state.rate = action.payload;
    },
    addPayoutData: (state, action) => {
      state.data.push(action.payload);
    },
  },
});

export const { setRate, addPayoutData } = payoutSlice.actions;
export default payoutSlice.reducer;
