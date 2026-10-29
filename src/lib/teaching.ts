export type LocalizedText = { hu: string; en?: string };

export function localize(text: LocalizedText, lang: 'hu' | 'en') {
  return lang === 'en' && text.en ? text.en : text.hu;
}

export function textLanguage(text: LocalizedText, lang: 'hu' | 'en') {
  return lang === 'en' && text.en ? 'en' : 'hu';
}

export function publishedCourses<
  T extends {
    slug: string;
    draft: boolean;
    order: number;
    sessions: {
      draft: boolean;
      order: number;
      materials: { draft: boolean }[];
    }[];
  },
>(courses: T[]) {
  const slugs = new Set<string>();
  for (const course of courses) {
    if (slugs.has(course.slug))
      throw new Error(`Duplicate teaching slug: ${course.slug}`);
    slugs.add(course.slug);
  }
  // Draft metadata must never reach the generated page or its metadata.
  return courses
    .filter((course) => !course.draft)
    .sort((a, b) => a.order - b.order || a.slug.localeCompare(b.slug))
    .map((course) => ({
      ...course,
      sessions: course.sessions
        .filter((session) => !session.draft)
        .sort((a, b) => a.order - b.order)
        .map((session) => ({
          ...session,
          materials: session.materials.filter((material) => !material.draft),
        })),
    })) as T[];
}
