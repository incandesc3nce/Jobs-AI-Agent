export const removeHtmlTags = (text: string): string => {
  // remove html tags
  const withoutStyleAndScript = text
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '');
  const withoutTags = withoutStyleAndScript.replace(/<[^>]*>/g, '');

  // remove html entities
  const withoutEntities = withoutTags
    .replace(/&nbsp;/g, ' ')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#10;/g, '\n')
    .replace(/&apos;/g, "'");

  // Remove extra spaces
  return withoutEntities.replace(/\s+/g, ' ').trim();
};
