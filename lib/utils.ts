import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

const COLORS = ['#059669', '#2563EB', '#D97706', '#DC2626', '#7C3AED'];

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function connectionIdToColor(connectionId: number) {
  return COLORS[connectionId % COLORS.length];
}
