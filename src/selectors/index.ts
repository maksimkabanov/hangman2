import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../app/store";

export const selectCurrentGame = (state: RootState) => state.currentGame.game;
export const selectResultToShow = (state: RootState) =>
  state.currentGame.resultToShow;
export const selectResults = (state: RootState) => state.results.results;

export const selectQuestionNumber = createSelector(
  [selectCurrentGame, selectResults],
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
