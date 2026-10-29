import assert from 'node:assert/strict';
import test from 'node:test';
import { readFileSync } from 'node:fs';
import { courseSchema } from '../src/lib/teaching-schema.ts';
import {
  localize,
  textLanguage,
  publishedCourses,
} from '../src/lib/teaching.ts';

const template = JSON.parse(
  readFileSync(
    new URL('../src/content/teaching/minta-tantargy.json', import.meta.url),
    'utf8',
  ),
);
function course() {
  return structuredClone(template);
}

test('editing template is valid, unpublished and cannot publish placeholder links', () => {
  assert.equal(courseSchema.parse(course()).draft, true);
  const data = course();
  data.draft = false;
  assert.equal(courseSchema.safeParse(data).success, false);
});

test('rejects unsafe URLs, deceptive SharePoint domains and oversized files', () => {
  for (const url of [
    'not a URL',
    'javascript:alert(1)',
    'http://example.sharepoint.com/file',
    'https://name:password@example.sharepoint.com/file',
    'https://example.sharepoint.com.evil.example/file',
    'https://example.org/file',
  ]) {
    const data = course();
    data.sessions[0].materials[0].url = url;
    assert.equal(courseSchema.safeParse(data).success, false, url);
  }
  const data = course();
  data.sessions[0].materials[0].sizeBytes = 5_000_001;
  assert.equal(courseSchema.safeParse(data).success, false);
});

test('validates dates, file sizes, stable IDs and unique languages', () => {
  for (const change of [
    (data) => {
      data.sessions[0].materials[0].updated = '2026-02-30';
    },
    (data) => {
      delete data.sessions[0].materials[0].sizeBytes;
    },
    (data) => {
      data.sessions[0].materials[1].id = data.sessions[0].materials[0].id;
    },
    (data) => {
      data.sessions.push(structuredClone(data.sessions[0]));
    },
    (data) => {
      data.sessions[0].materials[0].languages = ['hu', 'hu'];
    },
    (data) => {
      data.slug = '../unsafe';
    },
  ]) {
    const data = course();
    change(data);
    assert.equal(courseSchema.safeParse(data).success, false);
  }
});

test('public repositories need no invented file size and university access is the default', () => {
  const data = course();
  const material = data.sessions[0].materials[0];
  delete material.access;
  assert.equal(
    courseSchema.parse(data).sessions[0].materials[0].access,
    'university',
  );
  material.access = 'public';
  material.type = 'github';
  material.url = 'https://github.com/example/template';
  delete material.sizeBytes;
  assert.equal(courseSchema.safeParse(data).success, true);
});

test('publication removes drafts at every level without mutating source data', () => {
  const data = courseSchema.parse(course());
  data.draft = false;
  data.sessions[0].materials[0].draft = true;
  data.sessions.push({
    ...structuredClone(data.sessions[0]),
    id: 'hidden',
    draft: true,
  });
  const hidden = {
    ...structuredClone(data),
    slug: 'hidden-course',
    draft: true,
  };
  const result = publishedCourses([hidden, data]);
  assert.equal(result.length, 1);
  assert.equal(result[0].sessions.length, 1);
  assert.deepEqual(
    result[0].sessions[0].materials.map((item) => item.id),
    ['html-csomag'],
  );
  assert.equal(data.sessions.length, 2);
  assert.equal(data.sessions[0].materials.length, 2);
  assert.throws(
    () => publishedCourses([data, data]),
    /Duplicate teaching slug/,
  );
});

test('English UI falls back to Hungarian content with the correct content language', () => {
  assert.equal(localize({ hu: 'Jegyzet' }, 'en'), 'Jegyzet');
  assert.equal(textLanguage({ hu: 'Jegyzet' }, 'en'), 'hu');
  assert.equal(localize({ hu: 'Jegyzet', en: 'Notes' }, 'en'), 'Notes');
  assert.equal(textLanguage({ hu: 'Jegyzet', en: 'Notes' }, 'en'), 'en');
});
