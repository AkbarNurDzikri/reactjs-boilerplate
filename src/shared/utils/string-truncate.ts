export function stringTruncate(
  text: string,
  maxLength: number,
  ending: string = ".."
): string {
  if (!text || typeof text !== "string") return "";
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trimEnd() + ending;
}
