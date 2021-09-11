/**
 * Parse html and replace {{var}} by its value stored in obj
 *
 * @param {string} html - The raw html file
 * @param {object} obj - The object that stores values
 *
 * @returns {string} - The final html with values parsed from obj
 */
export function HtmlParser(html, obj) {
  for (const [key, value] of Object.entries(obj)) {
    const re = new RegExp(`{{${key}}}`, "g");
    html = html.replace(re, value);
  }

  return html;
}
