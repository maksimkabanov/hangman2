import clsx from "clsx";

export const LetterButton = ({
  letter,
  success,
  used,
  disabled,
  onClick,
}: {
  letter: string;
  success: boolean;
  used: boolean;
  disabled?: boolean;
  onClick?: (letter: string) => void;
}) => {
  return (
    <button
      disabled={disabled}
      onClick={onClick ? () => onClick(letter) : undefined}
      className={clsx(
        "w-10 h-10 min-w-[40px] min-h-[40px]",
        "rounded-md font-semibold text-lg",
        "transition-all duration-200",
        "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        !used && "bg-gray-800 text-white hover:bg-gray-700",
        used && success && "bg-green-500 text-white hover:bg-green-600",
        used && !success && "bg-red-500 text-white hover:bg-red-600",
        disabled && "bg-gray-300 text-gray-500 hover:bg-gray-300"
      )}
    >
      {letter.toUpperCase()}
    </button>
  );
};
