export function extractTextFromHTML({
  htmlContent,
  number,
}: {
  htmlContent: string;
  number?: number;
}) {
  if (!htmlContent) return '';

  // Extract all <p> tag contents
  const matches = [...htmlContent.matchAll(/<p>(.*?)<\/p>/g)];

  if (!matches.length) return '';

  // Concatenate all paragraph text content
  let text = matches.map((match) => match[1]).join(' ');

  // Remove all remaining HTML tags while keeping text
  text = text.replace(
    /<\/?(span|a|strong|em|u|i|b|div|br|ul|li|ol|h[1-6])[^>]*>/g,
    ''
  );

  // Trim & return only required length
  return number && text.length > number ? text.slice(0, number) + '...' : text;
}
