export type CourseDetailType = {
  course: string
  imageSrc: string
  profession: string
  price: string
  category:
    | 'printed-books'
    | 'ebooks'
    | 'cds'
    | 'teaching-tools'
}
