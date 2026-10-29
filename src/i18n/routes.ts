import { languages, type Language } from './ui.ts';

export interface LocalizedLink {
  lang: Language;
  path: string;
}

interface BlogEntry {
  id: string;
  data: { lang: Language; translationKey?: string };
}

export function normalizePath(pathname: string) {
  return `${pathname.replace(/\/+$/, '')}/`;
}

export function blogPath(entry: BlogEntry) {
  const slug = entry.id
    .split('/')
    .pop()!
    .replace(/\.(md|mdx)$/, '');
  return `/${entry.data.lang}/blog/${slug}/`;
}

export function getPageAlternates(
  pathname: string,
  entries: BlogEntry[] = [],
): LocalizedLink[] {
  const currentPath = normalizePath(pathname);
  const [, lang, ...segments] = currentPath.split('/');
  if (!Object.hasOwn(languages, lang)) return [];
  const section = segments.filter(Boolean).join('/');

  if (
    ['', 'cv', 'publications', 'blog', 'teaching'].includes(section) ||
    /^teaching\/[a-z0-9]+(?:-[a-z0-9]+)*$/.test(section)
  ) {
    return (Object.keys(languages) as Language[]).map((language) => ({
      lang: language,
      path: `/${language}/${section ? `${section}/` : ''}`,
    }));
  }

  const current = entries.find((entry) => blogPath(entry) === currentPath);
  if (!current) return [{ lang: lang as Language, path: currentPath }];

  // Matching filenames alone do not prove that two articles are translations.
  const translations = current.data.translationKey
    ? entries.filter(
        (entry) => entry.data.translationKey === current.data.translationKey,
      )
    : [current];
  const seen = new Set<Language>();
  return translations.map((entry) => {
    if (seen.has(entry.data.lang)) {
      throw new Error(
        `Duplicate translationKey for ${entry.data.lang}: ${entry.data.translationKey}`,
      );
    }
    seen.add(entry.data.lang);
    return { lang: entry.data.lang, path: blogPath(entry) };
  });
}
