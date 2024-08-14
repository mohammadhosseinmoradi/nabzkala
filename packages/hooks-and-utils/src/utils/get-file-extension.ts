export function getFileExtension(filename: string): string | null {
  if (!filename) return null;

  const segments = filename.split(".");

  if (segments.length === 1) return null; // No extension found

  return `.${segments[segments.length - 1]}`;
}
