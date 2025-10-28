import { add } from "./stringCalculator";

describe("String Calculator", () => {
  test("returns 0 for empty string", () => {
    expect(add("")).toBe(0);
  });

  test("returns the number for single number", () => {
    expect(add("1")).toBe(1);
    expect(add("5")).toBe(5);
  });

  test("returns sum of two numbers separated by comma", () => {
    expect(add("1,2")).toBe(3);
    expect(add("5,10")).toBe(15);
  });

  test("returns sum of multiple numbers", () => {
    expect(add("1,2,3,4,5")).toBe(15);
    expect(add("10,20,30")).toBe(60);
  });

  test("handles new lines between numbers", () => {
    expect(add("1\n2,3")).toBe(6);
  });

  test("supports different delimiters", () => {
    expect(add("//;\n1;2")).toBe(3);
    expect(add("//|\n1|2|3")).toBe(6);
  });

  test("throws exception for negative numbers", () => {
    expect(() => add("1,-2,3,-4")).toThrow(
      "negative numbers not allowed: -2,-4"
    );
  });

  test("ignores numbers greater than 1000", () => {
    expect(add("2,1001")).toBe(2);
    expect(add("1000,1001,5")).toBe(1005);
  });
});
