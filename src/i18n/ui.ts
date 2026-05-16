export const languages = {
  hu: 'Magyar',
  en: 'English',
};

export const defaultLang = 'hu';

export const ui = {
  hu: {
    'sidebar.name': 'Agócs Norbert',
    'sidebar.bio':
      'PhD hallgató @ BME | AI & Szimuláció | Gépészmérnök (MSc) | Mechatronikai mérnök (BSc)',
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
    'sidebar.bio':
      'PhD student @ BME | AI & Simulation | Mechanical Engineer (MSc) | Mechatronics Engineer (BSc)',
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
  linkedIn: 'https://www.linkedin.com/in/nagocs/',
};

export type UILang = keyof typeof ui;
export type UIKeys = keyof (typeof ui)[typeof defaultLang];
