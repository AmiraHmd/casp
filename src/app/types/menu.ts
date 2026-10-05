export type SubmenuItem = {
  label: string
  href: string
  seriesId?: string
  submenu?: SubmenuItem[]
}

export type HeaderItem = {
  label: string
  href: string
  seriesId?: string
  isCurricula?: boolean
  submenu?: SubmenuItem[]
}
