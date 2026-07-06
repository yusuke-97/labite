import { getAbsoluteUrl, siteName } from './site-metadata';

type BreadcrumbItem = {
  name: string;
  path: string;
};

type ItemListItem = {
  name: string;
  path: string;
  image?: string;
  datePublished?: string;
};

export function createBreadcrumbListJsonLd(items: BreadcrumbItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: getAbsoluteUrl(item.path),
    })),
  };
}

export function createItemListJsonLd({
  name,
  path,
  items,
}: {
  name: string;
  path: string;
  items: ItemListItem[];
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name,
    url: getAbsoluteUrl(path),
    numberOfItems: items.length,
    itemListOrder: 'https://schema.org/ItemListOrderAscending',
    itemListElement: items.map((item, index) => {
      const url = getAbsoluteUrl(item.path);

      return {
        '@type': 'ListItem',
        position: index + 1,
        url,
        item: {
          '@type': 'BlogPosting',
          '@id': url,
          url,
          headline: item.name,
          ...(item.image ? { image: [item.image] } : {}),
          ...(item.datePublished ? { datePublished: item.datePublished } : {}),
        },
      };
    }),
  };
}

export const sitePersonId = getAbsoluteUrl('/about#person');
export const siteWebsiteId = getAbsoluteUrl('/#website');

export function createSitePersonJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': sitePersonId,
    name: 'しゅう',
    alternateName: 'shu',
    url: getAbsoluteUrl('/about'),
    image: getAbsoluteUrl('/images/profile-shu.png'),
    jobTitle: 'Webエンジニア',
    knowsAbout: ['PHP', 'Laravel', 'JavaScript', 'Webエンジニア転職', '未経験エンジニア学習'],
  };
}

export function createSitePersonReferenceJsonLd() {
  const person = createSitePersonJsonLd();

  return {
    '@type': 'Person',
    '@id': person['@id'],
    name: person.name,
    url: person.url,
  };
}

export function createProfilePageJsonLd() {
  const person = { ...createSitePersonJsonLd() };

  delete person['@context'];

  return {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    '@id': getAbsoluteUrl('/about#profile-page'),
    url: getAbsoluteUrl('/about'),
    mainEntity: person,
  };
}

export function createWebSiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': siteWebsiteId,
    name: siteName,
    alternateName: ['Labite Tech'],
    url: getAbsoluteUrl('/'),
    publisher: {
      '@type': 'Person',
      '@id': sitePersonId,
    },
    creator: {
      '@type': 'Person',
      '@id': sitePersonId,
    },
  };
}
