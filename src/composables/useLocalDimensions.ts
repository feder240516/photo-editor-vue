import { computed, type Ref } from 'vue';
import type { PositionCoords } from './usePosition';
import type { XResizerHandleEnum, YResizerHandleEnum } from './useResizer';

export type UseLocalDimensionsProps = {
  mousePosition: Ref<PositionCoords>;
  initiaImagePositionInScreen: Ref<PositionCoords>;
  handle: Ref<{ x: XResizerHandleEnum; y: YResizerHandleEnum }>;
  originalDimensions: Ref<{ width: number; height: number }>;
};

export function useLocalDimensions({
  mousePosition,
  initiaImagePositionInScreen,
  handle,
  originalDimensions,
}: UseLocalDimensionsProps) {
  return computed(() => {
    let calculatedWidth = originalDimensions.value.width;
    if (handle.value.x === 'left' || handle.value.x === 'right') {
      calculatedWidth =
        mousePosition.value.x - initiaImagePositionInScreen.value.x;
    }
    let calculatedHeight = originalDimensions.value.height;
    if (handle.value.y === 'top' || handle.value.y === 'bottom') {
      calculatedHeight =
        mousePosition.value.y - initiaImagePositionInScreen.value.y;
    }
    return {
      width: calculatedWidth > 1 ? calculatedWidth : 1,
      height: calculatedHeight > 1 ? calculatedHeight : 1,
      x: initiaImagePositionInScreen.value.x,
      y: initiaImagePositionInScreen.value.y,
    };
  });
}
