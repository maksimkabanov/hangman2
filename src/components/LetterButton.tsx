import clsx from "clsx";
import { AnimationPulse } from "./AnimationPulse";

export const LetterButton = ({
  letter,
  success,
  used,
  disabled,
  isChecking,
  onClick,
}: {
  letter: string;
  success: boolean;
  used: boolean;
  disabled?: boolean;
  isChecking?: boolean;
  onClick?: (letter: string) => void;
}) => {
  const isUnknown = letter === "?";
  return (
    <div className="relative">
      {isChecking && <AnimationPulse />}
      <button
        disabled={disabled}
        onClick={onClick ? () => onClick(letter) : undefined}
        className={clsx(
          "w-10 h-10 min-w-[40px] min-h-[40px]",
          "rounded-md font-semibold text-lg",
          "transition-all duration-200",
          "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2",
          "disabled:opacity-50 disabled:cursor-not-allowed",
          !used && !isUnknown && "bg-gray-800 text-white hover:bg-gray-700",
          !used && isUnknown && "bg-violet-800 text-white hover:bg-violet-700",
          used && success && "bg-green-500 text-white hover:bg-green-600",
          used && !success && "bg-red-500 text-white hover:bg-red-600",
          disabled && "bg-gray-300 text-gray-500 hover:bg-gray-300"
        )}
      >
        {letter.toUpperCase()}
      </button>
    </div>
  );
};
