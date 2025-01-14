import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { TokensRenderer } from "./TokensRenderer";
import { createTextToken, createVariableToken } from "./parse";

describe("TokensRenderer", () => {
  it("should render correctly", () => {
    const result = render(
      <TokensRenderer<"Hello, {name}!">
        tokens={[
          createTextToken("Hello, ", 0, 7),
          createVariableToken("name", 7, 13),
          createTextToken("!", 13, 14),
        ]}
        values={{ name: <strong>John Doe</strong> }}
      />
    );
    // <div>Hello, <strong>John Doe</strong>!</div>
    expect(result.container).toMatchSnapshot();
  });
});
