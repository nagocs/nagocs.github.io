export const languages = {
  hu: 'Magyar',
  en: 'English',
};

export const defaultLang = 'hu';

export const ui = {
  hu: {
    'sidebar.name': 'Agócs Norbert',
    'sidebar.bio': 'PhD hallgató',
    'sidebar.location': 'Budapest, Magyarország',
    'sidebar.institution': 'BME-GPK',
    'sidebar.email': 'nagocs@mm.bme.hu',
    'nav.publications': 'Publikációk',
    'nav.blog': 'Blogbejegyzések',
    'nav.cv': 'Önéletrajz',
    'home.recent_posts': 'Legutóbbi Blogbejegyzések',
    'home.view_all': 'Összes bejegyzés megtekintése',
  },
  en: {
    'sidebar.name': 'Norbert Agócs',
    'sidebar.bio': 'PhD student',
    'sidebar.location': 'Budapest, Hungary',
    'sidebar.institution': 'BME-GPK',
    'sidebar.email': 'nagocs@mm.bme.hu',
    'nav.publications': 'Publications',
    'nav.blog': 'Blog Posts',
    'nav.cv': 'CV',
    'home.recent_posts': 'Recent Blog Posts',
    'home.view_all': 'View all posts',
  },
} as const;

export const contactLinks = {
  github: 'https://github.com/nagocs',
};

export type UILang = keyof typeof ui;
export type UIKeys = keyof (typeof ui)[typeof defaultLang];

export interface CVData {
  title: string;
  education: {
    period: string;
    institution: string;
    degree: string;
    details: string[];
  }[];
  experience: {
    period: string;
    workplace: string;
    position: string;
    details: string[];
  }[];
  research: { summary: string; grants: string[] };
  teaching: { stats: { label: string; value: number }[]; courses: string[] };
  skills: { name: string; level: number }[];
  awards: { year: string; name: string }[];
}

// Példa a magyar szótárra (hu.ts-be vagy ui.ts-be)
export const cvHu: CVData = {
  title: 'Szakmai Önéletrajz',
  education: [
    {
      period: '2018 — 2022',
      institution: 'Eötvös Loránd Tudományegyetem',
      degree: 'PhD Informatikai Tudományok',
      details: [
        'Summa cum laude minősítés',
        'Kutatási terület: Elosztott rendszerek',
      ],
    },
  ],
  experience: [
    {
      period: '2022 — Jelenleg',
      workplace: 'MTA Kutatóközpont',
      position: 'Szenior Kutató',
      details: [
        'RAG alapú modellek optimalizálása',
        'Nemzetközi konzorciumok vezetése',
      ],
    },
  ],
  research: {
    summary:
      'Fő kutatási területem az AI-alapú tudásreprezentáció statikus környezetben.',
    grants: [
      'OTKA Fiatal Kutatói Ösztöndíj (2023)',
      'Bolyai János Kutatási Ösztöndíj (2024)',
    ],
  },
  teaching: {
    stats: [
      { label: 'Szakdolgozók', value: 12 },
      { label: 'TDK hallgatók', value: 4 },
    ],
    courses: [
      'Szoftverarchitektúrák',
      'Bevezetés a Mesterséges Intelligenciába',
    ],
  },
  skills: [
    { name: 'TypeScript / Astro', level: 6 },
    { name: 'Python / PyTorch', level: 5 },
    { name: 'Rendszerarchitektúra', level: 6 },
  ],
  awards: [{ year: '2024', name: 'Kiváló Oktató Diploma' }],
};

export const cvEn: CVData = {
  title: 'Szakmai Önéletrajz',
  education: [
    {
      period: '2018 — 2022',
      institution: 'Eötvös Loránd Tudományegyetem',
      degree: 'PhD Informatikai Tudományok',
      details: [
        'Summa cum laude minősítés',
        'Kutatási terület: Elosztott rendszerek',
      ],
    },
  ],
  experience: [
    {
      period: '2022 — Jelenleg',
      workplace: 'MTA Kutatóközpont',
      position: 'Szenior Kutató',
      details: [
        'RAG alapú modellek optimalizálása',
        'Nemzetközi konzorciumok vezetése',
      ],
    },
  ],
  research: {
    summary:
      'Fő kutatási területem az AI-alapú tudásreprezentáció statikus környezetben.',
    grants: [
      'OTKA Fiatal Kutatói Ösztöndíj (2023)',
      'Bolyai János Kutatási Ösztöndíj (2024)',
    ],
  },
  teaching: {
    stats: [
      { label: 'Szakdolgozók', value: 12 },
      { label: 'TDK hallgatók', value: 4 },
    ],
    courses: [
      'Szoftverarchitektúrák',
      'Bevezetés a Mesterséges Intelligenciába',
    ],
  },
  skills: [
    { name: 'TypeScript / Astro', level: 6 },
    { name: 'Python / PyTorch', level: 5 },
    { name: 'Rendszerarchitektúra', level: 6 },
  ],
  awards: [{ year: '2024', name: 'Kiváló Oktató Diploma' }],
};
