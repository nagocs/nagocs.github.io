// src/i18n/ui.ts

export const languages = {
  hu: 'Magyar',
  en: 'English',
};

export const defaultLang = 'hu';

// Fix, globálisan elérhető kontakt linkek az oldalsávhoz és a lábléchez
export const contactLinks = {
  github: 'https://github.com/nagocs',
  linkedIn: 'https://www.linkedin.com/in/nagocs',
};

export const ui = {
  hu: {
    // Globális Navigáció (Header)
    'nav.publications': 'Publikációk',
    'nav.blog': 'Blog',
    'nav.cv': 'CV',

    // Globális Oldalsáv (Sidebar)
    'sidebar.name': 'Agócs Norbert',
    'sidebar.bio':
      'PhD hallgató @ BME | AI & Szimuláció | Gépészmérnök (MSc) |Mechatronikai mérnök (BSc)',
    'sidebar.location': 'Budapest, Magyarország',
    'sidebar.institution': 'BME-GPK',
    'sidebar.email': 'nagocs@me.com',

    // Főoldal Specifikus Feliratok (index.astro)
    'home.about_title': 'Rólam',
    'home.recent_posts': 'Legutóbbi Blogbejegyzések',
    'home.view_all': 'Összes bejegyzés megtekintése →',
  },
  en: {
    // Globális Navigáció (Header)
    'nav.publications': 'Publications',
    'nav.blog': 'Blog',
    'nav.cv': 'CV',

    // Globális Oldalsáv (Sidebar)
    'sidebar.name': 'Norbert Agócs',
    'sidebar.bio':
      'PhD Student @ BME | AI & Simulation | Mechanical Engineer (MSc) | Mechatronics Engineer (BSc)',
    'sidebar.location': 'Budapest, Hungary',
    'sidebar.institution': 'BME-GPK',
    'sidebar.email': 'nagocs@me.com',

    // Főoldal Specifikus Feliratok (index.astro)
    'home.about_title': 'About Me',
    'home.recent_posts': 'Recent Blog Posts',
    'home.view_all': 'View all posts →',
  },
} as const;
