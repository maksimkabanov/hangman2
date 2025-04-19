import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Game, Result } from "@firebaseTypes/base";
import { getLocalStorageValue } from "../../providers/localStorage";

type StateType = {
  gameIsLoading: boolean;
  letterCkecking: string;
  game: Game | undefined | null;
  resultToShow: Result | undefined | null;
};

/**
 * Initial state for the game slice
 * @type {StateType}
 */
const initialState: StateType = {
  gameIsLoading: false,
  letterCkecking: "",
  game: getLocalStorageValue()?.currentGame as Game | undefined | null,
  resultToShow: undefined as Result | undefined | null,
};

/**
 * Redux slice for managing game state
 * Handles game loading, letter checking, current game and result display
 *
 * @module GameSlice
 */
export const gameSlice = createSlice({
  name: "CURRENT_GAME",
  initialState,
  reducers: {
    /**
     * Sets the current game
     * @param {StateType} state - Current state
     * @param {PayloadAction<Game | null>} action - Action containing the game to set
     */
    setGame: (state: StateType, action: PayloadAction<Game | null>) => {
      state.game = action.payload;
    },
    /**
     * Sets the game loading state
     * @param {StateType} state - Current state
     * @param {PayloadAction<boolean>} action - Action containing the loading state
     */
    setGameIsLoading: (state: StateType, action: PayloadAction<boolean>) => {
      state.gameIsLoading = action.payload;
    },
    /**
     * Sets the currently checking letter
     * @param {StateType} state - Current state
     * @param {PayloadAction<string>} action - Action containing the letter being checked
     */
    setLetterChecking: (state: StateType, action: PayloadAction<string>) => {
      state.letterCkecking = action.payload;
    },
    /**
     * Sets the result to display
     * @param {StateType} state - Current state
     * @param {PayloadAction<Result | null>} action - Action containing the result to show
     */
    setResultToShow: (
      state: StateType,
      action: PayloadAction<Result | null>
    ) => {
      state.resultToShow = action.payload;
    },
    /**
     * Resets the game state
     * @param {StateType} state - Current state
     */
    reset: (state: StateType) => {
      state.game = undefined;
      state.resultToShow = undefined;
    },
  },
});
