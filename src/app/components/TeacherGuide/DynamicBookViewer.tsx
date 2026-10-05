"use client";

import dynamic from 'next/dynamic';
import type { BookViewerProps } from './BookViewer';

const BookViewer = dynamic<BookViewerProps>(() => import('./BookViewer'), {
  ssr: false,
});

export default BookViewer;
