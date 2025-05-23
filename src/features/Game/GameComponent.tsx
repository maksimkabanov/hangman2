import { useCallback, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "../../app/store";
import { checkLetterThunk } from "../../actions/checkLetterAction";
import { GameImg } from "../../components/GameImg";
import { GameWord } from "../../components/GameWord";
import { LettersBoard } from "../../components/LettersBoard";
import {
  hasChancesSelector,
  selectCurrentGameGame,
  selectGameIsLoading,
  selectLettersChecking,
  selectResultToShow,
} from "../../selectors";
import { NewGameButton } from "../NewGameButton/NewGameButtonComponent";
import clsx from "clsx";

/**
 * Returns the appropriate color classes based on the number of remaining lives
 * @param {number} lifes - Number of remaining lives
 * @returns {string} Tailwind CSS classes for text and shadow colors
 */
const getLifesColor = (lifes: number): string => {
  switch (lifes) {
    case 5:
      return "text-green-400 shadow-green-400 drop-shadow-md";
    case 4:
      return "text-lime-400 shadow-lime-400 drop-shadow-md";
    case 3:
      return "text-yellow-400 shadow-yellow-400 drop-shadow-md";
    case 2:
      return "text-orange-400 shadow-orange-400 drop-shadow-md";
    case 1:
      return "text-red-400 shadow-red-400 drop-shadow-md";
    case 0:
      return "text-black shadow-black drop-shadow-md";
    default:
      return "text-black shadow-black drop-shadow-md";
  }
};

/**
 * Main game component that handles the hangman game logic and display
 * Manages game state, letter checking, and game results
 *
 * @component
 * @example
 * ```tsx
 * <GameComponent />
 * ```
 */
export const GameComponent = () => {
  const dispatch = useAppDispatch();
  const currentGame = useAppSelector(selectCurrentGameGame);
  const resultToShow = useAppSelector(selectResultToShow);
  const gameIsLoading = useAppSelector(selectGameIsLoading);
  const lettersChecking = useAppSelector(selectLettersChecking);
  const hasChances = useAppSelector(hasChancesSelector);

  // Use resultToShow if available, otherwise use currentGame
  const game = useMemo(
    () => resultToShow ?? currentGame,
    [resultToShow, currentGame]
  );

  /**
   * Handles letter click events
   * @param {string} letter - The letter that was clicked
   */
  const onLetterClick = useCallback(
    (letter: string) => {
      dispatch(checkLetterThunk(letter));
    },
    [dispatch]
  );

  // Show loading state or new game button if no game is in progress
  if (!game) {
    return (
      <div className="relative w-full h-full flex flex-col items-center">
        <div className="relative flex flex-1 w-full overflow-hidden items-center justify-center">
          <div className="relative max-w-full max-h-full aspect-square">
            <GameImg loading={gameIsLoading} />
            {!gameIsLoading && (
              <div className="absolute top-[13%] right-[5%]">
                <NewGameButton dark={true} />
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full flex flex-col items-center">
      <div className="flex flex-col items-center gap-2 p-2">
        <h2 className="w-full text-center text-2xl text-blue-700">
          {game.question}
        </h2>
        <GameWord game={game} />
        <LettersBoard
          game={game}
          onLetterClick={onLetterClick}
          checkingLetters={lettersChecking}
          locked={!hasChances}
        />
      </div>
      <div className="relative flex flex-1 w-full overflow-hidden items-center justify-center">
        <div className="relative max-w-full max-h-full aspect-square">
          <div
            className={clsx(
              "absolute top-[10%] right-0 text-4xl",
              getLifesColor(game.lifes)
            )}
          >
            {game.lifes}
          </div>

          <GameImg lifes={game.lifes} />

          {game.finished && (
            <div className="absolute top-[13%] left-0">
              <NewGameButton dark={true} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
