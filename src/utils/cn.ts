import { ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export default function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}


export const formatNumber = (num: number | string | null): string => {
  return new Intl.NumberFormat('en-IN').format(Number(num));
};