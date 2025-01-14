import {
  StringTemplateKeys,
  TemplateToken,
  TextToken,
  VariableToken,
} from "./typings";

export function createTextToken(
  text: string,
  start: number,
  end: number
): TextToken {
  return { type: "text", start, end, text };
}

export function createVariableToken<K extends string = string>(
  key: K,
  start: number,
  end: number
): VariableToken<K> {
  return { type: "variable", start, end, key };
}

export function tokenizer<S extends string = string>(input: S) {
  const VARIABLE_PATTERN = /{([^}]+)}/g;
  const tokens: TemplateToken<StringTemplateKeys<S>>[] = [];
  let match: RegExpExecArray | null;
  let lastIndex = 0;

  while ((match = VARIABLE_PATTERN.exec(input))) {
    const [full, key] = match;
    const start = match.index;
    const end = start + full.length;
    if (start > lastIndex) {
      tokens.push(
        createTextToken(input.slice(lastIndex, start), lastIndex, start)
      );
    }
    tokens.push(createVariableToken(key as StringTemplateKeys<S>, start, end));
    lastIndex = end;
  }

  if (lastIndex < input.length) {
    tokens.push(
      createTextToken(input.slice(lastIndex), lastIndex, input.length)
    );
  }

  return tokens;
}
