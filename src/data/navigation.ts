import { HeaderItem } from '@/app/types/menu';
import { Locale } from '@/i18n/config';

/**
 * Navigation translations
 */
const navKeys = {
  ar: {
    home: 'الرئيسية',

    teacherGuide: 'دليل المعلم',
    gardenGuide: 'دليل في حديقة اللغة العربية',
    wafiGuide: 'دليل الوافي',
    mufidGuide: 'دليل المفيد',
    happyMuslimGuide: 'دليل المسلم السعيد',
    hidayahGuide: 'دليل هداية',

    // quizzes
    quizzes: 'الاختبارات',
    placementTest: 'تحديد المستوى',
    educationalCDs: 'السيديات التعليمية',
    lessonsTests: 'دروس واختبارات',
    handwritingExercises: 'تمارين الخط',
    letterColoring: 'أوراق تلوين الحروف',

    // channel
    channel: 'القناة',
    youtubeChannel: 'قناتنا على اليوتيوب',
    facebookChannel: 'قناتنا على الفايسبوك',

    // platforms
    platforms: 'المنصات',
    qalamNetPlatform: 'منصة قلم نات',
    wafiPlatform: 'منصة الوافي',
    myBookPlatform: 'منصة كتابي',

    // Curricula
    Curricula: 'المناهج',
    contact: 'اتصل بنا',
    accessBook: 'خدمات خاصة',
    levelTest: 'تحديد المستوى',
    series: 'السلاسل',
    electroniquebook: 'الكتاب الالكتروني',
    handbook: 'دفتر الخط',
    difGames: 'ألعاب تربوية',
    story: 'القصة',
    platform: 'المنصة',

    // Curricula books / levels
    books: {
      R: 'الروضة',
      P: 'التحضيري',
      1: 'الأول',
      2: 'الثاني',
      3: 'الثالث',
      4: 'الرابع',
      5: 'الخامس',
      6: 'السادس',
      7: 'السابع',
      8: 'الثامن',
    },

    // store
    store: 'المتجر',
    alMufid: 'المفيد',
    alShamil: 'الشامل',
    alWafi: 'الوافي',
    ebooks: 'كتب إلكترونية',
    gardenOfArabic: 'في حديقة اللغة العربية',
    hidayahFrench: 'هداية (فرنسي)',
    printedBooks: 'كتب ورقية',
    qawedMobasta: 'القواعد المبسطة',
    alTareeqAlMuneerArabic: 'الطريق المنير (عربي)',
    theHappyMuslim: 'المسلم السعيد',
    academy: 'أكاديمية التدريب',
  },

  en: {
    home: 'Home',

    teacherGuide: 'Teacher Guide',
    gardenGuide: 'Garden of Arabic Guide',
    wafiGuide: 'Wafi Guide',
    mufidGuide: 'Mufid Guide',
    happyMuslimGuide: 'Happy Muslim Guide',
    hidayahGuide: 'Hidayah Guide',

    // quizzes
    quizzes: 'Quizzes',
    placementTest: 'Placement Test',
    educationalCDs: 'Educational CDs',
    lessonsTests: 'Lessons & Tests',
    handwritingExercises: 'Handwriting Exercises',
    letterColoring: 'Letter Coloring',

    // channel
    channel: 'Channel',
    youtubeChannel: 'YouTube Channel',
    facebookChannel: 'Facebook Channel',

    // platforms
    platforms: 'Platforms',
    qalamNetPlatform: 'Qalam-Net Platform',
    wafiPlatform: 'Al-Wafi Platform',
    myBookPlatform: 'Kittaby Platform',

    // Curricula
    Curricula: 'Curricula',
    contact: 'Contact',
    accessBook: 'Special services',
    levelTest: 'Level Tests',
    series: 'series',
    electroniquebook: 'E-Book',
    handbook: 'Handwriting Book',
    difGames: 'Educational games',
    story: 'The story',
    platform: 'Platform',

    // Curricula books / levels
    books: {
      R: 'Garden',
      P: 'Preparatory',
      1: 'First',
      2: 'Second',
      3: 'Third',
      4: 'Fourth',
      5: 'Fifth',
      6: 'Sixth',
      7: 'Seventh',
      8: 'Eighth',
    },

    // store
    store: 'Store',
    alMufid: 'Al-Mufid',
    alShamil: 'Al-Shamil',
    alWafi: 'Al-Wafi',
    ebooks: 'E-Books',
    gardenOfArabic: 'Garden of Arabic',
    hidayahFrench: 'Hidayah (French)',
    printedBooks: 'Printed Books',
    qawedMobasta: 'Qawaed Mobasta',
    alTareeqAlMuneerArabic: 'Al-Tareeq Al-Muneer (Arabic)',
    theHappyMuslim: 'The Happy Muslim',
    academy: 'Academy',
  },

  fr: {
    home: 'Accueil',

    teacherGuide: 'Guide Prof',
    gardenGuide: 'Guide du jardin',
    wafiGuide: 'Guide du wafi',
    mufidGuide: 'Guide du mufid',
    happyMuslimGuide: 'Guide du happy muslim',
    hidayahGuide: 'Guide du hidayah',

    // quizzes
    quizzes: 'Tests',
    placementTest: 'Test de niveau',
    educationalCDs: 'CDs éducatifs',
    lessonsTests: 'Leçons et tests',
    handwritingExercises: 'Exercices d’écriture',
    letterColoring: 'Coloriage des lettres',

    // channel
    channel: 'Chaîne',
    youtubeChannel: 'Chaîne YouTube',
    facebookChannel: 'Chaîne Facebook',

    // platforms
    platforms: 'Plateformes',
    qalamNetPlatform: 'Plateforme qalam-Net',
    wafiPlatform: 'Plateforme al-Wafi',
    myBookPlatform: 'Plateforme kittaby',

    // Curricula
    Curricula: 'programmes',
    contact: 'Contact',
    accessBook: 'Services spéciaux',
    levelTest: 'Test niveau',
    series: 'Série',
    electroniquebook: 'Livre électronique',
    handbook: 'Cahier  d’écriture',
    difGames: 'Jeux éducatifs',
    story: 'L’histoire',
    platform: 'Plateforme',

    // Curricula books / levels
    books: {
      R: 'Jardin',
      P: 'Préparatoire',
      1: 'Premier',
      2: 'Deuxième',
      3: 'Troisième',
      4: 'Quatrième',
      5: 'Cinquième',
      6: 'Sixième',
      7: 'Septième',
      8: 'Huitième',
    },

    // store
    store: 'Boutique',
    alMufid: 'Al-Mufid',
    alShamil: 'Al-Shamil',
    alWafi: 'Al-Wafi',
    ebooks: 'Livres électroniques',
    gardenOfArabic: 'Jardin de l’arabe',
    hidayahArabic: 'Hidayah (Arabe)',
    hidayahFrench: 'Hidayah (Français)',
    hidayahEnglish: 'Hidayah (Anglais)',
    printedBooks: 'Livres imprimés',
    qawedMobasta: 'Qawaed Mobasta',
    alTareeqAlMuneerArabic: 'Al-Tareeq Al-Muneer (Arabe)',
    alTareeqAlMuneerFrench: 'Al-Tareeq Al-Muneer (Français)',
    alTareeqAlMuneerEnglish: 'Al-Tareeq Al-Muneer (Anglais)',
    theHappyMuslim: 'Happy Muslim',
    academy: 'Académie',
  },
} as const;

/**
 * Navigation structure
 */
export function getNavigationData(locale: Locale): HeaderItem[] {
  const t = navKeys[locale];

  const createLevelSubmenu = (
    bookId: string,
    title: string,
    hasGuide: boolean = false
  ): HeaderItem[] => {
    const items: HeaderItem[] = [
      {
        label: t.electroniquebook,
        href: `/book-reader?bookId=${bookId}&title=${encodeURIComponent(title)}`,
      },
    ];

    if (hasGuide) {
      items.push({
        label: t.teacherGuide,
        href: `/book-reader?bookId=guide-${bookId}&title=${encodeURIComponent(title + ' - ' + t.teacherGuide)}`,
      });
    }

    items.push(
      {
        label: t.handbook,
        href: '/',
      },
      {
        label: t.difGames,
        href: '/',
      },
      {
        label: t.story,
        // The story is universally the same across all books, so we pass its exact path
        // directly to the book-reader rather than faking a series-specific bookId.
        href: `/book-reader?pdfUrl=${encodeURIComponent('/storybooks/قصة البطل الصادق.pdf')}&title=${encodeURIComponent(t.story)}`,
      },
      {
        label: t.platform,
        href: '/',
      }
    );

    return items;
  };

  /**
   * Resolves the translated label for a level key.
   */
  const getLevelLabel = (key: string): string => {
    if (key === 'R') return t.books.R;
    if (key === 'P') return t.books.P;
    return t.books[key as unknown as keyof typeof t.books];
  };

  /**
   * Builds nav items for a list of level keys under a given bookId prefix.
   */
  const buildLevels = (prefix: string, keys: string[], keysWithGuide: string[] = []): HeaderItem[] =>
    keys.map((key) => {
      const label = getLevelLabel(key);
      const hasGuide = keysWithGuide.includes(key);
      return {
        label,
        href: '#',
        seriesId: prefix,
        submenu: createLevelSubmenu(`${prefix}-${key}`, label, hasGuide),
      };
    });

  const bookSeriesSubmenu: HeaderItem[] = [
    // garden-{key} → guide books for R, P, 1..10
    {
      label: t.gardenOfArabic,
      href: '',
      submenu: buildLevels('garden', ['R', 'P', '1', '2', '3', '4', '5', '6', '7', '8'], ['R', 'P', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10']),
    },

    // mufid-{key} → guide books for [1..8]
    {
      label: t.alMufid,
      href: '',
      submenu: buildLevels('mufid', ['R', 'P', '1', '2', '3', '4', '5', '6'], ['1', '2', '3', '4', '5', '6', '7', '8']),
    },

    // wafi-{key} → guide books for [1..4]
    {
      label: t.alWafi,
      href: '',
      submenu: buildLevels('wafi', ['R', 'P', '1', '2', '3', '4', '5', '6', '7', '8'], ['1', '2', '3', '4']),
    },

    // shamil-{key} → No guides
    {
      label: t.alShamil,
      href: '',
      submenu: buildLevels('shamil', ['1', '2', '3', '4']),
    },

    // tareeq-al-muneer-{key} → No guides
    {
      label: t.alTareeqAlMuneerArabic,
      href: '',
      submenu: buildLevels('tareeq-al-muneer', ['R', 'P', '1', '2', '3', '4', '5', '6', '7', '8']),
    },

    // hidayah-fr-{key} → No guides
    {
      label: t.hidayahFrench,
      href: '',
      submenu: buildLevels('hidayah-fr', ['R', 'P', '1', '2', '3', '4']),
    },

    // happy-muslim-{key} → No guides specified
    {
      label: t.theHappyMuslim,
      href: '',
      submenu: buildLevels('happy-muslim', ['R', 'P', '1', '2', '3', '4', '5', '6']),
    },
  ];


  return [
    /**
     * HOME
     */
    {
      label: t.home,
      href: '/',
    },

    /**
     * STORE
     */
    {
      label: t.store,
      href: '/store',
      submenu: [
        {
          label: t.gardenOfArabic,
          href: '/store/garden-of-arabic',
        },
        {
          label: t.alMufid,
          href: '/store/al-mufid',
        },
        {
          label: t.alShamil,
          href: '/store/al-shamil',
        },
        {
          label: t.alWafi,
          href: '/store/al-wafi',
        },
        {
          label: t.hidayahFrench,
          href: '/store/hidayah-fr',
        },
        {
          label: t.qawedMobasta,
          href: '/store/qawaed-mobasta',
        },
        {
          label: t.alTareeqAlMuneerArabic,
          href: '/store/tareeq-al-muneer',
        },
        {
          label: t.theHappyMuslim,
          href: '/store/the-happy-muslim',
        },
      ],
    },

    {
      label: t.Curricula,
      href: '#',
      isCurricula: true,
      submenu: [
        {
          label: t.series,
          href: '',
          submenu: bookSeriesSubmenu,
        },

        // {
        //   label: t.levelTest,
        //   href: '/Curricula/level-test',
        // },
      ],
    },

    /**
     * SPECIAL BOOKS
     */

    {
      label: t.accessBook,
      href: '/book-access',
    },

    /**
     * TEACHER GUIDE
     */
    // {
    //   label: t.teacherGuide,
    //   href: '/teacher-guide',
    //   submenu: [
    //     {
    //       label: t.gardenGuide,
    //       href: '/teacher-guide/garden-guide',
    //     },
    //     {
    //       label: t.wafiGuide,
    //       href: '/teacher-guide/wafi-guide',
    //     },
    //     {
    //       label: t.mufidGuide,
    //       href: '/teacher-guide/mufid-guide',
    //     },
    //     {
    //       label: t.happyMuslimGuide,
    //       href: '/teacher-guide/happyMuslim-guide',
    //     },
    //   ],
    // },

    {
      label: t.levelTest,
      href: '/services/level-test',
    },

    /**
     * PLATFORMS
     */
    {
      label: t.platforms,
      href: '#',
      submenu: [
        {
          label: t.qalamNetPlatform,
          href: 'https://qalamnet.com/',
        },
        {
          label: t.wafiPlatform,
          href: 'https://alwafi.academy/',
        },
        {
          label: t.myBookPlatform,
          href: 'https://www.keetaby.com/',
        },
      ],
    },

    /**
     * CHANNEL
     */
    {
      label: t.channel,
      href: '#',
      submenu: [
        {
          label: t.academy,
          href: '/academy',
        },
        {
          label: t.youtubeChannel,
          href: 'https://www.youtube.com/@%D8%A7%D9%84%D9%85%D8%B1%D9%83%D8%B2%D8%A7%D9%84%D8%B9%D8%B1%D8%A8%D9%8A%D9%84%D9%84%D8%AE%D8%AF%D9%85%D8%A7%D8%AA%D8%A7%D9%84%D8%AA%D8%B1%D8%A8%D9%88%D9%8A%D8%A9-%D9%83%D9%86',
        },
        {
          label: t.facebookChannel,
          href: 'https://www.facebook.com/caspeducation?rdid=gMP9FoFjFiCWfr4W&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1HDVhzFqx4%2F#',
        },
      ],
    },
    /**
     * CONTACT
     */
    {
      label: t.contact,
      href: '/contact',
    },
  ];
}