import { render, screen, fireEvent } from "../../test-utils";
import { LettersBoard } from "../LettersBoard";
import { Game } from "@firebaseTypes/base";

describe("LettersBoard", () => {
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

  it("renders all letters", () => {
    const mockGame = createMockGame("test");
    render(<LettersBoard game={mockGame} onLetterClick={() => {}} />);
    const letters = screen.getAllByRole("button");
    expect(letters).toHaveLength(26); // All alphabet letters
  });

  it("calls onLetterClick with correct letter", () => {
    const mockGame = createMockGame("test");
    const handleClick = jest.fn();
    render(<LettersBoard game={mockGame} onLetterClick={handleClick} />);

    const letterButton = screen.getByText("a");
    fireEvent.click(letterButton);

    expect(handleClick).toHaveBeenCalledWith("a");
  });

  it("shows correct button states for used letters", () => {
    const mockGame = createMockGame("test", "tae");
    render(<LettersBoard game={mockGame} onLetterClick={() => {}} />);

    // Used and correct letters should be green
    expect(screen.getByText("t")).toHaveClass("bg-green-500");
    expect(screen.getByText("e")).toHaveClass("bg-green-500");

    // Used and incorrect letters should be red
    expect(screen.getByText("a")).toHaveClass("bg-red-500");

    // Unused letters should be dark
    expect(screen.getByText("b")).toHaveClass("bg-gray-800");
  });

  it("shows correct button states for finished game", () => {
    const mockGame = createMockGame("test", "abc", true, 0);
    render(<LettersBoard game={mockGame} onLetterClick={() => {}} />);

    // All used letters should be red when game is lost
    expect(screen.getByText("a")).toHaveClass("bg-red-500");
    expect(screen.getByText("b")).toHaveClass("bg-red-500");
    expect(screen.getByText("c")).toHaveClass("bg-red-500");
  });
});
