import clsx from "clsx";
import { AnimationPulse } from "./AnimationPulse";

enum gamePictures {
  new = "images/anime-pers.png",
  liles5 = "images/stages/5.png",
  liles4 = "images/stages/4.png",
  liles3 = "images/stages/3.png",
  liles2 = "images/stages/2.png",
  liles1 = "images/stages/1.png",
  liles0 = "images/stages/0.png",
}

export const GameImg = ({
  lifes,
  loading,
}: {
  lifes?: number;
  loading?: boolean;
}) => {
  const src =
    lifes === undefined
      ? gamePictures.new
      : gamePictures[`liles${lifes}` as keyof typeof gamePictures];

  return (
    <div className="relative w-full h-full">
      {loading && <AnimationPulse animationDuration="0.5s" />}
      <img
        className={clsx(
          "max-w-full max-h-full",
          loading ? "opacity-50" : "opacity-100"
        )}
        src={src}
        alt={`Max's hangman character ${lifes ?? "new game"} lifes`}
      />
    </div>
  );
};
