import { onMounted, onUnmounted, ref } from 'vue';

export type BuildMediaQueryArgs = {
  maxPixels?: number;
  minPixels?: number;
};

export function useMediaQuery(mediaQuery: string) {
  const matchesQuery = ref(false);
  const mediaQueryMatcher = window.matchMedia(mediaQuery);
  const updateMatch = () => {
    matchesQuery.value = mediaQueryMatcher.matches;
  };

  onMounted(() => {
    updateMatch();
    mediaQueryMatcher.addEventListener('change', updateMatch);
  });

  onUnmounted(() => {
    mediaQueryMatcher.removeEventListener('change', updateMatch);
  });

  return matchesQuery;
}

export function buildMediaQuery({ maxPixels, minPixels }: BuildMediaQueryArgs) {
  if (maxPixels && !minPixels) {
    return `(max-width: ${maxPixels}px)`;
  }
  if (!maxPixels && minPixels) {
    return `(min-width: ${minPixels}px)`;
  }
  if (maxPixels && minPixels) {
    return `(min-width: ${minPixels}px and max-width: ${maxPixels}px)`;
  }
  throw new Error('Invalid media query parameters');
}

const mediaQuerySizes = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
};

export { mediaQuerySizes };

export function useMobileMediaQuery() {
  const mobileMediaQuery = buildMediaQuery({ maxPixels: mediaQuerySizes.lg });
  return useMediaQuery(mobileMediaQuery);
}
