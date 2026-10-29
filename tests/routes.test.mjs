import assert from 'node:assert/strict';
import test from 'node:test';
import {
  blogPath,
  getPageAlternates,
  normalizePath,
} from '../src/i18n/routes.ts';

test('shared pages have reciprocal Hungarian and English links', () => {
  for (const section of [
    '',
    'cv',
    'publications',
    'blog',
    'teaching',
    'teaching/example-course',
  ]) {
    const expected = ['hu', 'en'].map((lang) => ({
      lang,
      path: `/${lang}/${section ? `${section}/` : ''}`,
    }));
    for (const lang of ['hu', 'en']) {
      assert.deepEqual(getPageAlternates(`/${lang}/${section}`), expected);
    }
  }
});

test('untranslated posts never advertise a nonexistent or unrelated translation', () => {
  const entries = [
    { id: 'hu/example', data: { lang: 'hu' } },
    { id: 'en/example', data: { lang: 'en' } },
  ];
  assert.deepEqual(getPageAlternates('/hu/blog/example', entries), [
    { lang: 'hu', path: '/hu/blog/example/' },
  ]);
});

test('explicit translation keys connect different slugs', () => {
  const entries = [
    { id: 'hu/pelda.md', data: { lang: 'hu', translationKey: 'example' } },
    { id: 'en/example.mdx', data: { lang: 'en', translationKey: 'example' } },
    { id: 'en/unrelated', data: { lang: 'en', translationKey: 'other' } },
  ];
  const expected = [
    { lang: 'hu', path: '/hu/blog/pelda/' },
    { lang: 'en', path: '/en/blog/example/' },
  ];
  assert.deepEqual(getPageAlternates('/hu/blog/pelda/', entries), expected);
  assert.deepEqual(getPageAlternates('/en/blog/example/', entries), expected);
  assert.equal(blogPath(entries[0]), '/hu/blog/pelda/');
});

test('ambiguous translations fail instead of publishing misleading hreflang', () => {
  const entries = [
    { id: 'one', data: { lang: 'hu', translationKey: 'same' } },
    { id: 'two', data: { lang: 'hu', translationKey: 'same' } },
  ];
  assert.throws(
    () => getPageAlternates('/hu/blog/one/', entries),
    /Duplicate translationKey/,
  );
});

test('paths are canonicalized and unsupported languages have no alternates', () => {
  assert.equal(normalizePath('/hu/cv///'), '/hu/cv/');
  assert.equal(normalizePath('/'), '/');
  assert.deepEqual(getPageAlternates('/de/'), []);
});
