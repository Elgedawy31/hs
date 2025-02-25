export function truncateText(text, maxLength, ellipsis) {
  if (!text) return "";
  if (text.length <= maxLength) return text;

  return text.slice(0, maxLength - ellipsis.length).trim() + ellipsis;
}
