import { useMemo } from "react";
import { tokenizer } from "./parse";

export function useTokens<S extends string = string>(template?: S) {
  return useMemo(() => (template ? tokenizer<S>(template) : []), [template]);
}
