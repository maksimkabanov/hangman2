import { Result } from "@firebaseTypes/base";
import clsx from "clsx";
import moment from "moment";

export const GameResult = ({ result }: { result: Result }) => {
  const lettersUsed = Array.from(result.letters);
  const correctLetters = lettersUsed.filter((l) => result.word.includes(l));
  const correctLettersSet = new Set(correctLetters);

  return (
    <div
      className={clsx(
        "box-border flex flex-col gap-2 w-full max-w-[280px] p-3 rounded-md transition-all border text-sm",
        "cursor-pointer shadow-md",
        result.success && "bg-green-100 border-green-400 text-black",
        !result.success && "bg-red-100 border-red-400 text-black"
      )}
    >
      <div className="font-semibold">{result.question}</div>
      <div className="p-1 bg-gray-800 rounded text-white text-xs">
        ✅ Answer: <span className="font-bold">{result.word}</span>
      </div>

      {correctLetters.length < lettersUsed.length && (
        <div className="text-xs opacity-80 flex flex-row gap-2 w-full flex-wrap">
          <span>❌</span>
          {lettersUsed.map((usedLetter) =>
            !correctLettersSet.has(usedLetter) ? (
              <span key={usedLetter} className="font-bold text-red-700">
                {usedLetter}
              </span>
            ) : null
          )}
        </div>
      )}

      {result.endTimestamp && (
        <div className="text-xs opacity-60">
          ⏳{" "}
          {moment
            .utc(result.endTimestamp - result.startTimestamp)
            .format("HH:mm:ss")}
        </div>
      )}
    </div>
  );
};
