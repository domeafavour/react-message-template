import type React from "react";

export type TextToken = {
  type: "text";
  start: number;
  end: number;
  text: string;
};

export type VariableToken<K extends string = string> = {
  type: "variable";
  start: number;
  end: number;
  key: K;
};

export type TemplateToken<K extends string = string> =
  | TextToken
  | VariableToken<K>;

export type ExtractTemplateValues<S extends string> =
  S extends `{${infer K}}${infer R}`
    ? // eslint-disable-next-line no-unused-vars
      { [_key in K]: React.ReactNode } & ExtractTemplateValues<R>
    : // eslint-disable-next-line no-unused-vars
    S extends `${infer _}${infer R}`
    ? ExtractTemplateValues<R>
    : {};

export type StringTemplateKeys<S extends string = string> = Extract<
  keyof ExtractTemplateValues<S>,
  string
>;

export type NoMatch<S extends string = string> = (
  key: StringTemplateKeys<S>,
  token: VariableToken<StringTemplateKeys<S>>
) => React.ReactNode;

export type InputTemplateValues<S extends string = string> = Partial<
  ExtractTemplateValues<S>
>;

export type ElementForwardedRef<T extends React.ElementType> =
  React.ForwardedRef<React.ComponentRef<T> | null>;

export type HTMLElementTypes = Exclude<
  keyof React.JSX.IntrinsicElements,
  SvgElementTypes | "webview" | "video" | "object" | "canvas" | "audio"
>;

export type SvgElementTypes =
  | "svg"
  | "animate"
  | "animateMotion"
  | "animateTransform"
  | "circle"
  | "clipPath"
  | "defs"
  | "desc"
  | "ellipse"
  | "feBlend"
  | "feColorMatrix"
  | "feComponentTransfer"
  | "feComposite"
  | "feConvolveMatrix"
  | "feDiffuseLighting"
  | "feDisplacementMap"
  | "feDistantLight"
  | "feDropShadow"
  | "feFlood"
  | "feFuncA"
  | "feFuncB"
  | "feFuncG"
  | "feFuncR"
  | "feGaussianBlur"
  | "feImage"
  | "feMerge"
  | "feMergeNode"
  | "feMorphology"
  | "feOffset"
  | "fePointLight"
  | "feSpecularLighting"
  | "feSpotLight"
  | "feTile"
  | "feTurbulence"
  | "filter"
  | "foreignObject"
  | "g"
  | "image"
  | "line"
  | "linearGradient"
  | "marker"
  | "mask"
  | "metadata"
  | "mpath"
  | "path"
  | "pattern"
  | "polygon"
  | "polyline"
  | "radialGradient"
  | "rect"
  | "set"
  | "stop"
  | "switch"
  | "symbol"
  | "text"
  | "textPath"
  | "tspan"
  | "use"
  | "view";
