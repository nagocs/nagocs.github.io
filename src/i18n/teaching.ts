export const teachingUi = {
  hu: {
    title: 'Oktatás',
    intro:
      'Tananyagok, példák és sablonok tantárgyanként, témakörök és alkalmak szerint rendezve.',
    empty:
      'A tananyagkatalógus feltöltés alatt áll. A tantárgyak hamarosan itt lesznek elérhetők.',
    back: 'Összes tantárgy',
    course: 'Tantárgy megnyitása',
    sessions: 'alkalom',
    materials: 'tananyag',
    access:
      'Az egyetemi anyagokhoz a megfelelő tantárgyi jogosultsággal rendelkező Microsoft-fiók szükséges. A tananyagok új lapon nyílnak meg, vagy letöltődnek; ez az oldal nyitva marad.',
    university: 'Egyetemi hozzáférés',
    public: 'Nyilvános',
    open: 'Tananyag megnyitása',
    repository: 'Repository megnyitása',
    newTab: 'új lapon',
    updated: 'Frissítve',
    noMaterials: 'Ehhez az alkalomhoz még nincs közzétett tananyag.',
    noSessions: 'A tantárgy anyagai feltöltés alatt állnak.',
    languages: { hu: 'Magyar', de: 'Német', en: 'Angol' },
  },
  en: {
    title: 'Teaching',
    intro:
      'Learning materials, examples and templates organised by course and topic or session.',
    empty:
      'The teaching catalogue is being prepared. Courses will be available here soon.',
    back: 'All courses',
    course: 'View course',
    sessions: 'sessions',
    materials: 'materials',
    access:
      'University materials require a Microsoft account with access to the course. Materials open in a new tab or download; this page stays open.',
    university: 'University access',
    public: 'Public',
    open: 'Open material',
    repository: 'Open repository',
    newTab: 'new tab',
    updated: 'Updated',
    noMaterials: 'No materials have been published for this session yet.',
    noSessions: 'Materials for this course are being prepared.',
    languages: { hu: 'Hungarian', de: 'German', en: 'English' },
  },
} as const;

export const materialTypes = {
  pdf: 'PDF',
  python: 'Python',
  html: 'HTML',
  latex: 'LaTeX',
  zip: 'ZIP',
  github: 'GitHub',
} as const;
