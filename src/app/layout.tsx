// // Root layout - minimal wrapper for Next.js App Router
// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return children;
// }
// import { CartProvider } from '@/app/context/cart.context'

import '@/app/globals.css'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
