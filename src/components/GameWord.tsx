import { Game } from "@firebaseTypes/base";
import clsx from "clsx";
import { LetterButton } from "./LetterButton";

/**
 * A component that displays the word to guess in the hangman game.
 * Shows each letter as a button with different states based on whether it has been guessed.
 *
 * @component
 * @example
 * ```tsx
 * <GameWord
 *   game={{
 *     word: "HELLO",
 *     letters: "HE",
 *     finished: false,
 *     lifes: 5
 *   }}
 * />
 * ```
 */
export const GameWord = ({ game }: { game: Game }) => {
  const lettersSet = new Set(game.letters);
  const wordLettersArray = game.word.split("");

  return (
    <div
      className={clsx(
        "flex flex-row gap-2 p-4 flex-wrap justify-center pointer-events-none",
        game.finished && game.lifes > 0 && "bg-green-100",
        game.finished && game.lifes < 1 && "bg-red-100"
      )}
    >
      {wordLettersArray.map((letter, index) => {
        return (
          <LetterButton
            key={letter + index}
            success={lettersSet.has(letter)}
            used={game.finished || lettersSet.has(letter)}
            letter={letter}
          />
        );
      })}
    </div>
  );
};
