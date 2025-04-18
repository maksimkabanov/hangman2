import { Fragment } from "react";
import clsx from "clsx";

enum gamePictures {
  new = "images/anime-pers.png",
  liles5 = "images/stages/5.png",
  liles4 = "images/stages/4.png",
  liles3 = "images/stages/3.png",
  liles2 = "images/stages/2.png",
  liles1 = "images/stages/1.png",
  liles0 = "images/stages/0.png",
}

export const GameImg = (lifes: number | undefined) => {
  return (
    <Fragment>
      <img
        className={clsx(
          "max-w-full max-h-full",
          lifes === undefined ? "block" : "hidden"
        )}
        src={gamePictures.new}
        alt="Max's hangman character new game"
      />
      <img
        className={clsx(
          "max-w-full max-h-full",
          lifes === 5 ? "block" : "hidden"
        )}
        src={gamePictures.liles5}
        alt="Max's hangman character 5 lifes"
      />
      <img
        className={clsx(
          "max-w-full max-h-full",
          lifes === 4 ? "block" : "hidden"
        )}
        src={gamePictures.liles4}
        alt="Max's hangman character 4 lifes"
      />
      <img
        className={clsx(
          "max-w-full max-h-full",
          lifes === 3 ? "block" : "hidden"
        )}
        src={gamePictures.liles3}
        alt="Max's hangman character 3 lifes"
      />
      <img
        className={clsx(
          "max-w-full max-h-full",
          lifes === 2 ? "block" : "hidden"
        )}
        src={gamePictures.liles2}
        alt="Max's hangman character 2 lifes"
      />
      <img
        className={clsx(
          "max-w-full max-h-full",
          lifes === 1 ? "block" : "hidden"
        )}
        src={gamePictures.liles1}
        alt="Max's hangman character 1 life"
      />
      <img
        className={clsx(
          "max-w-full max-h-full",
          lifes === 0 ? "block" : "hidden"
        )}
        src={gamePictures.liles0}
        alt="Max's hangman character 0 lifes"
      />
    </Fragment>
  );
};
