import { Game, Result } from "@firebaseTypes/base";
import { AppDispatch, RootState } from "../app/store";
import { gameSlice } from "../features/Game/GameSlice";
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
  selectGameIsLoading,
  selectLetterChecking,
  selectQuestionNumber,
  selectResults,
} from "../selectors";

const LIFES_COUNT = 5;

export const resetAll = () => (dispatch: AppDispatch) => {
  dispatch(resultsSlice.actions.reset());
  dispatch(gameSlice.actions.reset());
  saveToLocalStorage({ results: [], currentGame: null });
};

const addResult =
  (game: Game, success: boolean) =>
  (dispatch: AppDispatch, getState: () => RootState) => {
    const result: Result = { ...game, success, endTimestamp: Date.now() };
    dispatch(resultsSlice.actions.addResult(result));
    dispatch(gameSlice.actions.setResultToShow(result));
    dispatch(gameSlice.actions.setGame(null));
    const results = selectResults(getState());
    updateLocalStorage({ results, currentGame: null });
  };

const updateGame = (game: Game) => (dispatch: AppDispatch) => {
  dispatch(gameSlice.actions.setGame(game));
  dispatch(gameSlice.actions.setResultToShow(null));
  updateLocalStorage({ currentGame: game });
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
        updateGame({
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

export const checkLetter =
  (letter: string) =>
  async (dispatch: AppDispatch, getState: () => RootState) => {
    const letterChecking = selectLetterChecking(getState());
    if (letterChecking) return;

    const currentGame = selectCurrentGame(getState());
    if (!currentGame) return;
    const newLetters = currentGame.letters + letter;
    dispatch(gameSlice.actions.setLetterChecking(letter));
    try {
      const { data: question } = await firebaseFunctionCheckResult(
        currentGame.id,
        newLetters
      );

      const letterIsCorrect = question.word.indexOf(letter) !== -1;
      const lifes = currentGame.lifes - (letterIsCorrect ? 0 : 1);
      const finished = question.word.indexOf("?") === -1 || lifes < 1;

      const gameUpdated: Game = {
        ...currentGame,
        ...question,
        letters: newLetters,
        lifes,
        finished,
      };

      dispatch(updateGame(gameUpdated));

      if (finished) {
        dispatch(addResult(gameUpdated, gameUpdated.lifes > 0));
      }
    } catch (e) {
      console.error("ERROR ON REQUEST", e);
      alert("Sorry, error!");
    } finally {
      dispatch(gameSlice.actions.setLetterChecking(""));
    }
  };
