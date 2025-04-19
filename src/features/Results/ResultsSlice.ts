import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Result } from "@firebaseTypes/base";
import { getLocalStorageValue } from "../../providers/localStorage";

/**
 * State type for the results slice
 */
type StateType = {
  /** Array of game results */
  results: Result[];
};

/**
 * Initial state for the results slice
 * Loads saved results from localStorage or uses an empty array
 */
const initialState: StateType = {
  results: getLocalStorageValue()?.results ?? [],
};

/**
 * Redux slice for managing game results
 *
 * @module ResultsSlice
 */
export const resultsSlice = createSlice({
  name: "RESULTS",
  initialState,
  reducers: {
    /**
     * Sets a new array of results
     * @param {StateType} state - Current state
     * @param {PayloadAction<Result[]>} action - Action with array of results
     */
    setResults: (state: StateType, action: PayloadAction<Result[]>) => {
      state.results = action.payload;
    },
    /**
     * Adds a new result to the array if it doesn't exist
     * @param {StateType} state - Current state
     * @param {PayloadAction<Result>} action - Action with game result
     */
    addResult: (state: StateType, action: PayloadAction<Result>) => {
      if (!state.results.some((result) => result.id === action.payload.id)) {
        state.results.push(action.payload);
      }
    },
    /**
     * Clears the results array
     * @param {StateType} state - Current state
     */
    reset: (state: StateType) => {
      state.results = [];
    },
  },
});
