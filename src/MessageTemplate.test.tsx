import { render } from "@testing-library/react";
import React from "react";
import { describe, expect, it, vi } from "vitest";
import { MessageTemplate } from "./MessageTemplate";

describe("MessageTemplate", () => {
  it("should render a string", () => {
    const result = render(<MessageTemplate template="hello world" />);
    expect(result.container).toMatchSnapshot();
  });

  it("should render correctly", () => {
    const result = render(
      <MessageTemplate
        template="hello, {name}"
        values={{ name: <strong>John Doe</strong> }}
      />
    );
    expect(result.container).toMatchSnapshot();
  });

  it("default noMatch(`{key}`)", () => {
    const result = render(
      <MessageTemplate
        template="his name is {name}, and his age is {age}."
        values={{ name: <strong>John Doe</strong> }}
      />
    );
    expect(result.container).toMatchSnapshot();
  });

  it("customized noMatch", () => {
    const result = render(
      <MessageTemplate
        template="his name is {name}, and his age is {age}."
        values={{ name: <strong>John Doe</strong> }}
        noMatch={(key) => (
          <span style={{ color: "red" }}>{`No value for key: ${key}`}</span>
        )}
      />
    );
    expect(result.container).toMatchSnapshot();
  });

  it("render as a code tag", () => {
    const result = render(
      <MessageTemplate
        tag="code"
        template='console.log("{message}")'
        values={{ message: "Hello World" }}
      />
    );
    expect(result.container).toMatchSnapshot();
  });

  it("refCallback should be called", () => {
    const refCallback = vi.fn() as React.RefCallback<HTMLDivElement | null>;
    expect(refCallback).not.toHaveBeenCalled();
    render(<MessageTemplate template="hello world" ref={refCallback} />);
    expect(refCallback).toHaveBeenCalledTimes(1);
  });
});
