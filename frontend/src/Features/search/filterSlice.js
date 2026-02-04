import { createSlice } from "@reduxjs/toolkit";

const filtersSlice = createSlice({
  name: "filters",
  initialState: {
    arrivalTime: [],
    departureTime: [],
    busType: [],
    amenities: []
  },
  reducers: {
    toggleFilter: (state, action) => {
      const { filterKey, value } = action.payload;

      if (!state[filterKey]) return;

      if (state[filterKey].includes(value)) {
        state[filterKey] = state[filterKey].filter(
          (item) => item !== value
        );
      } else {
        state[filterKey].push(value);
      }
    },

    clearFilters: () => ({
      arrivalTime: [],
      departureTime: [],
      busType: [],
      amenities: []
    })
  }
});

export const { toggleFilter, clearFilters } = filtersSlice.actions;
export default filtersSlice.reducer;
