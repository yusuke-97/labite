import * as cheerio from 'cheerio';

export type TocItem = {
  id: string;
  text: string;
  name: 'h2' | 'h3';
};

function slugifyHeading(text: string) {
  return text
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\p{Letter}\p{Number}_-]/gu, '');
}

export function addHeadingIds(body: string) {
  const $ = cheerio.load(body, null, false);
  const usedIds = new Map<string, number>();

  $('h2, h3').each((index, heading) => {
    const currentId = $(heading).attr('id');
    const text = $(heading).text().trim();
    const baseId = currentId || slugifyHeading(text) || `heading-${index + 1}`;
    const usedCount = usedIds.get(baseId) ?? 0;
    const id = usedCount === 0 ? baseId : `${baseId}-${usedCount + 1}`;

    usedIds.set(baseId, usedCount + 1);
    $(heading).attr('id', id);
  });

  return $.html();
}

export function renderToc(body: string): TocItem[] {
  const $ = cheerio.load(body, null, false);
  const headings = $('h2, h3').toArray();

  return headings
    .map((heading) => ({
      text: $(heading).text().trim(),
      id: $(heading).attr('id') ?? '',
      name: heading.tagName as TocItem['name'],
    }))
    .filter((item) => item.text && item.id);
}
