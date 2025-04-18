import { Game, Result } from "@firebaseTypes/base";
import { AppDispatch, RootState } from "../app/store";
import { currentGameSlice } from "../features/CurrentGame/CurrentGameSlice";
import { resultsSlice } from "../features/Results/ResultsSlice";
import {
  firebaseFunctionCheckResult,
  firebaseFunctionGetQuestion,
} from "../providers/firebase/firebaseApi";
import {
  saveToLocalStorage,
  updateLocalStorage,
} from "../providers/localStorage";
import {
  selectCurrentGame,
  selectQuestionNumber,
  selectResults,
} from "../selectors";

const LIFES_COUNT = 5;

export const resetAll = () => (dispatch: AppDispatch) => {
  dispatch(resultsSlice.actions.reset());
  dispatch(currentGameSlice.actions.reset());
  saveToLocalStorage({ results: [], currentGame: null });
};

const addResult =
  (game: Game, success: boolean) =>
  (dispatch: AppDispatch, getState: () => RootState) => {
    const result: Result = { ...game, success, endTimestamp: Date.now() };
    dispatch(resultsSlice.actions.addResult(result));
    const results = selectResults(getState());
    updateLocalStorage({ results });
  };

const updateGame = (game: Game) => (dispatch: AppDispatch) => {
  dispatch(currentGameSlice.actions.setGame(game));
  updateLocalStorage({ currentGame: game });
};

export const startNewGame =
  () => async (dispatch: AppDispatch, getState: () => RootState) => {
    const currentNumber = selectQuestionNumber(getState());
    const { data: question } = await firebaseFunctionGetQuestion(
      currentNumber + 1
    );
    dispatch(
      updateGame({
        ...question,
        lifes: LIFES_COUNT,
        letters: "",
        startTimestamp: Date.now(),
      })
    );
  };

export const checkLetter =
  (letter: string) =>
  async (dispatch: AppDispatch, getState: () => RootState) => {
    const currentGame = selectCurrentGame(getState());
    if (!currentGame) return;
    const newLetters = currentGame.letters + letter;
    const { data: question } = await firebaseFunctionCheckResult(
      currentGame.id,
      newLetters
    );

    const letterIsCorrect = question.word.indexOf(letter) !== -1;

    const gameUpdated: Game = {
      ...currentGame,
      ...question,
      letters: newLetters,
      lifes: currentGame.lifes - (letterIsCorrect ? 0 : 1),
    };

    if (question.word.indexOf("?") === -1 || gameUpdated.lifes < 1) {
      dispatch(addResult(gameUpdated, gameUpdated.lifes > 0));
    }

    dispatch(updateGame(gameUpdated));
  };
