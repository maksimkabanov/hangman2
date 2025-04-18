import { render, screen } from "../../test-utils";
import { GameResult } from "../GameResult";
import { Result } from "@firebaseTypes/base";

describe("GameResult", () => {
  const createMockResult = (
    word: string,
    letters: string,
    success: boolean,
    question: string,
    startTimestamp: number,
    endTimestamp: number
  ): Result => ({
    word,
    letters,
    success,
    question,
    startTimestamp,
    endTimestamp,
    lifes: 3,
    finished: true,
    id: "1",
    number: 1,
  });

  it("renders successful and failed game letters", () => {
    const mockResult = createMockResult(
      "test",
      "dhtkes",
      true,
      "What is this?",
      Date.now(),
      Date.now() + 1000
    );
    render(<GameResult result={mockResult} />);

    expect(screen.getByText("What is this?")).toBeInTheDocument();
    expect(screen.getByText("test")).toBeInTheDocument();
    expect(screen.getByText("✅ Answer:")).toBeInTheDocument();

    // Check incorrect letters
    const wrongSpan = screen.getByText("❌ Wrong:");
    expect(wrongSpan).toBeInTheDocument();
    expect(wrongSpan.nextSibling?.childNodes[0].textContent).toBe("d");
    expect(wrongSpan.nextSibling?.childNodes[1].textContent).toBe("h");
    expect(wrongSpan.nextSibling?.childNodes[2].textContent).toBe("k");
  });

  it("applies correct styles for successful game", () => {
    const mockResult = createMockResult(
      "test",
      "test",
      true,
      "What is this?",
      Date.now(),
      Date.now() + 1000
    );
    const { container } = render(<GameResult result={mockResult} />);

    expect(container.firstChild).toHaveClass(
      "bg-green-100",
      "border-green-400"
    );
  });

  it("applies correct styles for failed game", () => {
    const mockResult = createMockResult(
      "test",
      "abc",
      false,
      "What is this?",
      Date.now(),
      Date.now() + 1000
    );
    const { container } = render(<GameResult result={mockResult} />);

    expect(container.firstChild).toHaveClass("bg-red-100", "border-red-400");
  });

  it("shows game duration when endTimestamp is provided", () => {
    const startTime = Date.now();
    const endTime = startTime + 65000; // 1 minute and 5 seconds
    const mockResult = createMockResult(
      "test",
      "test",
      true,
      "What is this?",
      startTime,
      endTime
    );
    render(<GameResult result={mockResult} />);

    expect(screen.getByText("00:01:05")).toBeInTheDocument();
  });
});
