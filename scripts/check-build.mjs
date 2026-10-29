import assert from 'node:assert/strict';
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import path from 'node:path';

const output = path.resolve('dist');
assert.ok(existsSync(output), 'Run npm run build before checking its output.');
const walk = (directory) =>
  readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const file = path.join(directory, entry.name);
    return entry.isDirectory() ? walk(file) : [file];
  });
const files = walk(output);
const pages = files.filter((file) => file.endsWith('.html'));
const attributes = (tag) =>
  Object.fromEntries(
    [...tag.matchAll(/([\w-]+)="([^"]*)"/g)].map((match) => [
      match[1],
      match[2],
    ]),
  );
const links = (html) =>
  [...html.matchAll(/<link\b[^>]*>/g)].map(([tag]) => attributes(tag));
const site = new URL('https://nagocs.github.io');
const resolvePage = (pathname) =>
  path.join(output, decodeURIComponent(pathname), 'index.html');

for (const file of pages) {
  const html = readFileSync(file, 'utf8');
  const relative = path.relative(output, file).replaceAll('\\', '/');
  assert.doesNotMatch(
    html,
    /chat-trigger|chat-window|localhost:8787/,
    relative,
  );

  // Validate actual links, including assets, rather than a fixed count of pages.
  for (const [, href] of html.matchAll(/(?:href|src)="(\/[^"\s]*)"/g)) {
    if (href.startsWith('//')) continue;
    const pathname = new URL(href, site).pathname;
    const target = path.join(output, decodeURIComponent(pathname));
    assert.ok(
      existsSync(target) || existsSync(resolvePage(pathname)),
      `${relative}: missing ${href}`,
    );
  }

  if (relative === 'index.html') continue;
  assert.match(
    html,
    /href="\/(?:hu|en)\/teaching\/?"/,
    `${relative}: teaching navigation missing`,
  );
  for (const [tag] of html.matchAll(/<a\b[^>]*\bdata-material-link\b[^>]*>/g)) {
    const link = attributes(tag);
    assert.equal(
      link.target,
      '_blank',
      `${relative}: material must open a new tab`,
    );
    assert.ok(
      link.rel?.split(' ').includes('noopener'),
      `${relative}: missing noopener`,
    );
    assert.ok(
      link.rel?.split(' ').includes('noreferrer'),
      `${relative}: missing noreferrer`,
    );
    assert.equal(
      new URL(link.href).protocol,
      'https:',
      `${relative}: unsafe material URL`,
    );
  }
  const lang = relative.split('/')[0];
  assert.match(html, new RegExp(`<html[^>]*lang="${lang}"`), relative);
  const description = [...html.matchAll(/<meta\b[^>]*>/g)]
    .map(([tag]) => attributes(tag))
    .find((meta) => meta.name === 'description');
  assert.ok(description?.content?.trim(), `${relative}: missing description`);
  const metadata = links(html);
  const canonical = metadata.filter((link) => link.rel === 'canonical');
  assert.equal(canonical.length, 1, `${relative}: canonical must be unique`);
  assert.equal(
    canonical[0].href,
    new URL(`/${relative.replace(/index\.html$/, '')}`, site).href,
  );

  const alternates = metadata.filter((link) => link.rel === 'alternate');
  assert.ok(
    alternates.some(
      (link) => link.hreflang === lang && link.href === canonical[0].href,
    ),
  );
  for (const alternate of alternates) {
    const url = new URL(alternate.href);
    assert.equal(url.origin, site.origin);
    const target = resolvePage(url.pathname);
    assert.ok(
      existsSync(target),
      `${relative}: missing translation ${url.pathname}`,
    );
    assert.ok(
      links(readFileSync(target, 'utf8')).some(
        (link) =>
          link.rel === 'alternate' &&
          link.hreflang === lang &&
          link.href === canonical[0].href,
      ),
      `${relative}: translation links must be reciprocal`,
    );
  }
  if (lang === 'en') {
    assert.doesNotMatch(
      html,
      /Minden jog fenntartva|aria-label="Szint:|>\s*Főoldal\s*</,
      relative,
    );
    assert.match(html, /All rights reserved/);
  }
}

// Check real generated course routes, including nested draft omissions.
for (const source of walk(path.resolve('src/content/teaching')).filter((file) =>
  file.endsWith('.json'),
)) {
  const course = JSON.parse(readFileSync(source, 'utf8'));
  for (const lang of ['hu', 'en']) {
    const page = resolvePage(`/${lang}/teaching/${course.slug}/`);
    if (course.draft !== false) {
      assert.ok(
        !existsSync(page),
        `Draft course was published: ${course.slug}`,
      );
      continue;
    }
    assert.ok(
      existsSync(page),
      `Missing course page: ${course.slug} (${lang})`,
    );
    const html = readFileSync(page, 'utf8');
    const expected = course.sessions
      .filter((session) => !session.draft)
      .flatMap((session) =>
        session.materials
          .filter((item) => !item.draft)
          .map((item) => `material-${item.id}`),
      );
    const actual = [...html.matchAll(/<article\b[^>]*>/g)].map(
      ([tag]) => attributes(tag).id,
    );
    assert.deepEqual(
      actual.sort(),
      expected.sort(),
      `${course.slug}: published materials differ`,
    );
    for (const session of course.sessions) {
      assert.equal(
        html.includes(`id="session-${session.id}"`),
        !session.draft,
        `${course.slug}: session visibility`,
      );
    }
    assert.doesNotMatch(
      html,
      /data-filters|data-search|material-search|data-no-results/,
      `${course.slug}: obsolete teaching search controls or data`,
    );
  }
}

const css = files
  .filter((file) => file.endsWith('.css'))
  .map((file) => readFileSync(file, 'utf8'))
  .join('\n');
assert.match(
  css,
  /--tw-prose-body/,
  'Tailwind typography styles must be generated.',
);
console.log(
  `Checked ${pages.length} pages: metadata, reciprocal translations, local links, localization, teaching publication and typography.`,
);
