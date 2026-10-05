export interface StoreBookDetails {
  id: string;
  titleAr: string;
  titleEn?: string;
  titleFr?: string;
  size: string;
  pages: number;
  lessons: number;
  priceUSD: number;
  isbn: string;
}

export const storeBooksDetails: Record<string, StoreBookDetails> = {
  // Garden of the Arabic Language - Exercises (garden - exercice)
  "garden-R-exercices": {
    id: "garden-R-exercices",
    titleAr: "حديقة اللغة العربية - المستوى الروضة – تمارين",
    titleEn: "Garden of Arabic - Level KG – Exercises",
    titleFr: "Jardin d'Arabe - Niveau Maternelle – Exercices",
    size: "21* 29,7",
    pages: 60,
    lessons: 28,
    priceUSD: 7.00,
    isbn: "978-2-923633-37-4"
  },
  "garden-P-exercices": {
    id: "garden-P-exercices",
    titleAr: "حديقة اللغة العربية - المستوى التحضيري – تمارين",
    titleEn: "Garden of Arabic - Level Prep – Exercises",
    titleFr: "Jardin d'Arabe - Niveau Préparatoire – Exercices",
    size: "21* 29,7",
    pages: 64,
    lessons: 28,
    priceUSD: 7.00,
    isbn: "978-2-923633-02-2"
  },
  "garden-1-exercices": {
    id: "garden-1-exercices",
    titleAr: "حديقة اللغة العربية - المستوى 1 – تمارين",
    titleEn: "Garden of Arabic - Level 1 – Exercises",
    titleFr: "Jardin d'Arabe - Niveau 1 – Exercices",
    size: "21* 29,7",
    pages: 64,
    lessons: 28,
    priceUSD: 7.00,
    isbn: "978-2-923633-04-6"
  },
  "garden-2-exercices": {
    id: "garden-2-exercices",
    titleAr: "حديقة اللغة العربية - المستوى 2 – تمارين",
    titleEn: "Garden of Arabic - Level 2 – Exercises",
    titleFr: "Jardin d'Arabe - Niveau 2 – Exercices",
    size: "21* 29,7",
    pages: 64,
    lessons: 28,
    priceUSD: 7.00,
    isbn: "978-2-923633-06-0"
  },
  "garden-3-exercices": {
    id: "garden-3-exercices",
    titleAr: "حديقة اللغة العربية - المستوى 3 – تمارين",
    titleEn: "Garden of Arabic - Level 3 – Exercises",
    titleFr: "Jardin d'Arabe - Niveau 3 – Exercices",
    size: "21* 29,7",
    pages: 58,
    lessons: 28,
    priceUSD: 7.00,
    isbn: "978-2-923633-20-6"
  },
  "garden-4-exercices": {
    id: "garden-4-exercices",
    titleAr: "حديقة اللغة العربية - المستوى 4 – تمارين",
    titleEn: "Garden of Arabic - Level 4 – Exercises",
    titleFr: "Jardin d'Arabe - Niveau 4 – Exercices",
    size: "21* 29,7",
    pages: 45,
    lessons: 28,
    priceUSD: 7.00,
    isbn: "978-2-923633-09-1"
  },
  "garden-5-exercices": {
    id: "garden-5-exercices",
    titleAr: "حديقة اللغة العربية - المستوى 5 – تمارين",
    titleEn: "Garden of Arabic - Level 5 – Exercises",
    titleFr: "Jardin d'Arabe - Niveau 5 – Exercices",
    size: "21* 29,7",
    pages: 41,
    lessons: 28,
    priceUSD: 7.00,
    isbn: "978-2-923633-12-1"
  },
  "garden-6-exercices": {
    id: "garden-6-exercices",
    titleAr: "حديقة اللغة العربية - المستوى 6 – تمارين",
    titleEn: "Garden of Arabic - Level 6 – Exercises",
    titleFr: "Jardin d'Arabe - Niveau 6 – Exercices",
    size: "21* 29,7",
    pages: 25,
    lessons: 28,
    priceUSD: 7.00,
    isbn: "978-2-923633-15-2"
  },
  "garden-7-exercices": {
    id: "garden-7-exercices",
    titleAr: "حديقة اللغة العربية - المستوى 7 – تمارين",
    titleEn: "Garden of Arabic - Level 7 – Exercises",
    titleFr: "Jardin d'Arabe - Niveau 7 – Exercices",
    size: "21* 29,7",
    pages: 26,
    lessons: 28,
    priceUSD: 7.00,
    isbn: "978-2-923633-31-2"
  },
  "garden-8-exercices": {
    id: "garden-8-exercices",
    titleAr: "حديقة اللغة العربية - المستوى 8 – تمارين",
    titleEn: "Garden of Arabic - Level 8 – Exercises",
    titleFr: "Jardin d'Arabe - Niveau 8 – Exercices",
    size: "21* 29,7",
    pages: 26,
    lessons: 28,
    priceUSD: 7.00,
    isbn: "978-2-923633-43-5"
  },
  
  // Garden of the Arabic Language - Assas (Basics)
  "garden-R-assas": {
    id: "garden-R-assas",
    titleAr: "حديقة اللغة العربية - المستوى الروضة – أساس",
    titleEn: "Garden of Arabic - Level KG – Basics",
    titleFr: "Jardin d'Arabe - Niveau Maternelle – Base",
    size: "21* 29,7",
    pages: 120,
    lessons: 28,
    priceUSD: 18.00,
    isbn: "978-2-923633-36-7"
  },
  "garden-P-assas": {
    id: "garden-P-assas",
    titleAr: "حديقة اللغة العربية - المستوى التحضيري – أساس",
    titleEn: "Garden of Arabic - Level Prep – Basics",
    titleFr: "Jardin d'Arabe - Niveau Préparatoire – Base",
    size: "21* 29,7",
    pages: 124,
    lessons: 28,
    priceUSD: 18.00,
    isbn: "978-2-923633-01-5"
  },
  "garden-1-assas": {
    id: "garden-1-assas",
    titleAr: "حديقة اللغة العربية - المستوى 1 – أساس",
    titleEn: "Garden of Arabic - Level 1 – Basics",
    titleFr: "Jardin d'Arabe - Niveau 1 – Base",
    size: "21* 29,7",
    pages: 124,
    lessons: 28,
    priceUSD: 18.00,
    isbn: "978-2-923633-03-9"
  },
  "garden-2-assas": {
    id: "garden-2-assas",
    titleAr: "حديقة اللغة العربية - المستوى 2 – أساس",
    titleEn: "Garden of Arabic - Level 2 – Basics",
    titleFr: "Jardin d'Arabe - Niveau 2 – Base",
    size: "21* 29,7",
    pages: 100,
    lessons: 28,
    priceUSD: 18.00,
    isbn: "978-2-923633-05-3"
  },
  "garden-3-assas": {
    id: "garden-3-assas",
    titleAr: "حديقة اللغة العربية - المستوى 3 – أساس",
    titleEn: "Garden of Arabic - Level 3 – Basics",
    titleFr: "Jardin d'Arabe - Niveau 3 – Base",
    size: "21* 29,7",
    pages: 83,
    lessons: 28,
    priceUSD: 18.00,
    isbn: "978-2-923633-19-0"
  },
  "garden-4-assas": {
    id: "garden-4-assas",
    titleAr: "حديقة اللغة العربية - المستوى 4 – أساس",
    titleEn: "Garden of Arabic - Level 4 – Basics",
    titleFr: "Jardin d'Arabe - Niveau 4 – Base",
    size: "21* 29,7",
    pages: 90,
    lessons: 22,
    priceUSD: 18.00,
    isbn: "978-2-923633-21-3"
  },
  "garden-5-assas": {
    id: "garden-5-assas",
    titleAr: "حديقة اللغة العربية - المستوى 5 – أساس",
    titleEn: "Garden of Arabic - Level 5 – Basics",
    titleFr: "Jardin d'Arabe - Niveau 5 – Base",
    size: "21* 29,7",
    pages: 84,
    lessons: 28,
    priceUSD: 18.00,
    isbn: "978-2-923633-23-7"
  },
  "garden-6-assas": {
    id: "garden-6-assas",
    titleAr: "حديقة اللغة العربية - المستوى 6 – أساس",
    titleEn: "Garden of Arabic - Level 6 – Basics",
    titleFr: "Jardin d'Arabe - Niveau 6 – Base",
    size: "21* 29,7",
    pages: 84,
    lessons: 21,
    priceUSD: 18.00,
    isbn: "978-2-923633-40-4"
  },
  "garden-7-assas": {
    id: "garden-7-assas",
    titleAr: "حديقة اللغة العربية - المستوى 7 – أساس",
    titleEn: "Garden of Arabic - Level 7 – Basics",
    titleFr: "Jardin d'Arabe - Niveau 7 – Base",
    size: "21* 29,7",
    pages: 94,
    lessons: 28,
    priceUSD: 18.00,
    isbn: "978-2-923633-45-9"
  },
  "garden-8-assas": {
    id: "garden-8-assas",
    titleAr: "حديقة اللغة العربية - المستوى الثامن – أساس",
    titleEn: "Garden of Arabic - Level 8 – Basics",
    titleFr: "Jardin d'Arabe - Niveau 8 – Base",
    size: "21* 29,7",
    pages: 94,
    lessons: 22,
    priceUSD: 18.00,
    isbn: "978-2-923633-46-6"
  },

  // Tareeq Al-Muneer (tareeq-al-muneer)
  "tareeq-ar-R": {
    id: "tareeq-ar-R",
    titleAr: "الطريق المنير - المستوى الروضة",
    titleEn: "Tareeq Al-Muneer - Level KG",
    titleFr: "Tareeq Al-Muneer - Niveau Maternelle",
    size: "20 * 28",
    pages: 52,
    lessons: 28,
    priceUSD: 12.00,
    isbn: "978-2-923633-38-1"
  },
  "tareeq-ar-P": {
    id: "tareeq-ar-P",
    titleAr: "الطريق المنير - المستوى التحضيري",
    titleEn: "Tareeq Al-Muneer - Level Prep",
    titleFr: "Tareeq Al-Muneer - Niveau Préparatoire",
    size: "20 * 28",
    pages: 51,
    lessons: 28,
    priceUSD: 12.00,
    isbn: "978-2-923633-39-8"
  },
  "tareeq-ar-1": {
    id: "tareeq-ar-1",
    titleAr: "الطريق المنير - المستوى 1",
    titleEn: "Tareeq Al-Muneer - Level 1",
    titleFr: "Tareeq Al-Muneer - Niveau 1",
    size: "20 * 28",
    pages: 48,
    lessons: 28,
    priceUSD: 12.00,
    isbn: "978-2-923633-25-1"
  },
  "tareeq-ar-2": {
    id: "tareeq-ar-2",
    titleAr: "الطريق المنير - المستوى 2",
    titleEn: "Tareeq Al-Muneer - Level 2",
    titleFr: "Tareeq Al-Muneer - Niveau 2",
    size: "20 * 28",
    pages: 47,
    lessons: 28,
    priceUSD: 12.00,
    isbn: "978-2-923633-26-8"
  },
  "tareeq-ar-3": {
    id: "tareeq-ar-3",
    titleAr: "الطريق المنير - المستوى 3",
    titleEn: "Tareeq Al-Muneer - Level 3",
    titleFr: "Tareeq Al-Muneer - Niveau 3",
    size: "20 * 28",
    pages: 56,
    lessons: 28,
    priceUSD: 12.00,
    isbn: "978-2-923633-27-5"
  },
  "tareeq-ar-4": {
    id: "tareeq-ar-4",
    titleAr: "الطريق المنير - المستوى 4",
    titleEn: "Tareeq Al-Muneer - Level 4",
    titleFr: "Tareeq Al-Muneer - Niveau 4",
    size: "20 * 28",
    pages: 64,
    lessons: 28,
    priceUSD: 12.00,
    isbn: "978-2-923633-28-2"
  },
  "tareeq-ar-5": {
    id: "tareeq-ar-5",
    titleAr: "الطريق المنير - المستوى 5",
    titleEn: "Tareeq Al-Muneer - Level 5",
    titleFr: "Tareeq Al-Muneer - Niveau 5",
    size: "20 * 28",
    pages: 60,
    lessons: 28,
    priceUSD: 12.00,
    isbn: "978-2-923633-29-9"
  },
  "tareeq-ar-6": {
    id: "tareeq-ar-6",
    titleAr: "الطريق المنير - المستوى 6",
    titleEn: "Tareeq Al-Muneer - Level 6",
    titleFr: "Tareeq Al-Muneer - Niveau 6",
    size: "20 * 28",
    pages: 58,
    lessons: 28,
    priceUSD: 12.00,
    isbn: "978-2-923633-41-1"
  },

  // Al-Mufid (al-mufid)
  "mufid-R": {
    id: "mufid-R",
    titleAr: "المفيد - المستوى الروضة",
    titleEn: "Al-Mufid - Level KG",
    titleFr: "Al-Mufid - Niveau Maternelle",
    size: "21 * 29,7",
    pages: 116,
    lessons: 28,
    priceUSD: 15.00,
    isbn: "978-2-923633-58-9"
  },
  "mufid-P": {
    id: "mufid-P",
    titleAr: "المفيد - المستوى التحضيري",
    titleEn: "Al-Mufid - Level Prep",
    titleFr: "Al-Mufid - Niveau Préparatoire",
    size: "21 * 29,7",
    pages: 118,
    lessons: 28,
    priceUSD: 15.00,
    isbn: "978-2-923633-59-6"
  },
  "mufid-1": {
    id: "mufid-1",
    titleAr: "المفيد - المستوى 1",
    titleEn: "Al-Mufid - Level 1",
    titleFr: "Al-Mufid - Niveau 1",
    size: "21 * 29,7",
    pages: 116,
    lessons: 28,
    priceUSD: 15.00,
    isbn: "978-2-923633-64-0"
  },
  "mufid-2": {
    id: "mufid-2",
    titleAr: "المفيد - المستوى 2",
    titleEn: "Al-Mufid - Level 2",
    titleFr: "Al-Mufid - Niveau 2",
    size: "21 * 29,7",
    pages: 116,
    lessons: 28,
    priceUSD: 15.00,
    isbn: "978-2-923633-65-7"
  },
  "mufid-3": {
    id: "mufid-3",
    titleAr: "المفيد - المستوى 3",
    titleEn: "Al-Mufid - Level 3",
    titleFr: "Al-Mufid - Niveau 3",
    size: "21 * 29,7",
    pages: 116,
    lessons: 28,
    priceUSD: 15.00,
    isbn: "978-2-923633-63-3"
  },
  "mufid-4": {
    id: "mufid-4",
    titleAr: "المفيد - المستوى 4",
    titleEn: "Al-Mufid - Level 4",
    titleFr: "Al-Mufid - Niveau 4",
    size: "21 * 29,7",
    pages: 116,
    lessons: 28,
    priceUSD: 15.00,
    isbn: "978-2-923633-62-6"
  },
  "mufid-5": {
    id: "mufid-5",
    titleAr: "المفيد - المستوى 5",
    titleEn: "Al-Mufid - Level 5",
    titleFr: "Al-Mufid - Niveau 5",
    size: "21 * 29,7",
    pages: 116,
    lessons: 28,
    priceUSD: 15.00,
    isbn: "978-2-923633-61-9"
  },
  "mufid-6": {
    id: "mufid-6",
    titleAr: "المفيد - المستوى 6",
    titleEn: "Al-Mufid - Level 6",
    titleFr: "Al-Mufid - Niveau 6",
    size: "21 * 29,7",
    pages: 76,
    lessons: 28,
    priceUSD: 15.00,
    isbn: "978-2-923633-60-2"
  },

  // Al-Wafi - Assas
  "wafi-assas-R": {
    id: "wafi-assas-R",
    titleAr: "الوافي (أساس) - المستوى الروضة",
    titleEn: "Al-Wafi (Assas) - Level KG",
    titleFr: "Al-Wafi (Assas) - Niveau Maternelle",
    size: "21 * 29,7",
    pages: 60,
    lessons: 28,
    priceUSD: 10.00,
    isbn: "978-2-923633-30-5"
  },
  "wafi-assas-P": {
    id: "wafi-assas-P",
    titleAr: "الوافي (أساس) - المستوى التحضيري",
    titleEn: "Al-Wafi (Assas) - Level Prep",
    titleFr: "Al-Wafi (Assas) - Niveau Préparatoire",
    size: "21 * 29,7",
    pages: 116,
    lessons: 28,
    priceUSD: 10.00,
    isbn: "978-2-923633-31-2"
  },
  "wafi-assas-1": {
    id: "wafi-assas-1",
    titleAr: "الوافي (أساس) - المستوى 1",
    titleEn: "Al-Wafi (Assas) - Level 1",
    titleFr: "Al-Wafi (Assas) - Niveau 1",
    size: "21 * 29,7",
    pages: 120,
    lessons: 28,
    priceUSD: 10.00,
    isbn: "978-2-923633-32-9"
  },
  "wafi-assas-2": {
    id: "wafi-assas-2",
    titleAr: "الوافي (أساس) - المستوى 2",
    titleEn: "Al-Wafi (Assas) - Level 2",
    titleFr: "Al-Wafi (Assas) - Niveau 2",
    size: "21 * 29,7",
    pages: 120,
    lessons: 28,
    priceUSD: 10.00,
    isbn: "978-2-923633-33-6"
  },
  "wafi-assas-3": {
    id: "wafi-assas-3",
    titleAr: "الوافي (أساس) - المستوى 3",
    titleEn: "Al-Wafi (Assas) - Level 3",
    titleFr: "Al-Wafi (Assas) - Niveau 3",
    size: "21 * 29,7",
    pages: 92,
    lessons: 28,
    priceUSD: 10.00,
    isbn: "978-2-923633-34-3"
  },
  "wafi-assas-4": {
    id: "wafi-assas-4",
    titleAr: "الوافي (أساس) - المستوى 4",
    titleEn: "Al-Wafi (Assas) - Level 4",
    titleFr: "Al-Wafi (Assas) - Niveau 4",
    size: "21 * 29,7",
    pages: 80,
    lessons: 28,
    priceUSD: 10.00,
    isbn: "978-2-923633-35-0"
  },
  "wafi-assas-5": {
    id: "wafi-assas-5",
    titleAr: "الوافي (أساس) - المستوى 5",
    titleEn: "Al-Wafi (Assas) - Level 5",
    titleFr: "Al-Wafi (Assas) - Niveau 5",
    size: "21 * 29,7",
    pages: 80,
    lessons: 28,
    priceUSD: 10.00,
    isbn: "978-2-923633-36-7"
  },
  "wafi-assas-6": {
    id: "wafi-assas-6",
    titleAr: "الوافي (أساس) - المستوى 6",
    titleEn: "Al-Wafi (Assas) - Level 6",
    titleFr: "Al-Wafi (Assas) - Niveau 6",
    size: "21 * 29,7",
    pages: 80,
    lessons: 28,
    priceUSD: 10.00,
    isbn: "978-2-923633-37-4"
  },
  "wafi-assas-7": {
    id: "wafi-assas-7",
    titleAr: "الوافي (أساس) - المستوى 7",
    titleEn: "Al-Wafi (Assas) - Level 7",
    titleFr: "Al-Wafi (Assas) - Niveau 7",
    size: "21 * 29,7",
    pages: 54,
    lessons: 28,
    priceUSD: 10.00,
    isbn: "978-2-923633-38-1"
  },
  "wafi-assas-8": {
    id: "wafi-assas-8",
    titleAr: "الوافي (أساس) - المستوى 8",
    titleEn: "Al-Wafi (Assas) - Level 8",
    titleFr: "Al-Wafi (Assas) - Niveau 8",
    size: "21 * 29,7",
    pages: 52,
    lessons: 28,
    priceUSD: 10.00,
    isbn: "978-2-923633-39-8"
  },

  // Al-Wafi - Exercices
  "wafi-ex-R": {
    id: "wafi-ex-R",
    titleAr: "الوافي (تمارين) - المستوى الروضة",
    titleEn: "Al-Wafi (Exercises) - Level KG",
    titleFr: "Al-Wafi (Exercices) - Niveau Maternelle",
    size: "21 * 29,7",
    pages: 60,
    lessons: 28,
    priceUSD: 10.00,
    isbn: "978-2-923633-40-4"
  },
  "wafi-ex-P": {
    id: "wafi-ex-P",
    titleAr: "الوافي (تمارين) - المستوى التحضيري",
    titleEn: "Al-Wafi (Exercises) - Level Prep",
    titleFr: "Al-Wafi (Exercices) - Niveau Préparatoire",
    size: "21 * 29,7",
    pages: 60,
    lessons: 28,
    priceUSD: 10.00,
    isbn: "978-2-923633-41-1"
  },
  "wafi-ex-1": {
    id: "wafi-ex-1",
    titleAr: "الوافي (تمارين) - المستوى 1",
    titleEn: "Al-Wafi (Exercises) - Level 1",
    titleFr: "Al-Wafi (Exercices) - Niveau 1",
    size: "21 * 29,7",
    pages: 60,
    lessons: 28,
    priceUSD: 10.00,
    isbn: "978-2-923633-42-8"
  },
  "wafi-ex-2": {
    id: "wafi-ex-2",
    titleAr: "الوافي (تمارين) - المستوى 2",
    titleEn: "Al-Wafi (Exercises) - Level 2",
    titleFr: "Al-Wafi (Exercices) - Niveau 2",
    size: "21 * 29,7",
    pages: 60,
    lessons: 28,
    priceUSD: 10.00,
    isbn: "978-2-923633-43-5"
  },
  "wafi-ex-3": {
    id: "wafi-ex-3",
    titleAr: "الوافي (تمارين) - المستوى 3",
    titleEn: "Al-Wafi (Exercises) - Level 3",
    titleFr: "Al-Wafi (Exercices) - Niveau 3",
    size: "21 * 29,7",
    pages: 60,
    lessons: 28,
    priceUSD: 10.00,
    isbn: "978-2-923633-44-2"
  },
  "wafi-ex-4": {
    id: "wafi-ex-4",
    titleAr: "الوافي (تمارين) - المستوى 4",
    titleEn: "Al-Wafi (Exercises) - Level 4",
    titleFr: "Al-Wafi (Exercices) - Niveau 4",
    size: "21 * 29,7",
    pages: 54,
    lessons: 28,
    priceUSD: 10.00,
    isbn: "978-2-923633-45-9"
  },
  "wafi-ex-5": {
    id: "wafi-ex-5",
    titleAr: "الوافي (تمارين) - المستوى 5",
    titleEn: "Al-Wafi (Exercises) - Level 5",
    titleFr: "Al-Wafi (Exercices) - Niveau 5",
    size: "21 * 29,7",
    pages: 54,
    lessons: 28,
    priceUSD: 10.00,
    isbn: "978-2-923633-46-6"
  },
  "wafi-ex-6": {
    id: "wafi-ex-6",
    titleAr: "الوافي (تمارين) - المستوى 6",
    titleEn: "Al-Wafi (Exercises) - Level 6",
    titleFr: "Al-Wafi (Exercices) - Niveau 6",
    size: "21 * 29,7",
    pages: 52,
    lessons: 28,
    priceUSD: 10.00,
    isbn: "978-2-923633-47-3"
  },
  "wafi-ex-7": {
    id: "wafi-ex-7",
    titleAr: "الوافي (تمارين) - المستوى 7",
    titleEn: "Al-Wafi (Exercises) - Level 7",
    titleFr: "Al-Wafi (Exercices) - Niveau 7",
    size: "21 * 29,7",
    pages: 80,
    lessons: 28,
    priceUSD: 10.00,
    isbn: "978-2-923633-48-0"
  },
  "wafi-ex-8": {
    id: "wafi-ex-8",
    titleAr: "الوافي (تمارين) - المستوى 8",
    titleEn: "Al-Wafi (Exercises) - Level 8",
    titleFr: "Al-Wafi (Exercices) - Niveau 8",
    size: "21 * 29,7",
    pages: 80,
    lessons: 28,
    priceUSD: 10.00,
    isbn: "978-2-923633-49-7"
  },

  // The Happy Muslim (the-happy-muslim)
  "happymuslim-en-R": {
    id: "happymuslim-en-R",
    titleAr: "المسلم السعيد - المستوى الروضة",
    titleEn: "The Happy Muslim - Level KG",
    titleFr: "Le Musulman Heureux - Niveau Maternelle",
    size: "20 * 28",
    pages: 52,
    lessons: 28,
    priceUSD: 14.00,
    isbn: "978-2-923633-66-4"
  },
  "happymuslim-en-P": {
    id: "happymuslim-en-P",
    titleAr: "المسلم السعيد - المستوى التحضيري",
    titleEn: "The Happy Muslim - Level Prep",
    titleFr: "Le Musulman Heureux - Niveau Préparatoire",
    size: "20 * 28",
    pages: 52,
    lessons: 28,
    priceUSD: 14.00,
    isbn: "978-2-923633-67-1"
  },
  "happymuslim-en-1": {
    id: "happymuslim-en-1",
    titleAr: "المسلم السعيد - المستوى 1",
    titleEn: "The Happy Muslim - Level 1",
    titleFr: "Le Musulman Heureux - Niveau 1",
    size: "20 * 28",
    pages: 48,
    lessons: 28,
    priceUSD: 14.00,
    isbn: "978-2-923633-68-8"
  },
  "happymuslim-en-2": {
    id: "happymuslim-en-2",
    titleAr: "المسلم السعيد - المستوى 2",
    titleEn: "The Happy Muslim - Level 2",
    titleFr: "Le Musulman Heureux - Niveau 2",
    size: "20 * 28",
    pages: 46,
    lessons: 28,
    priceUSD: 14.00,
    isbn: "978-2-923633-69-5"
  },
  "happymuslim-en-3": {
    id: "happymuslim-en-3",
    titleAr: "المسلم السعيد - المستوى 3",
    titleEn: "The Happy Muslim - Level 3",
    titleFr: "Le Musulman Heureux - Niveau 3",
    size: "20 * 28",
    pages: 56,
    lessons: 28,
    priceUSD: 14.00,
    isbn: "978-2-923633-70-1"
  },
  "happymuslim-en-4": {
    id: "happymuslim-en-4",
    titleAr: "المسلم السعيد - المستوى 4",
    titleEn: "The Happy Muslim - Level 4",
    titleFr: "Le Musulman Heureux - Niveau 4",
    size: "20 * 28",
    pages: 57,
    lessons: 28,
    priceUSD: 14.00,
    isbn: "978-2-923633-71-8"
  },
  "happymuslim-en-5": {
    id: "happymuslim-en-5",
    titleAr: "المسلم السعيد - المستوى 5",
    titleEn: "The Happy Muslim - Level 5",
    titleFr: "Le Musulman Heureux - Niveau 5",
    size: "20 * 28",
    pages: 57,
    lessons: 28,
    priceUSD: 14.00,
    isbn: "978-2-923633-72-5"
  },
  "happymuslim-en-6": {
    id: "happymuslim-en-6",
    titleAr: "المسلم السعيد - المستوى 6",
    titleEn: "The Happy Muslim - Level 6",
    titleFr: "Le Musulman Heureux - Niveau 6",
    size: "20 * 28",
    pages: 55,
    lessons: 28,
    priceUSD: 14.00,
    isbn: "978-2-923633-73-2"
  },

  // Hidayah French (hidayah-fr)
  "hidayah-fr-R": {
    id: "hidayah-fr-R",
    titleAr: "هداية - المستوى الروضة",
    titleEn: "Hidayah - Level KG",
    titleFr: "Hidayah - Niveau Maternelle",
    size: "20 * 28",
    pages: 63,
    lessons: 28,
    priceUSD: 13.00,
    isbn: "978-2-923633-50-3"
  },
  "hidayah-fr-P": {
    id: "hidayah-fr-P",
    titleAr: "هداية - المستوى التحضيري",
    titleEn: "Hidayah - Level Prep",
    titleFr: "Hidayah - Niveau Préparatoire",
    size: "20 * 28",
    pages: 65,
    lessons: 28,
    priceUSD: 13.00,
    isbn: "978-2-923633-51-0"
  },
  "hidayah-fr-1": {
    id: "hidayah-fr-1",
    titleAr: "هداية - المستوى 1",
    titleEn: "Hidayah - Level 1",
    titleFr: "Hidayah - Niveau 1",
    size: "20 * 28",
    pages: 82,
    lessons: 28,
    priceUSD: 13.00,
    isbn: "978-2-923633-52-7"
  },
  "hidayah-fr-2": {
    id: "hidayah-fr-2",
    titleAr: "هداية - المستوى 2",
    titleEn: "Hidayah - Level 2",
    titleFr: "Hidayah - Niveau 2",
    size: "20 * 28",
    pages: 108,
    lessons: 28,
    priceUSD: 13.00,
    isbn: "978-2-923633-53-4"
  },
  "hidayah-fr-3": {
    id: "hidayah-fr-3",
    titleAr: "هداية - المستوى 3",
    titleEn: "Hidayah - Level 3",
    titleFr: "Hidayah - Niveau 3",
    size: "20 * 28",
    pages: 92,
    lessons: 28,
    priceUSD: 13.00,
    isbn: "978-2-923633-54-1"
  },
  "hidayah-fr-4": {
    id: "hidayah-fr-4",
    titleAr: "هداية - المستوى 4",
    titleEn: "Hidayah - Level 4",
    titleFr: "Hidayah - Niveau 4",
    size: "20 * 28",
    pages: 120,
    lessons: 28,
    priceUSD: 13.00,
    isbn: "978-2-923633-55-8"
  },
  // Al-Shamil
  "shamil-1": {
    id: "shamil-1",
    titleAr: "الشامل - المستوى 1",
    titleEn: "Al-Shamil - Level 1",
    titleFr: "Al-Shamil - Niveau 1",
    size: "21 * 29,7",
    pages: 60,
    lessons: 28,
    priceUSD: 20.00,
    isbn: "978-2-923633-74-9"
  },
  "shamil-2": {
    id: "shamil-2",
    titleAr: "الشامل - المستوى 2",
    titleEn: "Al-Shamil - Level 2",
    titleFr: "Al-Shamil - Niveau 2",
    size: "21 * 29,7",
    pages: 60,
    lessons: 28,
    priceUSD: 20.00,
    isbn: "978-2-923633-75-6"
  },
  "shamil-3": {
    id: "shamil-3",
    titleAr: "الشامل - المستوى 3",
    titleEn: "Al-Shamil - Level 3",
    titleFr: "Al-Shamil - Niveau 3",
    size: "21 * 29,7",
    pages: 60,
    lessons: 28,
    priceUSD: 20.00,
    isbn: "978-2-923633-76-3"
  },
  "shamil-4": {
    id: "shamil-4",
    titleAr: "الشامل - المستوى 4",
    titleEn: "Al-Shamil - Level 4",
    titleFr: "Al-Shamil - Niveau 4",
    size: "21 * 29,7",
    pages: 60,
    lessons: 28,
    priceUSD: 20.00,
    isbn: "978-2-923633-77-0"
  },

  // Qawaed Mobasta
  "qawaed-4": {
    id: "qawaed-4",
    titleAr: "القواعد المبسطة - المستوى 4",
    titleEn: "Simplified Grammar - Level 4",
    titleFr: "Grammaire Simplifiée - Niveau 4",
    size: "21* 29,7",
    pages: 45,
    lessons: 28,
    priceUSD: 7.00,
    isbn: "978-2-923633-09-1"
  },
  "qawaed-5": {
    id: "qawaed-5",
    titleAr: "القواعد المبسطة - المستوى 5",
    titleEn: "Simplified Grammar - Level 5",
    titleFr: "Grammaire Simplifiée - Niveau 5",
    size: "21* 29,7",
    pages: 41,
    lessons: 28,
    priceUSD: 7.00,
    isbn: "978-2-923633-12-1"
  },
  "qawaed-6": {
    id: "qawaed-6",
    titleAr: "القواعد المبسطة - المستوى 6",
    titleEn: "Simplified Grammar - Level 6",
    titleFr: "Grammaire Simplifiée - Niveau 6",
    size: "21* 29,7",
    pages: 25,
    lessons: 28,
    priceUSD: 7.00,
    isbn: "978-2-923633-15-2"
  },
  "qawaed-7": {
    id: "qawaed-7",
    titleAr: "القواعد المبسطة - المستوى 7",
    titleEn: "Simplified Grammar - Level 7",
    titleFr: "Grammaire Simplifiée - Niveau 7",
    size: "21* 29,7",
    pages: 26,
    lessons: 28,
    priceUSD: 7.00,
    isbn: "978-2-923633-31-2"
  },
  "qawaed-8": {
    id: "qawaed-8",
    titleAr: "القواعد المبسطة - المستوى 8",
    titleEn: "Simplified Grammar - Level 8",
    titleFr: "Grammaire Simplifiée - Niveau 8",
    size: "21* 29,7",
    pages: 26,
    lessons: 28,
    priceUSD: 7.00,
    isbn: "978-2-923633-43-5"
  }
};
