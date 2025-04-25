import clsx from "clsx";
import { AnimationPulse } from "./AnimationPulse";

/**
 * A button component representing a single letter in the hangman game.
 * Changes its appearance based on the letter's state (used/unused, correct/incorrect).
 *
 * @component
 * @example
 * ```tsx
 * <LetterButton
 *   letter="a"
 *   success={true}
 *   used={true}
 *   disabled={false}
 *   isChecking={false}
 *   onClick={(letter) => console.log(letter)}
 * />
 * ```
 */
export const LetterButton = ({
  letter,
  success,
  used,
  disabled,
  isChecking,
  onClick,
}: {
  /** The letter to display on the button */
  letter: string;
  /** Whether the letter is correct in the word */
  success: boolean;
  /** Whether the letter has been used in the game */
  used: boolean;
  /** Whether the button is disabled */
  disabled?: boolean;
  /** Whether the letter is currently being checked */
  isChecking?: boolean;
  /** Callback function when the button is clicked */
  onClick?: (letter: string) => void;
}) => {
  const isUnknown = letter === "?";
  return (
    <div className="relative">
      {isChecking && <AnimationPulse />}
      <button
        disabled={disabled || isChecking || used}
        onClick={onClick ? () => onClick(letter) : undefined}
        className={clsx(
          "disabled:opacity-100 didabled:pointer-events-none uppercase w-10 h-10 min-w-[40px] min-h-[40px]",
          "rounded-md font-semibold text-lg",
          "transition-all duration-200",
          "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2",
          !used &&
            !isUnknown &&
            "bg-gray-800 text-white hover:bg-gray-700 cursor-pointer disabled:hover:bg-gray-800",
          !used &&
            isUnknown &&
            "bg-violet-800 text-white hover:bg-violet-700 disabled:hover:bg-violet-800",
          used &&
            success &&
            "bg-green-500 text-white hover:bg-green-600 disabled:hover:bg-green-500",
          used &&
            !success &&
            "bg-red-500 text-white hover:bg-red-600 disabled:hover:bg-red-500",
          disabled && "bg-gray-300 text-gray-500 hover:bg-gray-300"
        )}
      >
        {letter}
      </button>
    </div>
  );
};
