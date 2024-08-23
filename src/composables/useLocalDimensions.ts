import { computed, type Ref } from 'vue';
import type { PositionCoords } from './usePosition';
import type { XResizerHandleEnum, YResizerHandleEnum } from './useResizer';

export type UseLocalDimensionsProps = {
  mousePosition: Ref<PositionCoords>;
  initiaImagePositionInScreen: Ref<PositionCoords>;
  initiaImagePositionInCanvas: Ref<PositionCoords>;
  handle: Ref<{ x: XResizerHandleEnum; y: YResizerHandleEnum }>;
  originalDimensions: Ref<{ width: number; height: number }>;
};

export function useLocalDimensions({
  mousePosition,
  initiaImagePositionInScreen,
  initiaImagePositionInCanvas,
  handle,
  originalDimensions,
}: UseLocalDimensionsProps) {
  return computed(() => {
    let calculatedWidth = originalDimensions.value.width;
    let xPosition = initiaImagePositionInCanvas.value.x;
    if (handle.value.x === 'right') {
      calculatedWidth =
        mousePosition.value.x - initiaImagePositionInScreen.value.x;
    } else if (handle.value.x === 'left') {
      calculatedWidth =
        initiaImagePositionInScreen.value.x +
        originalDimensions.value.width -
        mousePosition.value.x;
      const maxXPosition =
        initiaImagePositionInCanvas.value.x +
        originalDimensions.value.width -
        1;
      xPosition = Math.min(
        initiaImagePositionInCanvas.value.x +
          originalDimensions.value.width -
          calculatedWidth,
        maxXPosition
      );
    }
    let calculatedHeight = originalDimensions.value.height;
    let yPosition = initiaImagePositionInCanvas.value.y;
    if (handle.value.y === 'bottom') {
      calculatedHeight =
        mousePosition.value.y - initiaImagePositionInScreen.value.y;
    } else if (handle.value.y === 'top') {
      calculatedHeight =
        initiaImagePositionInScreen.value.y +
        originalDimensions.value.height -
        mousePosition.value.y;
      const maxYPosition =
        initiaImagePositionInCanvas.value.y +
        originalDimensions.value.height -
        1;
      yPosition = Math.min(
        initiaImagePositionInCanvas.value.y +
          originalDimensions.value.height -
          calculatedHeight,
        maxYPosition
      );
    }
    return {
      width: calculatedWidth > 1 ? calculatedWidth : 1,
      height: calculatedHeight > 1 ? calculatedHeight : 1,
      x: xPosition,
      y: yPosition,
    };
  });
}
