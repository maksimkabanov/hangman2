import { useMemo } from "react";
import { useAppSelector } from "../../app/store";
import { selectCurrentGameGame, selectResults } from "../../selectors";
import { NewGameButton } from "../NewGameButton/NewGameButtonComponent";
import { GameResult } from "../../components/GameResult";

/**
 * Component that displays the list of game results
 * Shows the total number of games played and a list of results sorted by game number
 *
 * @component
 * @example
 * ```tsx
 * <ResultsComponent />
 * ```
 */
export const ResultsComponent = () => {
  const results = useAppSelector(selectResults);
  const currentGame = useAppSelector(selectCurrentGameGame);

  /**
   * Sort results by game number in descending order
   */
  const resultsSorted = useMemo(
    () => results.slice().sort((r1, r2) => r2.number - r1.number),
    [results]
  );

  /**
   * Create a set of result IDs for quick lookup
   */
  const resultsSet = useMemo(
    () => new Set(results.map((r) => r.id)),
    [results]
  );

  /**
   * Show new game button if there's no current game or if the current game is already in results
   */
  const showNewGameButton = !currentGame || resultsSet.has(currentGame.id);

  return (
    <div className="h-full flex flex-col gap-2 items-center">
      <div className="w-full flex flex-row gap-2 items-center">
        <span>Games : {resultsSorted.length}</span>
        <div className="ml-auto"></div>
        {showNewGameButton && <NewGameButton />}
      </div>
      <div className="flex-1 overflow-y-auto w-full px-1">
        <div className="flex flex-col gap-2 items-start">
          {resultsSorted.map((result) => (
            <GameResult key={result.id} result={result} />
          ))}
        </div>
      </div>
    </div>
  );
};
