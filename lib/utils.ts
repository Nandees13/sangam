import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { format, isAfter, isPast, parseISO } from 'date-fns';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Date formatting
export function formatDate(dateString: string, showTime: boolean = false): string {
  if (!dateString) return '';
  
  try {
    const date = parseISO(dateString);
    return format(date, showTime ? 'MMM d, yyyy h:mm a' : 'MMM d, yyyy');
  } catch (error) {
    console.error('Error formatting date:', error);
    return dateString;
  }
}

// Check if date is in the future
export function isUpcoming(dateString: string): boolean {
  if (!dateString) return false;
  
  try {
    const date = parseISO(dateString);
    return isAfter(date, new Date());
  } catch (error) {
    console.error('Error checking if date is upcoming:', error);
    return false;
  }
}

// Check if deadline has expired
export function isDeadlineExpired(dateString: string): boolean {
  if (!dateString) return false;
  
  try {
    const date = parseISO(dateString);
    return isPast(date);
  } catch (error) {
    console.error('Error checking if deadline expired:', error);
    return false;
  }
}

// Generate URL-friendly slug from title
export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^\w\s]/g, '')
    .replace(/\s+/g, '-');
}

// Truncate text to specified length
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
}

// HTML content to plain text (for excerpts)
export function htmlToPlainText(html: string): string {
  return html.replace(/<[^>]*>/g, '');
}

// Extract image from content or use fallback
export function getContentImage(content: string, fallbackUrl: string): string {
  const imgRegex = /<img.*?src="(.*?)"/;
  const match = content.match(imgRegex);
  return match ? match[1] : fallbackUrl;
}

export { isPast };
