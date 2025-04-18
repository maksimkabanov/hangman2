import { render, screen } from "../../test-utils";
import { GameWord } from "../GameWord";
import { Game } from "@firebaseTypes/base";

describe("GameWord", () => {
  const createMockGame = (
    word: string,
    letters: string = "",
    finished = false,
    lifes = 5
  ): Game =>
    ({
      word,
      letters,
      finished,
      lifes,
    } as Game);

  it("renders word with correct letters", () => {
    const mockGame = createMockGame("hello");
    render(<GameWord game={mockGame} />);
    const letters = screen.getAllByRole("button");
    expect(letters).toHaveLength("hello".length);
    letters.forEach((letter, index) => {
      expect(letter).toHaveTextContent("hello"[index]);
    });
  });

  it("applies correct styles when game is finished and won", () => {
    const mockGame = createMockGame("test", "tes", true, 5);
    const { container } = render(<GameWord game={mockGame} />);
    expect(container.firstChild).toHaveClass("bg-green-100");
  });

  it("applies correct styles when game is finished and lost", () => {
    const mockGame = createMockGame("test", "abc", true, 0);
    const { container } = render(<GameWord game={mockGame} />);
    expect(container.firstChild).toHaveClass("bg-red-100");
  });

  it("shows correct letter states", () => {
    const mockGame = createMockGame("test", "te");
    render(<GameWord game={mockGame} />);
    const letters = screen.getAllByRole("button");

    // T and E should be marked as used and success
    expect(letters[0]).toHaveClass("bg-green-500");
    expect(letters[1]).toHaveClass("bg-green-500");
    expect(letters[3]).toHaveClass("bg-green-500");

    // S should be marked as unused
    expect(letters[2]).toHaveClass("bg-gray-800");
  });
});
