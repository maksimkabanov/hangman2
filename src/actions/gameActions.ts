import { Game, Result } from "@firebaseTypes/base";
import { AppDispatch, RootState } from "../app/store";
import { gameSlice } from "../features/Game/GameSlice";
import { resultsSlice } from "../features/Results/ResultsSlice";
import { firebaseFunctionGetQuestion } from "../providers/firebase/firebaseApi";
import {
  saveToLocalStorage,
  updateLocalStorage,
} from "../providers/localStorage";
import {
  selectGameIsLoading,
  selectQuestionNumber,
  selectResults,
} from "../selectors";

const LIFES_COUNT = 5;

export const resetAll = () => (dispatch: AppDispatch) => {
  dispatch(resultsSlice.actions.reset());
  dispatch(gameSlice.actions.reset());
  saveToLocalStorage({ results: [], currentGame: null });
};

export const addResultThunk =
  (game: Game) => (dispatch: AppDispatch, getState: () => RootState) => {
    const lettersSet = new Set(game.letters);
    const result: Result = {
      ...game,
      endTimestamp: Date.now(),
      success: game.word.split("").every((l) => lettersSet.has(l)),
    };
    dispatch(resultsSlice.actions.addResult(result));
    dispatch(gameSlice.actions.setResultToShow(result));
    dispatch(gameSlice.actions.setGame(null));
    const results = selectResults(getState());
    updateLocalStorage({ results, currentGame: null });
  };

export const updateGameThunk = (game: Game) => (dispatch: AppDispatch) => {
  dispatch(gameSlice.actions.setGame(game));
  dispatch(gameSlice.actions.setResultToShow(null));
  if (game.finished) {
    dispatch(addResultThunk(game));
  } else {
    updateLocalStorage({ currentGame: game });
  }
};

export const startNewGame =
  () => async (dispatch: AppDispatch, getState: () => RootState) => {
    const gameIsLoading = selectGameIsLoading(getState());
    if (gameIsLoading) return;

    const currentNumber = selectQuestionNumber(getState());
    dispatch(gameSlice.actions.setGameIsLoading(true));
    dispatch(gameSlice.actions.setResultToShow(null));
    dispatch(gameSlice.actions.setGame(null));
    try {
      const { data: question } = await firebaseFunctionGetQuestion(
        currentNumber + 1
      );
      dispatch(
        updateGameThunk({
          ...question,
          lifes: LIFES_COUNT,
          letters: "",
          startTimestamp: Date.now(),
          finished: false,
        })
      );
    } catch (e) {
      console.error("ERROR ON REQUEST", e);
      alert("Sorry, error!");
    } finally {
      dispatch(gameSlice.actions.setGameIsLoading(false));
    }
  };
