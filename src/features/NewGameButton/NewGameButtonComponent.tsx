import { startNewGame } from "../../actions/gameActions";
import { useAppDispatch } from "../../app/store";

export const NewGameButton = () => {
  const dispatch = useAppDispatch();

  const onNewGameClick = () => {
    dispatch(startNewGame());
  };

  return (
    <button
      onClick={onNewGameClick}
      className="flex items-center gap-2 px-2 py-1 bg-white text-green-800 rounded-lg"
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
