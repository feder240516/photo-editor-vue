import { computed, type Ref } from 'vue';
import type { PositionCoords } from './usePosition';

export function useLocalDimensions(
  mousePosition: Ref<PositionCoords>,
  initiaImagePositionInScreen: Ref<PositionCoords>
) {
  return computed(() => {
    const calculatedWidth =
      mousePosition.value.x - initiaImagePositionInScreen.value.x;
    const calculatedHeight =
      mousePosition.value.y - initiaImagePositionInScreen.value.y;
    return {
      width: calculatedWidth > 1 ? calculatedWidth : 1,
      height: calculatedHeight > 1 ? calculatedHeight : 1,
    };
  });
}
