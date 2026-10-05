import { HeaderItem } from '@/app/types/menu'
import { CourseType } from '@/app/types/course'
import { Hourtype } from '@/app/types/hour'
import { CourseDetailType } from '@/app/types/coursedetail'
import { MentorType } from '@/app/types/mentor'
import { TestimonialType } from '@/app/types/testimonial'
import { FooterLinkType } from '@/app/types/footerlinks'

export const HeaderData: HeaderItem[] = [
  { label: 'Home', href: '/#Home' },
  { label: 'Courses', href: '/#Courses' },
  { label: 'Mentors', href: '/#mentors-section' },
  { label: 'Testimonial', href: '/#testimonial-section' },
  { label: 'Join', href: '/#join-section' },
  { label: 'Contact Us', href: '/#contact' },
  { label: 'Docs', href: '/documentation' },
]

export const CourseData: CourseType[] = [
  { name: 'Printed Books' },
  { name: 'E-Books' },
  { name: 'CDs' },
  { name: 'Teaching Tools' },
]

export const HourData: Hourtype[] = [
  { name: 'Self-paced' },
  { name: 'Instructor-led' },
  { name: 'Interactive' },
]

export const Companiesdata: { imgSrc: string; alt?: string }[] = [
  { imgSrc: '/images/ourCompany/Sarl Maktabatouna.png' },
  { imgSrc: '/images/ourCompany/Sindbadglobal.png' },
  { imgSrc: '/images/ourCompany/Dar Manabe Alnour.png' },
  { imgSrc: '/images/ourCompany/AVERROES Bookshop.png' },
  { imgSrc: '/images/ourCompany/Dar Al-Kutub.png' },
  { imgSrc: '/images/ourCompany/Ta3liem Distribution.png' },
]

export const CourseDetailData: CourseDetailType[] = [
  {
    course: 'The Happy Muslim Series',
    imageSrc: '/images/ourbooks/The Happy Muslim Series.png',
    profession: 'Islamic Studies for Kids',
    price: '35',
    category: 'printed-books',
  },
  {
    course: 'Al-Shamil Series',
    imageSrc: '/images/ourbooks/Arabic Shamel Series.png',
    profession: 'Comprehensive Arabic for Adults',
    price: '45',
    category: 'printed-books',
  },
  {
    course: 'Al-Tareeq Al-Muneer',
    imageSrc: '/images/ourbooks/Illuminating Path Series.png',
    profession: 'The Illuminating Path',
    price: '40',
    category: 'printed-books',
  },
  {
    course: 'Simplified Grammar',
    imageSrc: '/images/ourbooks/Arabic Shamel Series.png',
    profession: 'Arabic Grammar Made Easy',
    price: '25',
    category: 'ebooks',
  },
  {
    course: 'Garden of Arabic',
    imageSrc: '/images/ourbooks/Arabic Garden Series.png',
    profession: 'Interactive Learning Series',
    price: '30',
    category: 'ebooks',
  },
]

export const MentorData: MentorType[] = [
  {
    name: 'Author & Educator',
    href: '#',
    imageSrc: '/images/mentor/boy1.svg',
    imageAlt: 'Expert 1',
    color: 'Dr. Ahmad Ibrahim',
  },
  {
    name: 'Arabic Language Expert',
    href: '#',
    imageSrc: '/images/mentor/girl1.svg',
    imageAlt: 'Expert 2',
    color: 'Prof. Fatima Zehra',
  },
  {
    name: 'Curriculum Designer',
    href: '#',
    imageSrc: '/images/mentor/boy2.svg',
    imageAlt: 'Expert 3',
    color: 'Mr. Khalid Mansour',
  },
]

export const TestimonialData: TestimonialType[] = [
  {
    profession: 'Parent',
    name: 'Sara Khan',
    imgSrc: '/images/testimonial/user-1.jpg',
    starimg: '/images/testimonial/stars.png',
    detail:
      "The Al-Wafi series has transformed how my children learn Arabic. It's engaging and very well structured!",
  },
  {
    profession: 'Arabic Teacher',
    name: 'Mohammad Al-Farsi',
    imgSrc: '/images/testimonial/user-2.jpg',
    starimg: '/images/testimonial/stars.png',
    detail:
      "As a teacher, I find the teaching tools and CDs from Casp Education to be indispensable in my classroom.",
  },
  {
    profession: 'Educational Consultant',
    name: 'Laila Hassan',
    imgSrc: '/images/testimonial/user-3.jpg',
    starimg: '/images/testimonial/stars.png',
    detail:
      "Highly professional resources that follow modern pedagogical standards while preserving the beauty of the language.",
  },
]

export const FooterLinkData: FooterLinkType[] = [
  {
    section: 'Company',
    links: [
      { label: 'Home', href: '/#Home' },
      { label: 'Courses', href: '/#Courses' },
      { label: 'Mentors', href: '/#mentors-section' },
      { label: 'Testimonial', href: '/#testimonial-section' },
      { label: 'Join', href: '/#join-section' },
      { label: 'Contact Us', href: '/#contact' },
    ],
  },
  {
    section: 'Support',
    links: [
      { label: 'Help center', href: '/' },
      { label: 'Terms of service', href: '/' },
      { label: 'Legal', href: '/' },
      { label: 'Privacy Policy', href: '/' },
      { label: 'Status', href: '/' },
    ],
  },
]
