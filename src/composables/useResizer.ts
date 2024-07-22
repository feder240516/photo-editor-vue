import { useActionsStore } from '@/stores/actions';
import { useImagesStore, type ImageData } from '@/stores/images';
import { useSelectionStore } from '@/stores/selection';
import { storeToRefs } from 'pinia';
import { computed, watch, type Ref } from 'vue';
import type { PositionCoords } from './usePosition';
import { useLocalDimensions } from './useLocalDimensions';
import { createEnum, isInEnum, type EnumKeys } from '@/utils/enum';

const XResizerHandles = createEnum(['left', 'center', 'right'] as const);
const YResizerHandles = createEnum(['top', 'center', 'bottom'] as const);
export type XResizerHandleEnum = EnumKeys<typeof XResizerHandles>;
export type YResizerHandleEnum = EnumKeys<typeof YResizerHandles>;
type ResizerHandleEnum = `${YResizerHandleEnum}-${XResizerHandleEnum}`;

export function buildResizerPosition(
  x: XResizerHandleEnum,
  y: YResizerHandleEnum
): ResizerHandleEnum {
  return `${y}-${x}`;
}

function parseResizerHandle(position: string): {
  xHandle: XResizerHandleEnum;
  yHandle: YResizerHandleEnum;
} {
  const [yHandle, xHandle] = position.split('-');
  const parsedX = isInEnum(xHandle, XResizerHandles);
  const parsedY = isInEnum(yHandle, YResizerHandles);
  if (parsedX && parsedY) return { xHandle, yHandle };
  throw new Error("Can't parse the given position");
}

export function useResizer({
  imageRef,
  image,
  initiaImagePositionInScreen,
  initiaImagePositionInCanvas,
  initialMousePosition,
}: {
  imageRef: Ref<HTMLDivElement | null>;
  image: Ref<ImageData | null>;
  initiaImagePositionInScreen: Ref<PositionCoords>;
  initiaImagePositionInCanvas: Ref<PositionCoords>;
  initialMousePosition: Ref<PositionCoords>;
}) {
  const actionsStore = useActionsStore();
  const { startResizing } = actionsStore;
  const { dragging, objectToAct, mousePosition, resizing, resizingParams } =
    storeToRefs(actionsStore);

  const selectionStore = useSelectionStore();
  const { setSelectedImage } = selectionStore;

  const imagesStore = useImagesStore();
  const { resizeImageTo } = imagesStore;

  const resizingThis = computed(
    () => resizing.value && objectToAct.value === image.value!.id
  );

  const handle = computed(() => ({
    x: resizingParams.value.xHandle,
    y: resizingParams.value.yHandle,
  }));
  const originalDimensions = computed(() => ({
    width: image.value?.width ?? 1,
    height: image.value?.height ?? 1,
  }));

  const localDimensions = useLocalDimensions({
    mousePosition,
    initiaImagePositionInScreen,
    initiaImagePositionInCanvas,
    handle,
    originalDimensions,
  });

  watch(resizingThis, (newResizingThis, oldResizingThis) => {
    if (oldResizingThis && !newResizingThis) {
      resizeImageTo(image.value!.id, {
        width: localDimensions.value.width,
        height: localDimensions.value.height,
        x: localDimensions.value.x,
        y: localDimensions.value.y,
      });
    }
  });

  function onStartResizing(event: MouseEvent, position: string) {
    event.stopPropagation();
    const { xHandle: xPosition, yHandle: yPosition } =
      parseResizerHandle(position);
    if (!dragging.value && imageRef.value) {
      startResizing({ x: event.pageX, y: event.pageY }, image.value!.id, {
        xHandle: xPosition,
        yHandle: yPosition,
      });
      setSelectedImage(image.value!.id);
      initiaImagePositionInScreen.value = {
        x: imageRef.value.getBoundingClientRect().x,
        y: imageRef.value.getBoundingClientRect().y,
      };
      initiaImagePositionInCanvas.value = {
        x: image.value!.x,
        y: image.value!.y,
      };
      initialMousePosition.value = {
        x: event.pageX,
        y: event.pageY,
      };
    }
  }

  return { localDimensions, resizingThis, resizingParams, onStartResizing };
}
