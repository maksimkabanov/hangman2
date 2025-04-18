import clsx from "clsx";
import { AnimationPulse } from "./AnimationPulse";

/**
 * Enum representing different game state images
 * @enum
 */
enum gamePictures {
  /** Initial game state image */
  new = "images/anime-pers.png",
  /** Image for 5 remaining lives */
  liles5 = "images/stages/5.png",
  /** Image for 4 remaining lives */
  liles4 = "images/stages/4.png",
  /** Image for 3 remaining lives */
  liles3 = "images/stages/3.png",
  /** Image for 2 remaining lives */
  liles2 = "images/stages/2.png",
  /** Image for 1 remaining life */
  liles1 = "images/stages/1.png",
  /** Image for game over state */
  liles0 = "images/stages/0.png",
}

Object.values(gamePictures).forEach((src) => {
  const img = new Image();
  img.src = src;
});

/**
 * A component that displays the hangman game state image.
 * Shows different images based on the number of remaining lives.
 *
 * @component
 * @example
 * ```tsx
 * <GameImg lifes={5} />
 * <GameImg lifes={undefined} />
 * ```
 */
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
    <div className="relative">
      {loading && <AnimationPulse animationDuration="0.5s" />}
      <img
        className={clsx(
          "max-w-full max-h-full",
          loading ? "opacity-50" : "opacity-100"
        )}
        src={src}
        alt={`Max's hangman character ${lifes ? `${lifes} lifes` : "new game"}`}
      />
    </div>
  );
};
