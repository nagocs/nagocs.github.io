export interface CVItem {
  period: string;
  institution: string;
  title: string;
  bullets?: string[];
}

export interface ActivityRole {
  period: string;
  title: string;
  bullets?: string[];
}

export interface OrganizationActivity {
  organization: string;
  roles: ActivityRole[];
}

export interface SkillItem {
  name: string;
  level: 1 | 2 | 3 | 4 | 5 | 6;
}

export interface CVStructure {
  personal: {
    title: string;
  };
  education: CVItem[];
  activities: OrganizationActivity[];
  research: {
    summary: string;
    grants: { period: string; title: string }[];
  };
  teaching: {
    stats: { label: string; count: number }[];
    courses: string[];
  };
  awards: { year: string; title: string; institution: string }[];
  skills: SkillItem[];
}

export const cvLabels = {
  hu: {
    education: 'Tanulmányok',
    activities: 'Közéleti tevékenységek',
    research: 'Kutatás',
    publications: 'Publikációk',
    grants: 'Kutatói ösztöndíjak',
    teaching: 'Oktatás',
    awards: 'Díjak & Kitüntetések',
    skills: 'Készségek',
    view_publications: 'Teljes publikációs lista megtekintése →',
  },
  en: {
    education: 'Education',
    activities: 'Public Activities',
    research: 'Research',
    publications: 'Publications',
    grants: 'Research Grants',
    teaching: 'Teaching',
    awards: 'Awards & Honors',
    skills: 'Skills',
    view_publications: 'View full list of publications →',
  },
};

export const cvTranslations: Record<'hu' | 'en', CVStructure> = {
  hu: {
    personal: {
      title: 'Önéletrajz',
    },
    education: [
      {
        period: '2024. szeptember — Jelenleg',
        institution: 'Budapesti Műszaki és Gazdaságtudományi Egyetem',
        title: 'Doktori képzés (PhD), Gépészmérnöki tudományok',
        bullets: [],
      },
      {
        period: '2022. február — 2024. július',
        institution: 'Budapesti Műszaki és Gazdaságtudományi Egyetem',
        title: 'Gépészeti modellezés mesterszak (MSc)',
        bullets: [],
      },
      {
        period: '2020. október — 2021. ápril',
        institution: 'Karlsruhe Institute of Technology (KIT)',
        title: 'Külföldi tanulmányút (Erasmus+ ösztöndíj program)',
        bullets: [],
      },
      {
        period: '2018. szeptember — 2022. január',
        institution: 'Budapesti Műszaki és Gazdaságtudományi Egyetem',
        title: 'Mechatronika mérnöki alapszak (BSc)',
        bullets: [],
      },
    ],
    activities: [
      {
        organization: 'Gépészkari Hallgatói Képviselet (GHK)',
        roles: [
          {
            period: '2024. október — Jelenleg is',
            title: 'Tanácsadó testületi tag',
            bullets: [],
          },
          {
            period: '2024. október — Jelenleg is',
            title: 'Tanácsadó testületi elnök',
            bullets: [],
          },
          {
            period: '2022. május — 2024. október',
            title: 'Elnök',
            bullets: [],
          },
          {
            period: '2021. április — 2022. május',
            title: 'Alelnök',
            bullets: [],
          },
          {
            period: '2021. október — 2022. május',
            title: 'Tanulmányi és oktatási referens',
            bullets: [],
          },
          {
            period: '2019. november — 2022. május',
            title: 'Tanulmányi és Oktatási Bizottság vezető',
            bullets: [],
          },
          {
            period: '2019. október — 2020. október',
            title: 'Külgyüi referens',
            bullets: [],
          },
          {
            period: '2019. október — 2024. október',
            title: 'Mandátumos képviselő',
            bullets: [],
          },
          {
            period: '2019. március — 2019. október',
            title: 'Tanácskozási jogú tag',
            bullets: [],
          },
        ],
      },
      {
        organization: 'Egyetemi Doktorandusz Képviselet (EDK)',
        roles: [
          {
            period: '2025. február — Jelenleg is',
            title: 'Elnök',
            bullets: [],
          },
          {
            period: '2024. október — Jelenleg is',
            title: 'Mandátumos képviselő',
            bullets: [],
          },
        ],
      },
      {
        organization: 'MŰGÉP Egyesület',
        roles: [
          {
            period: '2025. november — Jelenleg is',
            title: 'Felügyelő bizottsági tag',
            bullets: [],
          },
          {
            period: '2025. november — Jelenleg is',
            title: 'Tiszteletbeli tag',
            bullets: [],
          },
          {
            period: '2022. november — 2024. november',
            title: 'Elnök',
            bullets: [],
          },
          {
            period: '2019. március — 2025. november',
            title: 'Rendes tag',
            bullets: [],
          },
        ],
      },
      {
        organization: 'Egyetemi és Kari testületek',
        roles: [
          {
            period: '2026. április — Jelenleg is',
            title: 'Tudományos és KFI stratégiai munkacsoport tag',
            bullets: [],
          },
          {
            period: '2025. február — Jelenleg is',
            title: 'Szenátus tag',
            bullets: [],
          },
          {
            period: '2025. február — Jelenleg is',
            title: 'Vezetői Értekezlet tag',
            bullets: [],
          },
          {
            period: '2025. február — Jelenleg is',
            title: 'Egyetemi Habilitációs Bizottság és Doktori Tanács tag',
            bullets: [],
          },
          {
            period: '2024. október — 2026. április',
            title: 'Habilitációs Bizottság és Doktori Tanács tag (PÁGGTDI)',
            bullets: [],
          },
          {
            period: '2024. október — 2026. április',
            title: 'Doktori Iskola Tanács tag (PÁGGTDI)',
            bullets: [],
          },
          {
            period: '2021. október — 2026. április',
            title: 'Kari Tanács tag (BME-GPK)',
            bullets: [],
          },
          {
            period: '2022. május — 2024. október',
            title: 'Dékáni Tanács tag (BME-GPK)',
            bullets: [],
          },
          {
            period: '2019. október — 2022. október',
            title: 'Kari Tanulmányi Bizottság tag (BME-GPK)',
            bullets: [],
          },
          {
            period: '2019. október — 2022. október',
            title: 'Mechatronikai Mérnökképzés Szakbizottság tag',
            bullets: [],
          },
        ],
      },
    ],
    research: {
      summary:
        'Kutatási területem a mesterséges intelligenciával támogatott, adatvezérelt konstitív modellek fejlesztése hiperelasztikus és rugalmas-képlékeny anyagokra.',
      grants: [
        {
          period: '2025 — 2026',
          title: 'Doktori Kiválósági Ösztöndíj Program (DKÖP-25)',
        },
      ],
    },
    teaching: {
      stats: [
        { label: 'Szakdolgozók', count: 0 },
        { label: 'Diplomatervezők', count: 1 },
        { label: 'TDK hallgatók', count: 0 },
        { label: 'Projektfeladat hallgatók', count: 0 },
      ],
      courses: [
        'Statika (BMEGEMMBXM1)',
        'Szilárdásgtan (BMEGEMMBXN2)',
        'Végeselem módszer alapjai (BMEGEMMBXVE)',
      ],
    },
    awards: [
      {
        year: '2025',
        title: 'Dékáni Dicséret',
        institution:
          'Budapesti Műszaki és Gazdaságtudományi Egyetem, Gépészmérnöki Kar',
      },
    ],
    skills: [
      { name: 'LaTeX', level: 6 },
      { name: 'TikZ', level: 6 },
      { name: 'MS Office', level: 6 },
      { name: 'Python', level: 6 },
      { name: 'Wolfram Mathematica', level: 5 },
      { name: 'MATLAB', level: 5 },
      { name: 'Simulia Abaqus', level: 5 },
      { name: 'Ansys APDL / Mechanical', level: 5 },
      { name: 'Prompt Engineering', level: 5 },
      { name: 'Adobe Photoshop', level: 5 },
      { name: 'Adobe Illustrator', level: 4 },
      { name: 'Adobe Premiere Pro', level: 4 },
      { name: 'Autodesk Inventor', level: 4 },
      { name: '3D printing', level: 4 },
    ],
  },
  en: {
    personal: {
      title: 'Curriculum Vitae',
    },
    education: [
      {
        period: 'September 2024 — Present',
        institution: 'Budapest University of Technology and Economics',
        title: 'Doctor of Philosophy - PhD, Mechanical Engineering Sciences',
        bullets: [],
      },
      {
        period: 'February 2022 — July 2024',
        institution: 'Budapest University of Technology and Economics',
        title: 'Master of Science - MS, Mechanical Engineering Modelling',
        bullets: [],
      },
      {
        period: 'October 2020 — April 2021',
        institution: 'Karlsruhe Institute of Technology (KIT)',
        title: 'Exchange Studies (Erasmus+ Scholarship Program)',
        bullets: [],
      },
      {
        period: 'September 2018 — January 2022',
        institution: 'Budapest University of Technology and Economics',
        title: 'Bachelor of Science - BS, Mechatronics Engineering',
        bullets: [],
      },
    ],
    activities: [
      {
        organization: 'Mechanical Engineering Student Union (BME GHK)',
        roles: [
          {
            period: 'October 2024 — Present',
            title: 'Advisory Board Member',
            bullets: [],
          },
          {
            period: 'October 2024 — Present',
            title: 'Chairman of the Advisory Board',
            bullets: [],
          },
          {
            period: 'May 2022 — October 2024',
            title: 'President',
            bullets: [],
          },
          {
            period: 'April 2021 — May 2022',
            title: 'Vice President',
            bullets: [],
          },
          {
            period: 'October 2021 — May 2022',
            title: 'Academic and Education Coordinator',
            bullets: [],
          },
          {
            period: 'November 2019 — May 2022',
            title: 'Head of Academic and Educational Committee',
            bullets: [],
          },
          {
            period: 'October 2019 — October 2020',
            title: 'International Affairs Coordinator',
            bullets: [],
          },
          {
            period: 'October 2019 — October 2024',
            title: 'Elected Student Representative (with voting rights)',
            bullets: [],
          },
          {
            period: 'March 2019 — October 2019',
            title: 'Co-opted Member (with consultative rights)',
            bullets: [],
          },
        ],
      },
      {
        organization: 'University Doctoral Student Union (EDK)',
        roles: [
          {
            period: 'February 2025 — Present',
            title: 'President',
            bullets: [],
          },
          {
            period: 'October 2024 — Present',
            title: 'Elected Representative',
            bullets: [],
          },
        ],
      },
      {
        organization: 'MŰGÉP Association',
        roles: [
          {
            period: 'November 2025 — Present',
            title: 'Supervisory Board Member',
            bullets: [],
          },
          {
            period: 'November 2025 — Present',
            title: 'Honorary Member',
            bullets: [],
          },
          {
            period: 'November 2022 — November 2024',
            title: 'President',
            bullets: [],
          },
          {
            period: 'March 2019 — November 2025',
            title: 'Full Member',
            bullets: [],
          },
        ],
      },
      {
        organization: 'University and Faculty Committees',
        roles: [
          {
            period: 'April 2026 — Present',
            title: 'Member of the Scientific and RDI Strategic Working Group',
            bullets: [],
          },
          {
            period: 'February 2025 — Present',
            title: 'Member of the University Senate',
            bullets: [],
          },
          {
            period: 'February 2025 — Present',
            title: 'Member of the Executive Board',
            bullets: [],
          },
          {
            period: 'February 2025 — Present',
            title:
              'Member of the University Habilitation Committee and Doctoral Council',
            bullets: [],
          },
          {
            period: 'October 2024 — April 2026',
            title:
              'Member of the Habilitation Committee and Doctoral Council (PÁGGTDI)',
            bullets: [],
          },
          {
            period: 'October 2024 — April 2026',
            title: 'Member of the Doctoral School Council (PÁGGTDI)',
            bullets: [],
          },
          {
            period: 'October 2021 — April 2026',
            title: 'Member of the Faculty Council (BME-GPK)',
            bullets: [],
          },
          {
            period: 'May 2022 — October 2024',
            title: "Member of the Dean's Council (BME-GPK)",
            bullets: [],
          },
          {
            period: 'October 2019 — October 2022',
            title: 'Member of the Faculty Academic Committee (BME-GPK)',
            bullets: [],
          },
          {
            period: 'October 2019 — October 2022',
            title: 'Member of the Mechatronics Engineering Education Committee',
            bullets: [],
          },
        ],
      },
    ],
    research: {
      summary:
        'My research focuses on the development of artificial intelligence-supported, data-driven constitutive models for hyperelastic and elastoplastic materials.',
      grants: [
        {
          period: '2025 — 2026',
          title: 'Doctoral Excellence Scholarship Program (DKÖP-25)',
        },
      ],
    },
    teaching: {
      stats: [
        { label: 'BSc Thesis Students', count: 0 },
        { label: 'MSc Design Students', count: 1 },
        { label: 'TDK (Student Research) Students', count: 0 },
        { label: 'Project Work Students', count: 0 },
      ],
      courses: [
        'Statics (BMEGEMMBXM1)',
        'Strength of Materials (BMEGEMMBXN2)',
        'Fundamentals of the Finite Element Method (BMEGEMMBXVE)',
      ],
    },
    awards: [
      {
        year: '2025',
        title: "Dean's Commendation",
        institution:
          'Budapest University of Technology and Economics, Faculty of Mechanical Engineering',
      },
    ],
    skills: [
      { name: 'LaTeX', level: 6 },
      { name: 'TikZ', level: 6 },
      { name: 'MS Office', level: 6 },
      { name: 'Python', level: 6 },
      { name: 'Wolfram Mathematica', level: 5 },
      { name: 'MATLAB', level: 5 },
      { name: 'Simulia Abaqus', level: 5 },
      { name: 'Ansys APDL / Mechanical', level: 5 },
      { name: 'Prompt Engineering', level: 5 },
      { name: 'Adobe Photoshop', level: 5 },
      { name: 'Adobe Illustrator', level: 4 },
      { name: 'Adobe Premiere Pro', level: 4 },
      { name: 'Autodesk Inventor', level: 4 },
      { name: '3D printing', level: 4 },
    ],
  },
};
