import * as cheerio from 'cheerio';

export type TocItem = {
  id: string;
  text: string;
  name: 'h2' | 'h3';
};

export function renderToc(body: string): TocItem[] {
  const $ = cheerio.load(body);
  const headings = $('h2, h3').toArray();

  return headings
    .map((heading) => ({
      text: $(heading).text().trim(),
      id: $(heading).attr('id') ?? '',
      name: heading.tagName as TocItem['name'],
    }))
    .filter((item) => item.text && item.id);
}
