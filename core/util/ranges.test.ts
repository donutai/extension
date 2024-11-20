// This file is generated by Continue

import {
  intersection,
  getRangeInString,
  maxPosition,
  minPosition,
  union,
} from "./ranges";

interface Position {
  line: number;
  character: number;
}

interface Range {
  start: Position;
  end: Position;
}

describe("union", () => {
  let rangeA: Range;
  let rangeB: Range;

  beforeEach(() => {
    rangeA = {
      start: { line: 1, character: 0 },
      end: { line: 3, character: 5 },
    };

    rangeB = {
      start: { line: 2, character: 3 },
      end: { line: 4, character: 2 },
    };
  });

  test("should return the union of two overlapping ranges", () => {
    const result = union(rangeA, rangeB);
    expect(result).toEqual({
      start: { line: 1, character: 0 },
      end: { line: 4, character: 2 },
    });
  });

  test("should return the union when ranges are identical", () => {
    const result = union(rangeA, rangeA);
    expect(result).toEqual(rangeA);
  });

  test("should return the union when ranges do not overlap but are adjacent", () => {
    rangeB = {
      start: { line: 3, character: 5 },
      end: { line: 4, character: 2 },
    };
    const result = union(rangeA, rangeB);
    expect(result).toEqual({
      start: { line: 1, character: 0 },
      end: { line: 4, character: 2 },
    });
  });

  test("should return the union when one range is completely within the other", () => {
    rangeB = {
      start: { line: 2, character: 1 },
      end: { line: 2, character: 4 },
    };
    const result = union(rangeA, rangeB);
    expect(result).toEqual(rangeA);
  });

  test("should return the union when ranges do not overlap and are not adjacent", () => {
    rangeB = {
      start: { line: 4, character: 3 },
      end: { line: 5, character: 1 },
    };
    const result = union(rangeA, rangeB);
    expect(result).toEqual({
      start: { line: 1, character: 0 },
      end: { line: 5, character: 1 },
    });
  });

  // TODO
  test.skip("should handle edge case where start and end lines are the same", () => {
    rangeA = {
      start: { line: 1, character: 0 },
      end: { line: 1, character: 5 },
    };
    rangeB = {
      start: { line: 1, character: 3 },
      end: { line: 1, character: 7 },
    };
    const result = union(rangeA, rangeB);
    expect(result).toEqual({
      start: { line: 1, character: 0 },
      end: { line: 1, character: 7 },
    });
  });
});

describe("Position comparison functions", () => {
  let pos1: Position;
  let pos2: Position;
  let pos3: Position;
  let pos4: Position;

  beforeAll(() => {
    // Setup: Initializing positions
    pos1 = { line: 1, character: 5 };
    pos2 = { line: 2, character: 3 };
    pos3 = { line: 1, character: 7 };
    pos4 = { line: 2, character: 3 }; // Same as pos2 to test equality
  });

  describe("maxPosition", () => {
    it("should return the position with the greater line number", () => {
      expect(maxPosition(pos1, pos2)).toEqual(pos2);
    });

    it("should return the position with the greater character number when lines are equal", () => {
      expect(maxPosition(pos1, pos3)).toEqual(pos3);
    });

    it("should return the first position when both positions are equal", () => {
      expect(maxPosition(pos2, pos4)).toEqual(pos2);
    });

    it("should handle positions with negative line numbers", () => {
      const posNegative = { line: -1, character: 0 };
      expect(maxPosition(posNegative, pos1)).toEqual(pos1);
    });

    it("should handle positions with negative character numbers", () => {
      const posNegativeChar = { line: 1, character: -1 };
      expect(maxPosition(posNegativeChar, pos1)).toEqual(pos1);
    });
  });

  describe("minPosition", () => {
    it("should return the position with the lesser line number", () => {
      expect(minPosition(pos1, pos2)).toEqual(pos1);
    });

    it("should return the position with the lesser character number when lines are equal", () => {
      expect(minPosition(pos1, pos3)).toEqual(pos1);
    });

    it("should return the first position when both positions are equal", () => {
      expect(minPosition(pos2, pos4)).toEqual(pos2);
    });

    it("should handle positions with negative line numbers", () => {
      const posNegative = { line: -1, character: 0 };
      expect(minPosition(posNegative, pos1)).toEqual(posNegative);
    });

    it("should handle positions with negative character numbers", () => {
      const posNegativeChar = { line: 1, character: -1 };
      expect(minPosition(posNegativeChar, pos1)).toEqual(posNegativeChar);
    });
  });
});

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

describe("intersection", () => {
  let rangeA: Range;
  let rangeB: Range;

  beforeEach(() => {
    rangeA = {
      start: { line: 1, character: 0 },
      end: { line: 3, character: 5 },
    };

    rangeB = {
      start: { line: 2, character: 2 },
      end: { line: 4, character: 0 },
    };
  });

  test("returns correct intersection for overlapping ranges", () => {
    const result = intersection(rangeA, rangeB);
    expect(result).toEqual({
      start: { line: 2, character: 2 },
      end: { line: 3, character: 5 },
    });
  });

  test("returns null for non-overlapping ranges", () => {
    rangeA = {
      start: { line: 1, character: 0 },
      end: { line: 2, character: 0 },
    };

    rangeB = {
      start: { line: 3, character: 0 },
      end: { line: 4, character: 0 },
    };

    const result = intersection(rangeA, rangeB);
    expect(result).toBeNull();
  });

  // TODO
  test.skip("returns correct intersection for single line overlap", () => {
    rangeA = {
      start: { line: 1, character: 0 },
      end: { line: 1, character: 5 },
    };

    rangeB = {
      start: { line: 1, character: 3 },
      end: { line: 2, character: 0 },
    };

    const result = intersection(rangeA, rangeB);
    expect(result).toEqual({
      start: { line: 1, character: 3 },
      end: { line: 1, character: 5 },
    });
  });

  test("returns null for single line non-overlapping ranges", () => {
    rangeA = {
      start: { line: 1, character: 0 },
      end: { line: 1, character: 2 },
    };

    rangeB = {
      start: { line: 1, character: 3 },
      end: { line: 1, character: 5 },
    };

    const result = intersection(rangeA, rangeB);
    expect(result).toBeNull();
  });

  test("returns correct intersection when one range is fully within another", () => {
    rangeA = {
      start: { line: 1, character: 0 },
      end: { line: 4, character: 5 },
    };

    rangeB = {
      start: { line: 2, character: 2 },
      end: { line: 3, character: 3 },
    };

    const result = intersection(rangeA, rangeB);
    expect(result).toEqual({
      start: { line: 2, character: 2 },
      end: { line: 3, character: 3 },
    });
  });

  test("returns correct intersection when ranges touch at the edge", () => {
    rangeA = {
      start: { line: 1, character: 0 },
      end: { line: 2, character: 0 },
    };

    rangeB = {
      start: { line: 2, character: 0 },
      end: { line: 3, character: 0 },
    };

    const result = intersection(rangeA, rangeB);
    expect(result).toEqual({
      start: { line: 2, character: 0 },
      end: { line: 2, character: 0 },
    });
  });
});
