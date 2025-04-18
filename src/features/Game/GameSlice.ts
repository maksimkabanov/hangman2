import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Game, Result } from "@firebaseTypes/base";
import { getLocalStorageValue } from "../../providers/localStorage";

const initialState = {
  gameIsLoading: false,
  letterCkecking: "",
  game: getLocalStorageValue()?.currentGame as Game | undefined | null,
  resultToShow: undefined as Result | undefined | null,
};

type StateType = typeof initialState;

export const gameSlice = createSlice({
  name: "CURRENT_GAME",
  initialState: initialState as StateType,
  reducers: {
    setGame: (state: StateType, action: PayloadAction<Game | null>) => {
      state.game = action.payload;
    },
    setGameIsLoading: (state: StateType, action: PayloadAction<boolean>) => {
      state.gameIsLoading = action.payload;
    },
    setLetterChecking: (state: StateType, action: PayloadAction<string>) => {
      state.letterCkecking = action.payload;
    },
    setResultToShow: (
      state: StateType,
      action: PayloadAction<Result | null>
    ) => {
      state.resultToShow = action.payload;
    },
    reset: (state: StateType) => {
      state.game = undefined;
      state.resultToShow = undefined;
    },
  },
});
