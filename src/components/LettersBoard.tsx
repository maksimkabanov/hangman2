import { Game } from "@firebaseTypes/base";
import { LetterButton } from "./LetterButton";

const LETTERS = "abcdefghijklmnopqrstuvwxyz";
const LETTERS_ARRAY = LETTERS.split("");

export const LettersBoard = ({
  game,
  onLetterClick,
}: {
  game: Game;
  onLetterClick: (letter: string) => void;
}) => {
  const usedLettersSet = new Set(game.letters);
  const correctLettersSet = new Set(game.word);

  return (
    <div className="flex flex-row gap-2 p-4 flex-wrap justify-center">
      {LETTERS_ARRAY.map((letter) => {
        return (
          <LetterButton
            key={letter}
            success={correctLettersSet.has(letter)}
            used={usedLettersSet.has(letter)}
            disabled={game.finished}
            onClick={onLetterClick}
            letter={letter}
          />
        );
      })}
    </div>
  );
};
