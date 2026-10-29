// src/i18n/ui.ts

export const languages = {
  hu: 'Magyar',
  en: 'English',
};

export const defaultLang = 'hu';
export type Language = keyof typeof languages;

// Fix, globálisan elérhető kontakt linkek az oldalsávhoz és a lábléchez
export const contactLinks = {
  github: 'https://github.com/nagocs',
  linkedIn: 'https://www.linkedin.com/in/nagocs',
};

export const ui = {
  hu: {
    'nav.home': 'Főoldal',
    'nav.main': 'Fő navigáció',
    'nav.language': 'Nyelvválasztás',
    'nav.menu': 'Menü megnyitása vagy bezárása',
    'nav.blog_language': 'Bloglista ezen a nyelven',
    'footer.rights': 'Minden jog fenntartva.',
    'skill.level': 'Szint: {level} a {max}-ból',
    'cv.empty_activity': 'Nincs rögzített tevékenység',
    'seo.home':
      'Agócs Norbert kutatói portfóliója: bemutatkozás, kutatások, önéletrajz és szakmai blog.',
    'seo.cv':
      'Agócs Norbert önéletrajza: tanulmányok, kutatás, oktatás, közéleti tevékenységek és készségek.',
    'seo.publications':
      'Agócs Norbert tudományos publikációi, folyóiratcikkei és konferenciaközleményei.',
    'seo.blog':
      'Agócs Norbert szakmai blogja a mérnöki modellezésről, szimulációról és kutatásról.',
    // Globális Navigáció (Header)
    'nav.publications': 'Publikációk',
    'nav.blog': 'Blog',
    'nav.teaching': 'Oktatás',
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
    'nav.home': 'Home',
    'nav.main': 'Main navigation',
    'nav.language': 'Language selection',
    'nav.menu': 'Open or close menu',
    'nav.blog_language': 'Blog index in this language',
    'footer.rights': 'All rights reserved.',
    'skill.level': 'Level {level} out of {max}',
    'cv.empty_activity': 'No recorded activities',
    'seo.home':
      'Norbert Agócs’s research portfolio: background, research, curriculum vitae and professional blog.',
    'seo.cv':
      'Norbert Agócs’s curriculum vitae: education, research, teaching, public activities and skills.',
    'seo.publications':
      'Scientific publications, journal articles and conference papers by Norbert Agócs.',
    'seo.blog':
      'Norbert Agócs’s professional blog on engineering modelling, simulation and research.',
    // Globális Navigáció (Header)
    'nav.publications': 'Publications',
    'nav.blog': 'Blog',
    'nav.teaching': 'Teaching',
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
