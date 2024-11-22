// This file is generated by Continue

import { getRangeInString } from "../../../util/ranges";

describe.skip("getRangeInString", () => {
  let content: string;

  beforeEach(() => {
    content = `Line 1
Line 2
Line 3
Line 4
Line 5`;
  });

  afterEach(() => {
    content = "";
  });

  test("should return substring within the same line", () => {
    const range = {
      start: { line: 1, character: 0 },
      end: { line: 1, character: 4 },
    };
    expect(getRangeInString(content, range)).toBe("Line");
  });

  test("should return substring spanning multiple lines", () => {
    const range = {
      start: { line: 1, character: 2 },
      end: { line: 3, character: 3 },
    };
    const expected = `ne 2
Line 3
Line 4`;
    expect(getRangeInString(content, range)).toBe(expected);
  });

  test("should handle range that starts and ends at the same character", () => {
    const range = {
      start: { line: 2, character: 0 },
      end: { line: 2, character: 0 },
    };
    expect(getRangeInString(content, range)).toBe("L");
  });

  test("should handle range that spans entire content", () => {
    const range = {
      start: { line: 0, character: 0 },
      end: { line: 4, character: 5 },
    };
    expect(getRangeInString(content, range)).toBe(content);
  });

  test("should handle range that spans to the end of the last line", () => {
    const range = {
      start: { line: 3, character: 2 },
      end: { line: 4, character: 5 },
    };
    const expected = `ne 4
Line 5`;
    expect(getRangeInString(content, range)).toBe(expected);
  });

  test("should handle empty content", () => {
    content = "";
    const range = {
      start: { line: 0, character: 0 },
      end: { line: 0, character: 0 },
    };
    expect(getRangeInString(content, range)).toBe("");
  });

  test("should handle invalid range (start line > end line)", () => {
    const range = {
      start: { line: 3, character: 0 },
      end: { line: 2, character: 0 },
    };
    expect(getRangeInString(content, range)).toBe("");
  });

  test("should handle invalid range (start character > end character on same line)", () => {
    const range = {
      start: { line: 1, character: 5 },
      end: { line: 1, character: 2 },
    };
    expect(getRangeInString(content, range)).toBe("");
  });

  test("should handle range that starts and ends at the same line but different characters", () => {
    const range = {
      start: { line: 1, character: 2 },
      end: { line: 1, character: 6 },
    };
    expect(getRangeInString(content, range)).toBe("ne 2");
  });

  test("should handle range that starts and ends at the same line and same characters", () => {
    const range = {
      start: { line: 1, character: 2 },
      end: { line: 1, character: 2 },
    };
    expect(getRangeInString(content, range)).toBe("n");
  });
});
