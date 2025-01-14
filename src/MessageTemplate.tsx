import React from "react";
import { TokensRenderer, TokensRendererProps } from "./TokensRenderer";
import { ElementForwardedRef, HTMLElementTypes } from "./typings";
import { useTokens } from "./useTokens";

interface Props<S extends string = string, T extends HTMLElementTypes = "div">
  extends Omit<TokensRendererProps<S>, "tokens"> {
  tag?: T;
  tagProps?: Omit<React.ComponentPropsWithoutRef<T>, "children">;
  template?: S;
}

export const MessageTemplate = React.forwardRef(
  <S extends string = string, T extends HTMLElementTypes = "div">(
    { tag, tagProps, values, template, noMatch }: Props<S, T>,
    forwardedRef: ElementForwardedRef<T>
  ) => {
    const tokens = useTokens<S>(template);
    return React.createElement(
      tag ?? "div",
      { ...tagProps, ref: forwardedRef },
      <TokensRenderer<S> tokens={tokens} values={values} noMatch={noMatch} />
    );
  }
) as <S extends string = string, T extends HTMLElementTypes = "div">(
  props: Props<S, T> & { ref?: ElementForwardedRef<T> }
) => React.ReactNode;
