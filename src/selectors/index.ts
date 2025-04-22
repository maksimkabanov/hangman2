import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../app/store";

export const selectCurrentGameGame = (state: RootState) =>
  state.currentGame.game;
export const selectCurrentGameState = (state: RootState) => state.currentGame;
export const selectCurrentGameLifes = (state: RootState) =>
  state.currentGame.game?.lifes;
export const selectGameIsLoading = (state: RootState) =>
  state.currentGame.gameIsLoading;
export const selectLettersChecking = (state: RootState) =>
  state.currentGame.lettersChecking;
export const selectResultToShow = (state: RootState) =>
  state.currentGame.resultToShow;
export const selectResults = (state: RootState) => state.results.results;

export const selectQuestionNumber = createSelector(
  [selectCurrentGameGame, selectResults],
  (game, results) => {
    if (game?.number !== null && game?.number !== undefined) {
      return game.number;
    }

    return results.reduce(
      (acc, curr) => (curr.number > acc ? curr.number : acc),
      0
    );
  }
);
export const hasChancesSelector = createSelector(
  [selectCurrentGameLifes, selectLettersChecking],
  (lifes, lettersChecking) => {
    if (!lifes) return false;
    return lifes - lettersChecking.length > 0;
  }
);
