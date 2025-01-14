import React from "react";
import {
  getNoVariablesMatchedKey,
  getTextTokenKey,
  getVariableTokenKey,
} from "./keys";
import {
  InputTemplateValues,
  NoMatch,
  StringTemplateKeys,
  TemplateToken,
} from "./typings";

export function defaultNoMatch(key: string) {
  return `{${key}}`;
}

interface Props<S extends string = string> {
  tokens: TemplateToken<StringTemplateKeys<S>>[];
  values?: InputTemplateValues<S>;
  noMatch?: NoMatch<S>;
}

export type { Props as TokensRendererProps };

export function TokensRenderer<S extends string = string>({
  tokens,
  values,
  noMatch = defaultNoMatch as NoMatch<S>,
}: Props<S>) {
  return tokens.map((token) => {
    if (token.type === "text") {
      return (
        <React.Fragment key={getTextTokenKey(token)}>
          {token.text}
        </React.Fragment>
      );
    }

    const value = values?.[token.key as keyof InputTemplateValues<S>];

    if (typeof value !== "undefined") {
      return (
        <React.Fragment key={getVariableTokenKey(token)}>
          {value as React.ReactNode}
        </React.Fragment>
      );
    }

    return (
      <React.Fragment key={getNoVariablesMatchedKey(token)}>
        {noMatch(token.key, token)}
      </React.Fragment>
    );
  });
}
