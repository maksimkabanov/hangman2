import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Result } from "@firebaseTypes/base";
import { getLocalStorageValue } from "../../providers/localStorage";

const initialState = {
  results: getLocalStorageValue()?.results ?? ([] as Result[]),
};

type StateType = typeof initialState;

export const resultsSlice = createSlice({
  name: "RESULTS",
  initialState: initialState as StateType,
  reducers: {
    setResults: (state: StateType, action: PayloadAction<Result[]>) => {
      state.results = action.payload;
    },
    addResult: (state: StateType, action: PayloadAction<Result>) => {
      state.results.push(action.payload);
    },
    reset: (state: StateType) => {
      state.results = [];
    },
  },
});
