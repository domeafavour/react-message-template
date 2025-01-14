import { describe, it, expect } from "vitest";
import { createTextToken, createVariableToken, tokenizer } from "./parse";

describe("tokenizer", () => {
  it("should work", () => {
    const tokens = tokenizer("Hello, {name}!");
    expect(tokens).toEqual([
      createTextToken("Hello, ", 0, 7),
      createVariableToken("name", 7, 13),
      createTextToken("!", 13, 14),
    ]);
  });
});
