/**
 * Utility to switch the locale segment of any pathname while preserving
 * sub-routes, dynamic slugs, and optional query parameters.
 *
 * Examples:
 *   switchLocalePath('/ar', 'en') -> '/en'
 *   switchLocalePath('/ar/contact', 'en') -> '/en/contact'
 *   switchLocalePath('/en/services/paint-protection-ppf', 'ar') -> '/ar/services/paint-protection-ppf'
 *   switchLocalePath('/ar/blog?page=2', 'en') -> '/en/blog?page=2'
 */
export function switchLocalePath(
  pathname: string | null | undefined,
  targetLocale: 'ar' | 'en',
): string {
  if (!pathname || pathname === '/' || pathname === '') {
    return `/${targetLocale}`;
  }

  // Handle URL with query/hash if passed directly
  const [pathOnly, searchOrHash] = pathname.split(/(?=[?#])/);
  const segments = pathOnly.split('/').filter(Boolean);

  if (segments.length === 0) {
    return `/${targetLocale}${searchOrHash || ''}`;
  }

  // If first segment is a known locale ('ar' | 'en')
  if (segments[0] === 'ar' || segments[0] === 'en') {
    segments[0] = targetLocale;
  } else {
    // If somehow without locale prefix, prepend target locale
    segments.unshift(targetLocale);
  }

  const newPath = '/' + segments.join('/');
  return searchOrHash ? `${newPath}${searchOrHash}` : newPath;
}

