// checkLetterThunk.ts
import { AppDispatch, RootState } from "../app/store";
import { firebaseFunctionCheckResult } from "../providers/firebase/firebaseApi";
import { gameSlice } from "../features/Game/GameSlice";
import { selectCurrentGameGame, selectLettersChecking } from "../selectors";
import { updateGameThunk } from "./gameActions";

let currentRequestId = 0;
let debounceTimer: NodeJS.Timeout | null = null;

type RequestInfo = {
  id: number;
  lettersChecking: string;
  responded: boolean;
  error?: unknown;
};

let pendingRequests: RequestInfo[] = [];

export const checkLetterThunk =
  (letter: string) =>
  async (dispatch: AppDispatch, getState: () => RootState) => {
    const state = getState();
    const lettersChecking = selectLettersChecking(state);
    if (lettersChecking.indexOf(letter) !== -1) return;
    const newLetters = lettersChecking + letter;
    dispatch(gameSlice.actions.setLettersChecking(newLetters));

    if (debounceTimer) clearTimeout(debounceTimer);

    debounceTimer = setTimeout(async () => {
      debounceTimer = null;
      const requestId = ++currentRequestId;
      const request: RequestInfo = {
        id: requestId,
        lettersChecking: newLetters,
        responded: false,
      };

      pendingRequests.push(request);

      try {
        const game = selectCurrentGameGame(state);
        if (!game) return;

        const { data: question } = await firebaseFunctionCheckResult(
          game.id,
          game.letters + newLetters
        );
        request.responded = true;

        const newerResponded = pendingRequests.some(
          (r) => r.id > requestId && r.responded
        );

        if (newerResponded) {
          return;
        }

        dispatch(
          updateGameThunk({
            ...game,
            ...question,
          })
        );
      } catch (err) {
        console.error("Check letter failed:", err);
        request.error = err;
        request.responded = true;
        alert("Error checking letters");
      } finally {
        const theLatestCompleeted = pendingRequests
          .filter((r) => r.responded)
          .sort((a, b) => b.id - a.id)
          .shift();

        if (theLatestCompleeted) {
          pendingRequests = pendingRequests.filter(
            (r) => r.id > theLatestCompleeted.id
          );
          if (!theLatestCompleeted.error || pendingRequests.length === 0) {
            dispatch(
              gameSlice.actions.removeLettersChecking(
                theLatestCompleeted.lettersChecking
              )
            );
          }
        }
      }
    }, 300);
  };
