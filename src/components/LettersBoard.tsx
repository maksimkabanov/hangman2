import { Game } from "@firebaseTypes/base";
import { LetterButton } from "./LetterButton";
import clsx from "clsx";

const LETTERS = "abcdefghijklmnopqrstuvwxyz";
const LETTERS_ARRAY = LETTERS.split("");

export const LettersBoard = ({
  game,
  checkingLetter,
  onLetterClick,
}: {
  game: Game;
  checkingLetter?: string;
  onLetterClick: (letter: string) => void;
}) => {
  const usedLettersSet = new Set(game.letters);
  const correctLettersSet = new Set(game.word);

  return (
    <div
      className={clsx(
        "flex flex-row gap-2 p-4 flex-wrap justify-center",
        !!checkingLetter && "pointer-events-none"
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
            isChecking={checkingLetter === letter}
            letter={letter}
          />
        );
      })}
    </div>
  );
};
