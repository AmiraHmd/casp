import { NextResponse } from 'next/server'

import { HeaderItem } from '@/app/types/menu'
import { CourseType } from '@/app/types/course'
import { Hourtype } from '@/app/types/hour'
import { CourseDetailType } from '@/app/types/coursedetail'
import { MentorType } from '@/app/types/mentor'
import { TestimonialType } from '@/app/types/testimonial'
import { FooterLinkType } from '@/app/types/footerlinks'

const HeaderData: HeaderItem[] = [
  { label: 'Home', href: '/#Home' },
  { label: 'Courses', href: '/#Courses' },
  { label: 'Mentors', href: '/#mentors-section' },
  { label: 'Testimonial', href: '/#testimonial-section' },
  { label: 'Join', href: '/#join-section' },
  { label: 'Contact Us', href: '/#contact' },
  { label: 'Docs', href: '/documentation' },
]

const CourseData: CourseType[] = [
  { name: 'Printed Books' },
  { name: 'E-Books' },
  { name: 'CDs' },
  { name: 'Teaching Tools' },
]

const HourData: Hourtype[] = [
  { name: 'Self-paced' },
  { name: 'Instructor-led' },
  { name: 'Interactive' },
]

const Companiesdata: { imgSrc: string }[] = [
  { imgSrc: '/images/ourCompany/Sarl Maktabatouna.png' },
  { imgSrc: '/images/ourCompany/Sindbadglobal.png' },
  { imgSrc: '/images/ourCompany/Dar Manabe Alnour.png' },
  { imgSrc: '/images/ourCompany/AVERROES Bookshop.png' },
  { imgSrc: '/images/ourCompany/Dar Al-Kutub.png' },
  { imgSrc: '/images/ourCompany/Ta3liem Distribution.png' },
]

const CourseDetailData: CourseDetailType[] = [
  {
    course: 'The Happy Muslim Series',
    imageSrc: '/images/books/سلسلة-the-happy-muslim-213x300.png',
    profession: 'Islamic Studies for Kids',
    price: '35',
    category: 'printed-books',
  },
  {
    course: 'Al-Shamil Series',
    imageSrc: '/images/books/سلسلة-الشّامل-للكبار-213x300.png',
    profession: 'Comprehensive Arabic for Adults',
    price: '45',
    category: 'printed-books',
  },
  {
    course: 'Al-Tareeq Al-Muneer',
    imageSrc: '/images/books/سلسلة-الطريق-المنير-213x300.png',
    profession: 'The Illuminating Path',
    price: '40',
    category: 'printed-books',
  },
  {
    course: 'Simplified Grammar',
    imageSrc: '/images/books/سلسلة-القواعد-المبسّطة-213x300.png',
    profession: 'Arabic Grammar Made Easy',
    price: '25',
    category: 'ebooks',
  },
  {
    course: 'Garden of Arabic',
    imageSrc: '/images/books/سلسلة-في-حديقة-اللغة-العربية-213x300.png',
    profession: 'Interactive Learning Series',
    price: '30',
    category: 'ebooks',
  },
]

const MentorData: MentorType[] = [
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

const TestimonialData: TestimonialType[] = [
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

const FooterLinkData: FooterLinkType[] = [
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

export const GET = () => {
  return NextResponse.json({
    HeaderData,
    CourseData,
    HourData,
    Companiesdata,
    CourseDetailData,
    MentorData,
    TestimonialData,
    FooterLinkData,
  })

  
}
