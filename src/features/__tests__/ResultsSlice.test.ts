import { resultsSlice } from "../Results/ResultsSlice";
import { Result } from "@firebaseTypes/base";

describe("ResultsSlice", () => {
  const mockResult: Result = {
    id: "1",
    word: "TEST",
    letters: "TEST",
    success: true,
    question: "Test Question",
    startTimestamp: 1000,
    endTimestamp: 2000,
    lifes: 5,
    finished: true,
    number: 1,
  };

  const mockResult2: Result = {
    id: "2",
    word: "WORD",
    letters: "WORD",
    success: true,
    question: "Another Question",
    startTimestamp: 3000,
    endTimestamp: 4000,
    lifes: 4,
    finished: true,
    number: 2,
  };

  it("should initialize with an empty results array", () => {
    const initialState = resultsSlice.reducer(undefined, { type: "" });
    expect(initialState.results).toEqual([]);
  });

  it("should set new results via setResults", () => {
    const initialState = resultsSlice.reducer(undefined, { type: "" });
    const newState = resultsSlice.reducer(
      initialState,
      resultsSlice.actions.setResults([mockResult, mockResult2])
    );
    expect(newState.results).toEqual([mockResult, mockResult2]);
  });

  it("should add a new result via addResult", () => {
    const initialState = resultsSlice.reducer(undefined, { type: "" });
    const stateWithOneResult = resultsSlice.reducer(
      initialState,
      resultsSlice.actions.addResult(mockResult)
    );
    expect(stateWithOneResult.results).toEqual([mockResult]);

    // Adding second result
    const stateWithTwoResults = resultsSlice.reducer(
      stateWithOneResult,
      resultsSlice.actions.addResult(mockResult2)
    );
    expect(stateWithTwoResults.results).toEqual([mockResult, mockResult2]);
  });

  it("should not add duplicate results", () => {
    const initialState = resultsSlice.reducer(undefined, { type: "" });
    const stateWithOneResult = resultsSlice.reducer(
      initialState,
      resultsSlice.actions.addResult(mockResult)
    );

    // Attempt to add the same result again
    const stateAfterDuplicate = resultsSlice.reducer(
      stateWithOneResult,
      resultsSlice.actions.addResult(mockResult)
    );

    expect(stateAfterDuplicate.results).toEqual([mockResult]);
    expect(stateAfterDuplicate.results).toHaveLength(1);
  });

  it("should clear results via reset", () => {
    const initialState = resultsSlice.reducer(undefined, { type: "" });
    const stateWithResults = resultsSlice.reducer(
      initialState,
      resultsSlice.actions.setResults([mockResult, mockResult2])
    );

    const stateAfterReset = resultsSlice.reducer(
      stateWithResults,
      resultsSlice.actions.reset()
    );

    expect(stateAfterReset.results).toEqual([]);
  });
});
