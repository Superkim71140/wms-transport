import React from "react";

export type HeadingTag = "h1" | "h2" | "h3" | "h4" | "span" | "div";
export type HeadingVariant = "dark" | "light";

export interface TwoToneHeadingProps {
  as?: HeadingTag;
  text: string;
  highlight?: string | string[];
  highlightPhrase?: string | string[];
  variant?: HeadingVariant;
  className?: string;
  highlightClassName?: string;
  id?: string;
}

/**
 * TwoToneHeading provides selective, semantic, and contrast-safe heading color emphasis.
 * On dark hero backgrounds: Main text white, emphasized phrase sky blue (#38BDF8 / #7DD3FC).
 * On light backgrounds: Main text dark navy (#0F172A), emphasized phrase accessible blue (#2563EB).
 *
 * Guarantees:
 * - Exact text preservation (no string replacement bugs, no Thai vowel clipping)
 * - Single semantic heading element
 * - Deterministic, non-intrusive rendering
 */
export default function TwoToneHeading({
  as: Component = "h2",
  text,
  highlight,
  highlightPhrase,
  variant = "light",
  className = "",
  highlightClassName,
  id,
}: TwoToneHeadingProps) {
  if (!text) return null;

  const targetHighlight = highlight || highlightPhrase;

  const defaultHighlightClass =
    variant === "dark"
      ? "text-sky-300 font-bold"
      : "text-blue-600 font-bold";

  const resolvedHighlightClass = highlightClassName || defaultHighlightClass;

  if (!targetHighlight) {
    return (
      <Component id={id} className={className}>
        {text}
      </Component>
    );
  }

  const highlightList = Array.isArray(targetHighlight) ? targetHighlight : [targetHighlight];
  let matchedTarget: string | null = null;
  let matchIndex = -1;

  for (const candidate of highlightList) {
    if (candidate && text.includes(candidate)) {
      matchedTarget = candidate;
      matchIndex = text.indexOf(candidate);
      break;
    }
  }

  if (!matchedTarget || matchIndex === -1) {
    return (
      <Component id={id} className={className}>
        {text}
      </Component>
    );
  }

  const before = text.slice(0, matchIndex);
  const matched = text.slice(matchIndex, matchIndex + matchedTarget.length);
  const after = text.slice(matchIndex + matchedTarget.length);

  return (
    <Component id={id} className={className}>
      {before}
      <span className={resolvedHighlightClass}>{matched}</span>
      {after}
    </Component>
  );
}
