import { checkLetter } from "../../actions/gameActions";
import { useAppDispatch, useAppSelector } from "../../app/store";
import { GameImg } from "../../components/GameImg";
import { GameWord } from "../../components/GameWord";
import { LettersBoard } from "../../components/LettersBoard";
import {
  selectCurrentGame,
  selectGameIsLoading,
  selectLetterChecking,
  selectResultToShow,
} from "../../selectors";
import { NewGameButton } from "../NewGameButton/NewGameButtonComponent";
import clsx from "clsx";

const getLifesColor = (lifes: number) => {
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

export const GameComponent = () => {
  const dispatch = useAppDispatch();
  const currentGame = useAppSelector(selectCurrentGame);
  const resultToShow = useAppSelector(selectResultToShow);
  const gameIsLoading = useAppSelector(selectGameIsLoading);
  const letterChecking = useAppSelector(selectLetterChecking);
  const game = resultToShow ?? currentGame;

  if (!game)
    return (
      <div className="relative w-full h-full flex flex-col items-center">
        <div className="relative flex flex-1 w-full overflow-hidden items-center justify-center">
          <div className="relative max-w-full max-h-full aspect-square">
            <GameImg loading={gameIsLoading} />
            {!gameIsLoading && (
              <div className="absolute top-[13%] right-[5%]">
                <NewGameButton />
              </div>
            )}
          </div>
        </div>
      </div>
    );

  const onLetterClick = (letter: string) => {
    dispatch(checkLetter(letter));
  };

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
          checkingLetter={letterChecking}
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
              <NewGameButton />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
