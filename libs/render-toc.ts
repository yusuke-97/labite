import * as cheerio from 'cheerio';
import type { AnyNode, Element } from 'domhandler';

export type TocItem = {
  id: string;
  text: string;
  name: 'h2' | 'h3';
};

const meaningfulEmptyParagraphChildren = 'img,video,iframe,embed,object,svg,table,code,pre';

function getNodeTextForCodeBlock($: cheerio.CheerioAPI, node: AnyNode): string {
  if (node.type === 'text') {
    return node.data;
  }

  if (node.type !== 'tag') {
    return '';
  }

  if (node.tagName === 'br') {
    return '\n';
  }

  return $(node)
    .contents()
    .toArray()
    .map((child) => getNodeTextForCodeBlock($, child))
    .join('');
}

function normalizeCodeBlockText($: cheerio.CheerioAPI, pre: Element): string {
  let text = '';

  $(pre)
    .contents()
    .each((_, node) => {
      if (node.type === 'tag' && ['p', 'div'].includes(node.tagName)) {
        if (text && !text.endsWith('\n')) {
          text += '\n';
        }

        text += getNodeTextForCodeBlock($, node);

        if (text && !text.endsWith('\n')) {
          text += '\n';
        }

        return;
      }

      if (node.type === 'tag' && node.tagName === 'code') {
        $(node)
          .contents()
          .each((_, codeNode) => {
            if (codeNode.type === 'tag' && ['p', 'div'].includes(codeNode.tagName)) {
              if (text && !text.endsWith('\n')) {
                text += '\n';
              }

              text += getNodeTextForCodeBlock($, codeNode);

              if (text && !text.endsWith('\n')) {
                text += '\n';
              }

              return;
            }

            text += getNodeTextForCodeBlock($, codeNode);
          });

        return;
      }

      text += getNodeTextForCodeBlock($, node);
    });

  return text.replace(/^\n+/, '').replace(/\n+$/, '');
}

function normalizeFlattenedTreeText(text: string): string {
  const branchCount = text.match(/[├└]──/g)?.length ?? 0;

  if (text.includes('\n') || branchCount < 2) {
    return text;
  }

  return text
    .replace(/([ \t]+)((?:│[ \t]+)?[├└]──)/g, (_, indentation: string, branch: string) => {
      const preservedIndentation = branch.startsWith('│') || indentation.length === 1
        ? ''
        : indentation;

      return `\n${preservedIndentation}${branch}`;
    })
    .replace(/[ \t]+$/gm, '')
    .trim();
}

function normalizePreCodeBlocks($: cheerio.CheerioAPI) {
  $('pre').each((_, pre) => {
    const hasParagraphs = $(pre).find('p').length > 0;
    const normalizedText = normalizeFlattenedTreeText(normalizeCodeBlockText($, pre));

    if (!hasParagraphs && normalizedText === $(pre).text()) {
      return;
    }

    const firstCode = $(pre).children('code').first();
    const codeAttributes = firstCode.attr();
    const code = $('<code></code>');

    if (codeAttributes) {
      Object.entries(codeAttributes).forEach(([name, value]) => {
        if (typeof value === 'string') {
          code.attr(name, value);
        }
      });
    }

    code.text(normalizedText);
    $(pre).empty().append(code);
  });
}

function isEmptyParagraph($: cheerio.CheerioAPI, paragraph: Element) {
  const clone = $(paragraph).clone();
  clone.find('br').remove();

  const text = clone.text().replace(/\u00a0/g, '').trim();
  const hasMeaningfulChild = clone.find(meaningfulEmptyParagraphChildren).length > 0;

  return !text && !hasMeaningfulChild;
}

function slugifyHeading(text: string) {
  return text
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\p{Letter}\p{Number}_-]/gu, '');
}

export function cleanArticleHtml(body: string) {
  const $ = cheerio.load(body, null, false);

  normalizePreCodeBlocks($);

  $('p').each((_, paragraph) => {
    if (isEmptyParagraph($, paragraph)) {
      $(paragraph).remove();
    }
  });

  $('ul > p, ol > p').remove();

  return $.html();
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
