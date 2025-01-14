import { TextToken, VariableToken } from "./typings";

export function getTextTokenKey(token: TextToken): string {
  return `text-${token.start}-${token.end}`;
}

export function getVariableTokenKey(token: VariableToken): string {
  return `variable-${token.start}-${token.end}`;
}

export function getNoVariablesMatchedKey(token: VariableToken): string {
  return `no-match-${token.key}`;
}
