import clsx from "clsx";
import { startNewGame } from "../../actions/gameActions";
import { useAppDispatch } from "../../app/store";

/**
 * Props for the NewGameButton component
 */
type NewGameButtonProps = {
  /**
   * Whether to use dark theme for the button
   * @default false
   */
  dark?: boolean;
};

/**
 * Button component that starts a new game when clicked
 *
 * @component
 * @example
 * ```tsx
 * <NewGameButton dark={true} />
 * ```
 */
export const NewGameButton = ({ dark }: NewGameButtonProps) => {
  const dispatch = useAppDispatch();

  /**
   * Handles the click event on the button
   * Dispatches the startNewGame action
   */
  const onNewGameClick = () => {
    dispatch(startNewGame());
  };

  return (
    <button
      onClick={onNewGameClick}
      className={clsx(
        "flex items-center gap-2 px-2 py-1 rounded-lg cursor-pointer",
        dark &&
          "text-white bg-gradient-to-b from-emerald-400 to-emerald-600 shadow-lg hover:brightness-110 active:brightness-90 transition-all duration-200",
        !dark &&
          "text-emerald-700 bg-gradient-to-b from-zinc-100 to-zinc-300 shadow-lg hover:brightness-110 active:brightness-90 transition-all duration-200"
      )}
    >
      <img
        src="images/anime-pers.png"
        alt="new game"
        className="w-[20px] ratio-square"
      ></img>
      <span className="font-medium">New Game</span>
    </button>
  );
};
