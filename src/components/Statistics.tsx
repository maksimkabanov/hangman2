import Button from "@mui/material/Button";
import { ResultsComponent } from "../features/Results/ResultsComponent";

export const Statistics = ({
  onBurgerClick,
}: {
  onBurgerClick?: () => void;
}) => {
  return (
    <>
      <div className="flex justify-between items-center border-b pb-2">
        <span className="text-lg font-semibold">Statistics</span>
        {onBurgerClick && <Button onClick={onBurgerClick}>Close</Button>}
      </div>
      <div className="flex-1 overflow-y-auto flex justify-center py-4">
        <ResultsComponent />
      </div>
    </>
  );
};
