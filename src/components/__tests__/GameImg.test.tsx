import { render, screen } from "../../test-utils";
import { GameImg } from "../GameImg";

describe("GameImg", () => {
  it("renders new game image when lifes is undefined", () => {
    render(<GameImg lifes={undefined} />);
    const images = screen.getAllByRole("img");
    expect(images).toHaveLength(1);
    expect(images[0]).toHaveAttribute("src", "images/anime-pers.png");
    expect(images[0]).toHaveAttribute(
      "alt",
      "Max's hangman character new game"
    );
  });

  it("renders correct image for each life count", () => {
    const lifeCounts = [5, 4, 3, 2, 1, 0];
    lifeCounts.forEach((lifes) => {
      const { container } = render(<GameImg lifes={lifes} />);
      const images = container.getElementsByTagName("img");
      expect(images).toHaveLength(1);

      expect(images[0].getAttribute("src")).toBe(`images/stages/${lifes}.png`);
    });
  });

  it("renders images with correct alt text", () => {
    render(<GameImg lifes={5} />);
    const images = screen.getAllByRole("img");
    expect(images[0]).toHaveAttribute("alt", "Max's hangman character 5 lifes");
  });
});
