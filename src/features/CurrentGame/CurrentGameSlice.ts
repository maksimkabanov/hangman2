import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Game } from "@firebaseTypes/base";
import { getLocalStorageValue } from "../../providers/localStorage";

const initialState = {
  game: getLocalStorageValue()?.currentGame as Game | undefined | null,
};

type StateType = typeof initialState;

export const currentGameSlice = createSlice({
  name: "CURRENT_GAME",
  initialState: initialState as StateType,
  reducers: {
    setGame: (state: StateType, action: PayloadAction<Game>) => {
      state.game = action.payload;
    },
    reset: (state: StateType) => {
      state.game = undefined;
    },
  },
});
