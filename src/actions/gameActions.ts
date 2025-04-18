import { AppDispatch, RootState } from "../app/store";
import { currentGameSlice } from "../features/CurrentGame/CurrentGameSlice";
import { resultsSlice } from "../features/Results/ResultsSlice";
import { firebaseFunctionGetQuestion } from "../providers/firebase/firebaseApi";
import { saveToLocalStorage } from "../providers/localStorage";
import { selectQuestionNumber } from "../selectors";

const LIFES_COUNT = 5;

export const resetAll = () => (dispatch: AppDispatch) => {
  dispatch(resultsSlice.actions.reset());
  dispatch(currentGameSlice.actions.reset());
  saveToLocalStorage({ results: [], currentGame: null });
};

export const startNewGame =
  () => async (dispatch: AppDispatch, getState: () => RootState) => {
    const currentNumber = selectQuestionNumber(getState());
    const { data: question } = await firebaseFunctionGetQuestion(
      currentNumber + 1
    );
    dispatch(
      currentGameSlice.actions.setGame({
        questionId: question.id,
        lifes: LIFES_COUNT,
        question: question.question,
        lettersUsed: "",
        startTimestamp: Date.now(),
        number: question.number,
      })
    );
  };
