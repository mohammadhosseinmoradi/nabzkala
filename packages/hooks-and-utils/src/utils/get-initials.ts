export function getInitials(value?: string | null) {
  if (!value) return "";
  const words = value.split(" ");
  const initials = words.map((word) => word.charAt(0)).join("");
  return initials.toUpperCase();
}
