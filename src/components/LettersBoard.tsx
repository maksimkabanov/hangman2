import { Game } from "@firebaseTypes/base";
import { LetterButton } from "./LetterButton";
import clsx from "clsx";

const LETTERS = "abcdefghijklmnopqrstuvwxyz";
const LETTERS_ARRAY = LETTERS.split("");

export const LettersBoard = ({
  game,
  checkingLetters,
  onLetterClick,
  locked,
}: {
  game: Game;
  checkingLetters?: string;
  locked?: boolean;
  onLetterClick: (letter: string) => void;
}) => {
  const usedLettersSet = new Set(game.letters);
  const correctLettersSet = new Set(game.word);
  const checkingLettersSet = new Set(checkingLetters);

  return (
    <div
      className={clsx(
        "flex flex-row gap-2 p-4 flex-wrap justify-center",
        !!locked && "pointer-events-none"
      )}
    >
      {LETTERS_ARRAY.map((letter) => {
        return (
          <LetterButton
            key={letter}
            success={correctLettersSet.has(letter)}
            used={usedLettersSet.has(letter)}
            disabled={game.finished}
            onClick={onLetterClick}
            isChecking={checkingLettersSet.has(letter)}
            letter={letter}
          />
        );
      })}
    </div>
  );
};
