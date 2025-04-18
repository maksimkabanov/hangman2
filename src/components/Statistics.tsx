import Button from "@mui/material/Button";
import { ResultsComponent } from "../features/Results/ResultsComponent";

/**
 * A component that displays game statistics and results.
 * Includes a header with a title and optional close button,
 * and a scrollable container for game results.
 *
 * @component
 * @example
 * ```tsx
 * <Statistics />
 * <Statistics onBurgerClick={() => console.log('close')} />
 * ```
 */
export const Statistics = ({
  onBurgerClick,
}: {
  /** Optional callback function when the close button is clicked */
  onBurgerClick?: () => void;
}) => {
  return (
    <>
      <div className="flex justify-between items-center border-b pb-2">
        <span className="text-lg font-semibold">Statistics</span>
        {onBurgerClick && <Button onClick={onBurgerClick}>Close</Button>}
      </div>
      <div
        data-testid="results-container"
        className="flex-1 overflow-y-auto flex justify-center py-4"
      >
        <ResultsComponent />
      </div>
    </>
  );
};
